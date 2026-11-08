export type Spy = {
  calls: unknown[][];
};

// Record calls to an own, writable method while keeping its behavior.
export function spyOn(object: object, key: PropertyKey): Spy {
  throw new Error("Implement spyOn");
}
