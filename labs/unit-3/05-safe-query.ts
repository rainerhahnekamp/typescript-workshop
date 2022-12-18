export type Query<S extends string> = S extends `${infer Head} ${infer Tail}`
  ? Query<Tail>
  : S extends "button"
  ? HTMLButtonElement
  : S extends "input"
  ? HTMLInputElement
  : never;

export function safeQuery<T extends string>(query: T): Query<T> {
  return {} as Query<T>;
}
