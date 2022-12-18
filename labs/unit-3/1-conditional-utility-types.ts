export type MyReturnType<T> = T extends (...args: infer Arguments) => infer R
  ? R
  : never;

export type MyParameters<T> = T extends (...args: infer Arguments) => infer R
  ? Arguments
  : never;

export type FirstParameter<T> = T extends (...args: infer Arguments) => infer R
  ? Arguments[0]
  : never;

export type Expect<T extends true> = true;

export type AreEqual<T, U> = T extends U ? (U extends T ? true : false) : false;

export type Not<T extends true | false> = T extends true ? false : true;
