export type Leaf<T> = T extends readonly (infer Item)[] ? Leaf<Item> : T;

type A = Leaf<string[][]>; // string
type B = Leaf<boolean>;    // boolean
