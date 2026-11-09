import { z, type Schema } from "./06-mini-zod";

interface NestedShape {
  [key: string]: Schema | NestedShape;
}

// TODO: Map each field to the output of a schema or a nested shape.
type ParsedNestedShape<S extends NestedShape> = Record<string, unknown>;

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
