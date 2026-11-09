/**
 * Reduce Implementation
 *
 * Implement it in three phases.
 *
 * First, start with a single type: 04-1-reduce.spec.ts
 * Second, add support for an initial value: 04-2-reduce.spec.ts
 * Third, support a result type different from the input type (initial value is mandatory): 04-3-reduce.spec.ts
 */

export function reduce<Input>(
  values: Input[],
  callback: (acc: Input, curr: Input) => Input,
): Input;
export function reduce<Input>(
  values: Input[],
  callback: (acc: Input, curr: Input) => Input,
  initialValue: Input,
): Input;
export function reduce<Input, Output>(
  values: Input[],
  callback: (acc: Output, curr: Input) => Output,
  initialValue: Output,
): Output;

export function reduce<Input>(
  values: Input[],
  callback: (acc: Input, curr: Input) => Input,
  initialValue?: Input,
): Input {
  const hasInitial = arguments.length === 3;
  if (values.length === 0 && !hasInitial) {
    throw new TypeError();
  }
  let runningValue = hasInitial ? (initialValue as Input) : values[0];
  for (let i = hasInitial ? 0 : 1; i < values.length; i++) {
    runningValue = callback(runningValue, values[i]);
  }

  return runningValue;
}
