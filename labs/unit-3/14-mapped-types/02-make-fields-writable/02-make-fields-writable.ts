export type Writable<T> = { -readonly [Key in keyof T]: T[Key] };

type Result = Writable<{ readonly vin: string; readonly note?: string }>;
// { vin: string; note?: string }
