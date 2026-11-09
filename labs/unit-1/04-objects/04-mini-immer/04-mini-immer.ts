// Supplied type: focus on runtime property behavior, not generic typing.
export type Car = {
  brand: string;
  mileage: number;
  price?: {
    value: number;
    currency: string;
  };
};

// Build a draft with getters and setters using Object.defineProperty.
// Support writes to the existing brand and mileage properties without Proxy.
export function update(car: Car, change: (draft: Car) => void): Car {
  throw new Error("Implement update");
}
