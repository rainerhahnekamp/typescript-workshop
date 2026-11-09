export type Remaining<Args extends unknown[]> =
  Args extends [unknown, ...infer Rest] ? Rest : [];

type A = Remaining<[string, boolean, number]>; // [boolean, number]
type B = Remaining<[]>;                        // []
