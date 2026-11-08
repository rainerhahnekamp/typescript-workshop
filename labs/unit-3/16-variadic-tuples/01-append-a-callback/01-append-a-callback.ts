export type WithCallback<Args extends unknown[]> = [...Args, () => void];

type A = WithCallback<[string, boolean]>; // [string, boolean, () => void]
type B = WithCallback<[]>;               // [() => void]
