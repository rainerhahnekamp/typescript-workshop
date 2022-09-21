const throwUnless = (result: boolean, message: string) => {
  if (!result) {
    throw new Error(message);
  }
};

interface StringMatcher {
  matches(regex: RegExp): void;
}

interface NumberMatcher {
  isBetween(min: number, max: number): void;
}

interface ObjectMatcher {
  hasProperties(object: { [key: string]: unknown }): void;
}

function createStringMatcher(value: string): StringMatcher {
  return {
    matches(regex: RegExp) {
      throwUnless(!!value.match(regex), `${value} does not match ${regex}`);
    },
  };
}

function createNumberMatcher(value: number): NumberMatcher {
  return {
    isBetween(min: number, max: number) {
      throwUnless(
        value > min && value < max,
        `${value} is not between ${min} and ${max}`
      );
    },
  };
}

function createObjectMatcher(value: { [key: string]: unknown }) {
  return {
    hasProperties(object: { [p: string]: unknown }) {
      for (let prop in object) {
        throwUnless(
          object[prop] === value[prop],
          `Property ${prop} has value ${value[prop]}. Expected was ${object[prop]}`
        );
      }
    },
  };
}

export function assertThat(value: string): StringMatcher;
export function assertThat(value: number): NumberMatcher;
export function assertThat(value: { [key: string]: unknown }): ObjectMatcher;

export function assertThat(
  value: string | number | { [key: string]: unknown }
): StringMatcher | NumberMatcher | ObjectMatcher {
  if (typeof value === "string") {
    return createStringMatcher(value);
  } else if (typeof value === "number") {
    return createNumberMatcher(value);
  } else if (typeof value === "object") {
    return createObjectMatcher(value);
  } else {
    const exhaustCheck: never = value;
    return exhaustCheck;
  }
}
