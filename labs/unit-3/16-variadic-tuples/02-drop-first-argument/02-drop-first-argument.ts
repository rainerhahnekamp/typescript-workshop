export type Remaining<Args extends unknown[]> = unknown;

type A = Remaining<[string, boolean, number]>; // [boolean, number]
type B = Remaining<[]>;                        // []
