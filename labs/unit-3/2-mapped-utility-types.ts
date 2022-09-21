export type PartialReadOnly<Type, Parameters extends keyof Type> = {
  readonly [Property in keyof Type as Property extends Parameters
    ? Property
    : never]: Type[Property];
} & {
  [Property in keyof Type as Property extends Parameters
    ? never
    : Property]: Type[Property];
};

export type PartialOptional<Type, Parameters extends keyof Type> = {
  [Property in keyof Type as Property extends Parameters
    ? Property
    : never]?: Type[Property];
} & {
  [Property in keyof Type as Property extends Parameters
    ? never
    : Property]: Type[Property];
};
