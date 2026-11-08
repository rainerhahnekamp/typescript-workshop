export type FluentProps<T> = {
  [Key in keyof T]: (value: T[Key]) => FluentProps<T>;
};
