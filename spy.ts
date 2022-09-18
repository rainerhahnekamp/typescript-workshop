class Http {
  get(sql: string) {}
}

class ValidationService {
  validate() {}
}

export type Spy<T extends () => R, R> = (() => R) & {
  answer: (value: R) => void;
};

export function spy<T extends () => R, R>(fn: T): Spy<T, R> {
  let isAnswerSet = true;
  let answer: undefined | R = undefined;
  const a = () => {
    if (isAnswerSet && answer !== undefined) {
      return answer;
    }
    return fn();
  };
  a.answer = (value: R) => {
    isAnswerSet = true;
    return (answer = value);
  };

  return a;
}
