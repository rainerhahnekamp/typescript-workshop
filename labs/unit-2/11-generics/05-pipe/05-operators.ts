// Replace unknown with related generic types, then implement the factories.
// Reuse your pipe from 05-pipe.ts. Do not use any or type assertions.

export function map<Input, Output>(mapFn: (input: Input) => Output) {
  return (input: Input) => mapFn(input);
}

export function tap<Input>(effect: (input: Input) => void) {
  return (input: Input) => {
    effect(input);
    return input;
  };
}
