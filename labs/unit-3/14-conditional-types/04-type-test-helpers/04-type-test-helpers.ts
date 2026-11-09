export type Expect<Value extends true> = Value;

export type AreEqual<A, B> = A extends B ? (B extends A ? true : false) : false;

export type Not<Value extends boolean> = Value extends true ? false : true;
