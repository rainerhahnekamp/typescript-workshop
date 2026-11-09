export type Spy = {
  calls: unknown[][];
};

// Record calls to an own, writable method while keeping its behavior.
export function spyOn(object: object, key: PropertyKey): Spy {
  // Use this wrapper when replacing the original method.
  function wrapper(this: unknown, ...args: unknown[]) {
    throw new Error("Implement the wrapper");
  }

  throw new Error("Implement spyOn");
}
