export type Spy<Fn extends (...args: never[]) => unknown> = {
  answer: (value: ReturnType<Fn>) => void;
};
