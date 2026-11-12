import type { Schema } from "./06-mini-zod";

// TODO: Infer a schema's parsed output type, like z.infer<typeof schema>.
export type TypeOfSchema<S extends Schema> = unknown;
