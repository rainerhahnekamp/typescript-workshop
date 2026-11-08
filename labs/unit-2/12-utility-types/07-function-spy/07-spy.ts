type Callable = (...args: never[]) => unknown;
export type Spy<Fn extends Callable, Result = ReturnType<Fn>> = Fn & {
  answer(value: Result): void;
};

export function spy<Fn extends Callable>(fn: Fn): Spy<Fn> {
  let hasAnswer = false;
  let answer: ReturnType<Fn>;
  const wrapper = function (
    this: unknown,
    ...args: Parameters<Fn>
  ): ReturnType<Fn> {
    return (
      hasAnswer ? answer : Reflect.apply(fn, this, args)
    ) as ReturnType<Fn>;
  };
  return Object.assign(wrapper, {
    answer(value: ReturnType<Fn>) {
      answer = value;
      hasAnswer = true;
    },
  }) as Spy<Fn>;
}
