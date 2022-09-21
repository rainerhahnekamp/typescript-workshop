export type FluentProps<Type> = {
  [Property in keyof Type]: (value: Type[Property]) => FluentProps<Type>;
};
