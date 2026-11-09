export type IsNumber<T> = T extends number ? true : false;

type A = IsNumber<42>;      // true
type B = IsNumber<"ready">; // false
