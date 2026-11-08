import { describe, expect, it } from "vitest";
import { update } from "./08-mini-immer-proxy";

describe("Update a car with Proxy", () => {
  it("returns a new object if draft gets changed", () => {
    const car = { brand: "Toyota", mileage: 100 };

    const result = update(car, (draft) => {
      draft.mileage += 49;
    });

    expect(result.mileage).toBe(149);
    expect(car.mileage).toBe(100);
  });

  it("returns the original for no updates", () => {
    const car = { brand: "Toyota", mileage: 100 };

    const result = update(car, () => {
      void true;
    });

    expect(result).toBe(car);
  });

  it("returns the original when update happend with same value (v1)", () => {
    const car = { brand: "Toyota", mileage: 100 };

    const result = update(car, (draft) => {
      draft.mileage = 100;
    });

    expect(result).toBe(car);
  });

  it("returns the original when update happend with same value (v2)", () => {
    const car = {
      brand: "Toyota",
      mileage: NaN,
    };

    const result = update(car, (draft) => (draft.mileage = NaN));

    expect(result).toBe(car);
  });

  it("throws an Error when for getter-only properties", () => {
    const car = {
      brand: "Toyota",
      get mileage() {
        return 100;
      },
    };

    expect(() => update(car, (draft) => (draft.mileage = 10))).toThrow(Error);
  });

  it("throws an Error when for non-writable properties", () => {
    const car = { brand: "Toyota", mileage: 100 };
    Object.defineProperty(car, "mileage", { writable: false });

    expect(() => update(car, (draft) => (draft.mileage = 10))).toThrow(Error);
  });

  it("leaves unchanged properties in their original", () => {
    const car = {
      brand: "Toyota",
      mileage: 100,
      price: { value: 20_000, currency: "EUR" },
    };

    const result = update(car, (draft) => (draft.brand = "Lexus"));

    expect(result.price).toBe(car.price);
  });
});
