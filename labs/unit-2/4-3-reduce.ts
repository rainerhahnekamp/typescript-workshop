export function reduce<T>(
  values: T[],
  callback: (value1: T, value2: T) => T
): T;
export function reduce<T, A>(
  values: T[],
  callback: (value1: A, value2: T) => A,
  accumulator: A
): A;

export function reduce<T, A>(
  values: T[],
  callback: (value1: T | A, value2: T) => A | T,
  accumulator?: A
): A | T {
  let currentValue: T | A = values[0];
  let startIx = 1;

  if (accumulator !== undefined) {
    currentValue = accumulator;
    startIx = 0;
  }

  let nextValue: T;

  for (let i = startIx; i < values.length; i++) {
    nextValue = values[i];
    currentValue = callback(currentValue, nextValue);
  }

  return currentValue;
}
