export type Spy = {
  calls: unknown[][];
};

export function spyOn(object: object, key: PropertyKey): Spy {
  const spy: Spy = { calls: [] };
  const original = Reflect.get(object, key);

  // Use this wrapper when replacing the original method.
  function wrapper(this: unknown, ...args: unknown[]) {
    spy.calls.push(args);
    return Reflect.apply(original, this, args);
  }

  Object.defineProperty(object, key, {
    value: wrapper,
  });

  return spy;
}