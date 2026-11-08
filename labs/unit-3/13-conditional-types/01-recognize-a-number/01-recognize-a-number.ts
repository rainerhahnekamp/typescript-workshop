export type IsNumber<T> = unknown;

type A = IsNumber<42>; // true
type B = IsNumber<"ready">; // false
