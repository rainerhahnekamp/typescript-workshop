export type Writable<T> = unknown;

type Result = Writable<{ readonly vin: string; readonly note?: string }>;
// { vin: string; note?: string }
