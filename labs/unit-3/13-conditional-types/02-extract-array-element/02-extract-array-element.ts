export type ElementOf<T> = T extends (infer Item)[] ? Item : never;

type A = ElementOf<string[]>; // string
type B = ElementOf<boolean>;          // never
