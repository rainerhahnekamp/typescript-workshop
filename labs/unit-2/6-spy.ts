export type Spy<Type extends () => Return, Return> = Type & {
  answer: (value: Return) => void;
};

export function spy<T extends () => Return, Return>(fn: T): Spy<T, Return> {
  let isAnswerSet = true;
  let answer: undefined | Return = undefined;
  const a = (() => {
    if (isAnswerSet && answer !== undefined) {
      return answer;
    }
    return fn();
  }) as Spy<T, Return>;

  a.answer = (value: Return) => {
    isAnswerSet = true;
    return (answer = value);
  };

  return a;
}
