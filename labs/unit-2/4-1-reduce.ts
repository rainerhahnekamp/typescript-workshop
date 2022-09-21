export function reduce<T>(
  values: T[],
  callback: (value1: T, value2: T) => T
): T {
  let currentValue = values[0];
  let nextValue: T;

  for (let i = 1; i < values.length; i++) {
    nextValue = values[i];
    currentValue = callback(currentValue, nextValue);
  }

  return currentValue;
}
