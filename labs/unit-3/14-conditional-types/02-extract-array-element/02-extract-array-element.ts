export type ElementOf<T> = unknown;

type A = ElementOf<string[]>; // string
type B = ElementOf<boolean>; // never
