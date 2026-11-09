import { readonly } from "zod/v4";

export type Writable<T> = { -readonly [Prop in keyof T]: T[Prop] };

type Result = Writable<{ readonly vin: string; readonly note?: string }>;
// { vin: string; note?: string }
