/*
export function isNonNullable<T>(value: T): value is T & {} {
  return value !== undefined && value !== null;
}
*/

export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null;
}

export function assertNotNullable<T>(
  value: T,
): asserts value is NonNullable<T> {
  if (!isNonNullable(value)) {
    throw new Error(`value ${value} is nullable`);
  }
}
