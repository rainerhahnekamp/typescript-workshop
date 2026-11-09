// Replace unknown with related generic types, then implement pipe.
// Support one to three operators in pipe. Do not use any or type assertions.

export function pipe<Value, P1>(value: Value, pipe1: (value: Value) => P1): P1;
export function pipe<Value, P1, P2>(
  value: Value,
  pipe1: (value: Value) => P1,
  pipe2: (value: P1) => P2,
): P2;
export function pipe<Value, P1, P2, P3>(
  value: Value,
  pipe1: (value: Value) => P1,
  pipe2: (value: P1) => P2,
  pipe3: (value: P2) => P3,
): P3;

export function pipe(
  value: unknown,
  ...pipes: Array<(value: unknown) => unknown>
): unknown {
  return pipes.reduce((acc, pipe) => pipe(acc), value);
}
