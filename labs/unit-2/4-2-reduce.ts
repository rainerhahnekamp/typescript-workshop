export function reduce<T, A>(
  values: T[],
  callback: (value1: A, value2: T) => A,
  accumulator: A
): A {
  let currentValue = accumulator;
  let nextValue: T;

  for (let i = 0; i < values.length; i++) {
    nextValue = values[i];
    currentValue = callback(currentValue, nextValue);
  }

  return currentValue;
}
