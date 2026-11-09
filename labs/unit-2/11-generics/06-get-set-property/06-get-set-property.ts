export function getProperty<T, P extends keyof T>(
  object: T,
  propertyName: P,
): T[P] {
  return object[propertyName];
}

export function setProperty<T, P extends keyof T>(
  object: T,
  propertyName: P,
  value: T[P],
) {
  object[propertyName] = value;
}
