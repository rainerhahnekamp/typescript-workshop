import { z, type Schema } from "./06-mini-zod";

interface NestedShape {
  [key: string]: Schema | NestedShape;
}

type ParsedNestedShape<S extends NestedShape> = {
  [Key in keyof S]: S[Key] extends Schema<infer Output>
    ? Output
    : S[Key] extends NestedShape
      ? ParsedNestedShape<S[Key]>
      : never;
};

function isSchema(field: Schema | NestedShape): field is Schema {
  return typeof field.parse === "function";
}

export function nestedObject<S extends NestedShape>(
  shape: S,
): Schema<ParsedNestedShape<S>> {
  const fields = Object.fromEntries(
    Object.entries(shape).map(([key, field]) => [
      key,
      isSchema(field) ? field : nestedObject(field),
    ]),
  );

  return z.object(fields) as Schema<ParsedNestedShape<S>>;
}
