// Supplied type: focus on runtime property behavior, not generic typing.
export type Car = {
  brand: string;
  mileage: number;
  price?: {
    value: number;
    currency: string;
  };
};

// Build a draft with Proxy get and set traps.
// Support synchronous edits to existing top-level properties.
export function update(car: Car, change: (draft: Car) => void): Car {
  throw new Error("Implement update with Proxy");
}
