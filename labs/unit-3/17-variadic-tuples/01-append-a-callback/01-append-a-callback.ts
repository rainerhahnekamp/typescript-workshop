export type WithCallback<Args extends unknown[]> = unknown;

type A = WithCallback<[string, boolean]>; // [string, boolean, () => void]
type B = WithCallback<[]>;               // [() => void]
