export function getProperty<Type, Property extends keyof Type>(
  object: Type,
  property: Property
): Type[Property] {
  return object[property];
}

export function setProperty<Type, Property extends keyof Type>(
  object: Type,
  property: Property,
  value: Type[Property]
): void {
  object[property] = value;
}
