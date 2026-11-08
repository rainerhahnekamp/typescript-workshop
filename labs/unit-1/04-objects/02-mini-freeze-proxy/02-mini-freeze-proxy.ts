// Supplied type: focus on runtime property behavior, not generic typing.
export type Car = {
  speed: number;
  engine: { horsepower: number };
  [key: symbol]: unknown;
};

// Return a shallow readonly Proxy.
export function freeze(object: Car): Car {
  throw new Error("Implement freeze with Proxy");
}
