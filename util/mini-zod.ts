export type ValidationPath = readonly (string | number)[];

export interface ValidationIssue {
  readonly path: ValidationPath;
  readonly expected: string;
  readonly received: string;
  readonly message: string;
}

export class ValidationError extends TypeError {
  constructor(readonly issues: readonly ValidationIssue[]) {
    super(issues.map((issue) => issue.message).join("\n"));
    this.name = "ValidationError";
  }
}

type ParseSuccess<Output> = {
  readonly success: true;
  readonly value: Output;
};

type ParseFailure = {
  readonly success: false;
  readonly issues: readonly ValidationIssue[];
};

type ParseResult<Output> = ParseSuccess<Output> | ParseFailure;

export interface RuntimeSchema<Output> {
  parse(value: unknown, path: ValidationPath): ParseResult<Output>;
}

type SchemaShape = Record<string, RuntimeSchema<unknown>>;

type ParsedShape<Shape extends SchemaShape> = {
  -readonly [Key in keyof Shape]: Shape[Key] extends RuntimeSchema<infer Output>
    ? Output
    : never;
};

function formatPath(path: ValidationPath): string {
  if (path.length === 0) return "value";

  return path.reduce<string>((formatted, segment) => {
    if (typeof segment === "number") return `${formatted}[${segment}]`;
    return formatted ? `${formatted}.${segment}` : segment;
  }, "");
}

function describe(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (value instanceof Date) return "Date";
  return typeof value;
}

function failure(
  path: ValidationPath,
  expected: string,
  received: string,
): ParseFailure {
  return {
    success: false,
    issues: [
      {
        path,
        expected,
        received,
        message: `${formatPath(path)}: expected ${expected}, received ${received}`,
      },
    ],
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseOrThrow<Output>(
  schema: RuntimeSchema<Output>,
  value: unknown,
): Output {
  const result = schema.parse(value, []);
  if (!result.success) throw new ValidationError(result.issues);
  return result.value;
}

const z = {
  string(): RuntimeSchema<string> {
    return {
      parse(value, path) {
        return typeof value === "string"
          ? { success: true, value }
          : failure(path, "string", describe(value));
      },
    };
  },

  number(): RuntimeSchema<number> {
    return {
      parse(value, path) {
        return typeof value === "number" && Number.isFinite(value)
          ? { success: true, value }
          : failure(path, "finite number", describe(value));
      },
    };
  },

  boolean(): RuntimeSchema<boolean> {
    return {
      parse(value, path) {
        return typeof value === "boolean"
          ? { success: true, value }
          : failure(path, "boolean", describe(value));
      },
    };
  },

  dateString(): RuntimeSchema<string> {
    return {
      parse(value, path) {
        if (typeof value !== "string") {
          return failure(path, "valid ISO date string", describe(value));
        }

        const timestamp = Date.parse(value);
        return Number.isNaN(timestamp)
          ? failure(path, "valid ISO date string", JSON.stringify(value))
          : { success: true, value };
      },
    };
  },

  date(): RuntimeSchema<Date> {
    return {
      parse(value, path) {
        if (value instanceof Date && !Number.isNaN(value.getTime())) {
          return { success: true, value: new Date(value.getTime()) };
        }

        if (typeof value !== "string") {
          return failure(path, "valid ISO date", describe(value));
        }

        const parsed = new Date(value);
        return Number.isNaN(parsed.getTime())
          ? failure(path, "valid ISO date", JSON.stringify(value))
          : { success: true, value: parsed };
      },
    };
  },

  object<const Shape extends SchemaShape>(
    shape: Shape,
  ): RuntimeSchema<ParsedShape<Shape>> {
    return {
      parse(value, path) {
        if (!isRecord(value)) {
          return failure(path, "object", describe(value));
        }

        const output: Record<string, unknown> = {};
        const issues: ValidationIssue[] = [];

        for (const [key, schema] of Object.entries(shape)) {
          const result = schema.parse(value[key], [...path, key]);
          if (result.success) output[key] = result.value;
          else issues.push(...result.issues);
        }

        return issues.length > 0
          ? { success: false, issues }
          : { success: true, value: output as ParsedShape<Shape> };
      },
    };
  },

  array<Item>(schema: RuntimeSchema<Item>): RuntimeSchema<Item[]> {
    return {
      parse(value, path) {
        if (!Array.isArray(value)) {
          return failure(path, "array", describe(value));
        }

        const output: Item[] = [];
        const issues: ValidationIssue[] = [];

        for (const [index, item] of value.entries()) {
          const result = schema.parse(item, [...path, index]);
          if (result.success) output[index] = result.value;
          else issues.push(...result.issues);
        }

        return issues.length > 0
          ? { success: false, issues }
          : { success: true, value: output };
      },
    };
  },
};

export type SchemaBuilder = typeof z;

export function defineSchema<const Shape extends SchemaShape>(
  definition: (builder: typeof z) => Shape,
): readonly [
  parse: (value: unknown) => ParsedShape<Shape>,
  parseMany: (value: unknown) => ParsedShape<Shape>[],
] {
  const schema = z.object(definition(z));
  const many = z.array(schema);

  return [
    (value) => parseOrThrow(schema, value),
    (value) => parseOrThrow(many, value),
  ];
}
