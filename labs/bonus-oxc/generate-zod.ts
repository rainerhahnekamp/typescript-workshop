/// <reference types="node" />
import {
  parseSync,
  type Comment,
  type Statement,
  type TSLiteralType,
  type TSPropertySignature,
  type TSSignature,
  type TSType,
} from "oxc-parser";

type NodeWithRange = { start: number; end: number; type: string };

type SchemaDeclaration = {
  name: string;
  type: TSType | { type: "TSInterfaceBody"; body: TSSignature[] };
};

export type GenerationDiagnostic = {
  message: string;
  start: number;
  end: number;
};

export type GenerationResult = {
  code: string;
  diagnostics: GenerationDiagnostic[];
};

type Tags = Map<string, string | true>;

/**
 * Generate Zod schemas for local interfaces and type aliases.
 *
 * This workshop generator deliberately supports a documented subset instead
 * of pretending that syntax-only parsing is a complete TypeScript checker.
 */
export function generateZodSchemas(
  filename: string,
  source: string,
): GenerationResult {
  const parsed = parseSync(filename, source, { range: true });
  const diagnostics: GenerationDiagnostic[] = parsed.errors.map((error) => ({
    message: error.message,
    start: error.labels[0]?.start ?? 0,
    end: error.labels[0]?.end ?? 0,
  }));
  const comments = parsed.comments.filter(isJsDocComment);
  const declarations = collectDeclarations(parsed.program.body, diagnostics);
  const declarationNames = new Set(declarations.map(({ name }) => name));

  const schemas = declarations.map(({ name, type }) => {
    const expression =
      type.type === "TSInterfaceBody"
        ? renderObject(
            type.body,
            source,
            comments,
            declarationNames,
            diagnostics,
          )
        : renderType(type, source, comments, declarationNames, diagnostics);
    return `export const ${name}Schema = ${expression};`;
  });

  return {
    code: [`import { z } from "zod";`, "", ...schemas].join("\n\n") + "\n",
    diagnostics,
  };
}

function collectDeclarations(
  statements: readonly Statement[],
  diagnostics: GenerationDiagnostic[],
): SchemaDeclaration[] {
  const declarations: SchemaDeclaration[] = [];

  for (const statement of statements) {
    const node = unwrapExport(statement);
    if (!node) continue;

    if (node.type === "TSInterfaceDeclaration") {
      if (node.typeParameters) {
        diagnostics.push(
          diagnostic(
            node,
            `Generic interface ${node.id.name} is not supported`,
          ),
        );
        continue;
      }
      if (node.extends.length > 0) {
        diagnostics.push(
          diagnostic(
            node,
            `Interface inheritance for ${node.id.name} is not supported`,
          ),
        );
        continue;
      }
      declarations.push({
        name: node.id.name,
        type: node.body,
      });
    }

    if (node.type === "TSTypeAliasDeclaration") {
      if (node.typeParameters) {
        diagnostics.push(
          diagnostic(
            node,
            `Generic type alias ${node.id.name} is not supported`,
          ),
        );
        continue;
      }
      declarations.push({ name: node.id.name, type: node.typeAnnotation });
    }
  }

  return declarations;
}

function unwrapExport(statement: Statement) {
  if (statement.type === "ExportNamedDeclaration") return statement.declaration;
  if (
    statement.type === "TSInterfaceDeclaration" ||
    statement.type === "TSTypeAliasDeclaration"
  ) {
    return statement;
  }
  return null;
}

function renderType(
  node: TSType,
  source: string,
  comments: Comment[],
  declarations: Set<string>,
  diagnostics: GenerationDiagnostic[],
): string {
  switch (node.type) {
    case "TSStringKeyword":
      return "z.string()";
    case "TSNumberKeyword":
      return "z.number()";
    case "TSBooleanKeyword":
      return "z.boolean()";
    case "TSNullKeyword":
      return "z.null()";
    case "TSUndefinedKeyword":
      return "z.undefined()";
    case "TSUnknownKeyword":
      return "z.unknown()";
    case "TSArrayType":
      return `z.array(${renderType(node.elementType, source, comments, declarations, diagnostics)})`;
    case "TSTypeLiteral":
      return renderObject(
        node.members,
        source,
        comments,
        declarations,
        diagnostics,
      );
    case "TSLiteralType":
      if (
        node.literal.type === "TemplateLiteral" ||
        node.literal.type === "UnaryExpression"
      )
        return unsupported(node, "Unsupported literal syntax", diagnostics);
      return `z.literal(${JSON.stringify(node.literal.value)})`;
    case "TSUnionType": {
      const literals = node.types.filter(isStringLiteralType);
      if (literals.length === node.types.length) {
        return `z.enum([${literals
          .map((type) => JSON.stringify(type.literal.value))
          .join(", ")}])`;
      }
      return `z.union([${node.types
        .map((type) =>
          renderType(type, source, comments, declarations, diagnostics),
        )
        .join(", ")}])`;
    }
    case "TSTypeReference": {
      if (node.typeName.type !== "Identifier") {
        return unsupported(node, "Qualified type references", diagnostics);
      }
      const name = node.typeName.name;
      if (name === "Date") return "z.date()";
      if (name === "Array" && node.typeArguments?.params.length === 1) {
        return `z.array(${renderType(node.typeArguments.params[0], source, comments, declarations, diagnostics)})`;
      }
      if (declarations.has(name)) return `${name}Schema`;
      return unsupported(
        node,
        `Unresolved type reference ${name}`,
        diagnostics,
      );
    }
    default:
      return unsupported(
        node,
        `Unsupported TypeScript node ${node.type}`,
        diagnostics,
      );
  }
}

function renderObject(
  members: TSSignature[],
  source: string,
  comments: Comment[],
  declarations: Set<string>,
  diagnostics: GenerationDiagnostic[],
): string {
  const properties: string[] = [];

  for (const member of members) {
    if (member.type !== "TSPropertySignature") {
      diagnostics.push(
        diagnostic(member, `Unsupported object member ${member.type}`),
      );
      continue;
    }
    const name = propertyName(member);
    if (!name || !member.typeAnnotation) {
      diagnostics.push(
        diagnostic(
          member,
          "Properties need a static name and a type annotation",
        ),
      );
      continue;
    }

    const type = member.typeAnnotation.typeAnnotation;
    const tags = tagsFor(member, source, comments);
    let schema = renderType(type, source, comments, declarations, diagnostics);
    schema = applyTags(schema, type, tags, member, diagnostics);
    if (member.optional) schema += ".optional()";
    properties.push(`  ${JSON.stringify(name)}: ${schema},`);
  }

  return `z.object({\n${properties.join("\n")}\n})`;
}

function propertyName(member: TSPropertySignature): string | null {
  if (member.computed) return null;
  if (member.key.type === "Identifier") return member.key.name ?? null;
  if (member.key.type === "Literal" && typeof member.key.value === "string") {
    return member.key.value;
  }
  return null;
}

function isStringLiteralType(
  type: TSType,
): type is TSLiteralType & { literal: { value: string } } {
  return (
    type.type === "TSLiteralType" &&
    type.literal.type === "Literal" &&
    typeof type.literal.value === "string"
  );
}

function applyTags(
  schema: string,
  type: TSType,
  tags: Tags,
  node: NodeWithRange,
  diagnostics: GenerationDiagnostic[],
): string {
  const allowed = new Set<string>();

  if (type.type === "TSNumberKeyword") {
    allowed.add("int").add("min").add("max");
    if (tags.has("int")) schema += ".int()";
    schema += numericTag(tags, "min", node, diagnostics);
    schema += numericTag(tags, "max", node, diagnostics);
  }

  if (type.type === "TSStringKeyword") {
    allowed.add("minLength").add("maxLength").add("format");
    schema += numericTag(tags, "minLength", node, diagnostics, "min");
    schema += numericTag(tags, "maxLength", node, diagnostics, "max");
    const format = tags.get("format");
    if (typeof format === "string") {
      const formats: Record<string, string> = {
        email: ".email()",
        url: ".url()",
        uuid: ".uuid()",
        datetime: ".datetime()",
      };
      if (formats[format]) schema += formats[format];
      else diagnostics.push(diagnostic(node, `Unsupported @format ${format}`));
    }
  }

  if (type.type === "TSArrayType") {
    allowed.add("minItems").add("maxItems");
    schema += numericTag(tags, "minItems", node, diagnostics, "min");
    schema += numericTag(tags, "maxItems", node, diagnostics, "max");
  }

  for (const tag of tags.keys()) {
    if (!allowed.has(tag)) {
      diagnostics.push(
        diagnostic(node, `@${tag} does not apply to ${type.type}`),
      );
    }
  }
  return schema;
}

function numericTag(
  tags: Tags,
  tag: string,
  node: NodeWithRange,
  diagnostics: GenerationDiagnostic[],
  method = tag,
): string {
  const value = tags.get(tag);
  if (value === undefined) return "";
  const number = typeof value === "string" ? Number(value) : Number.NaN;
  if (!Number.isFinite(number)) {
    diagnostics.push(diagnostic(node, `@${tag} requires a number`));
    return "";
  }
  return `.${method}(${number})`;
}

function tagsFor(
  node: NodeWithRange,
  source: string,
  comments: Comment[],
): Tags {
  const comment = comments
    .filter((candidate) => candidate.end <= node.start)
    .reverse()
    .find((candidate) => source.slice(candidate.end, node.start).trim() === "");
  const tags: Tags = new Map();
  if (!comment) return tags;

  const expression =
    /@(minLength|maxLength|minItems|maxItems|format|int|min|max)\b(?:\s+([^\s*@]+))?/g;
  for (const match of comment.value.matchAll(expression)) {
    tags.set(match[1], match[2] ?? true);
  }
  return tags;
}

function isJsDocComment(comment: Comment): boolean {
  return comment.type === "Block" && comment.value.startsWith("*");
}

function unsupported(
  node: NodeWithRange,
  message: string,
  diagnostics: GenerationDiagnostic[],
): string {
  diagnostics.push(diagnostic(node, message));
  return "z.unknown()";
}

function diagnostic(
  node: NodeWithRange,
  message: string,
): GenerationDiagnostic {
  return { message, start: node.start, end: node.end };
}
