import { spy, Spy } from "./spy";

export type SpyObject<T> = {
  [Prop in keyof T]: T[Prop] extends (...args: any[]) => infer R
    ? Spy<T[Prop], R>
    : T[Prop];
};

export const createSpyObject = <T>(Class: { new (): T }): SpyObject<T> => {
  const returner: { [key: string]: unknown } = {};

  for (let propertyName of Object.getOwnPropertyNames(Class.prototype)) {
    if (propertyName === "constructor") {
      continue;
    }
    const descriptor = Object.getOwnPropertyDescriptor(
      Class.prototype,
      propertyName
    );

    console.log(descriptor?.value());
    if (typeof descriptor?.value === "function") {
      const mock = () => undefined;
      returner[propertyName] = spy(mock);
    } else {
      returner[propertyName] = undefined;
    }
  }

  return returner as SpyObject<T>;
};
