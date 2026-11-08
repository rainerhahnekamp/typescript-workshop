export type Spy = {
  calls: unknown[][];
};

export function spyOn(object: object, key: PropertyKey): Spy {
  const calls: unknown[][] = [];
  const original = Reflect.get(object, key);

  Object.defineProperty(object, key, {
    value: function (this: unknown, ...args: unknown[]) {
      calls.push(args);
      return Reflect.apply(original, this, args);
    },
  });

  return { calls };
}