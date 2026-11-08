// Replace unknown with related generic types, then implement pipe.
// Support one to four operators in pipe. Do not use any or type assertions.

export function pipe(
  value: unknown,
  op1: unknown,
  op2?: unknown,
  op3?: unknown,
  op4?: unknown,
): unknown {
  throw new Error("Implement pipe");
}
