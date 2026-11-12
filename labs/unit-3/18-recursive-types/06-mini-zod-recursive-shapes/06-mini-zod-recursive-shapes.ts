import type { Schema } from "./06-mini-zod";

export type TypeOfSchema<S extends Schema> =
  S extends Schema<infer Output> ? Output : never;
