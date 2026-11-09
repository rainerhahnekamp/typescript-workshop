type Simplify<T> = { [Key in keyof T]: T[Key] };
export type PartialReadOnly<T, Keys extends keyof T> = Simplify<
  Readonly<Pick<T, Keys>> & Omit<T, Keys>
>;
export type PartialOptional<T, Keys extends keyof T> = Simplify<
  Partial<Pick<T, Keys>> & Omit<T, Keys>
>;
