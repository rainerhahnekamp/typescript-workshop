export function objectKeys<T extends object>(object: T): Array<keyof T> {
  return Object.keys(object) as Array<keyof T>;
}

export function isIncluded<T>(
  values: readonly T[],
  value: unknown,
): value is T {
  return values.some((entry) => entry === value);
}
