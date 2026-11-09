import { describe, expect, it } from "vitest";
import {
  VehicleClass,
  ElectricVehicleClass,
  VehicleFunction,
  ElectricVehicleFunction,
} from "./02-constructors-and-prototypes";

// Supplied constructor signatures: focus on runtime inheritance in this lab.
const implementations = [
  {
    name: "supplied classes",
    Base: VehicleClass,
    Electric: ElectricVehicleClass,
  },
  {
    name: "your constructor functions",
    Base: VehicleFunction as unknown as typeof VehicleClass,
    Electric: ElectricVehicleFunction as unknown as typeof ElectricVehicleClass,
  },
] as const;

describe.each(implementations)("$name", ({ Base, Electric }) => {
  it("constructs separate instances with the same public behavior", () => {
    const first = new Electric("JT-42");
    const second = new Electric("JT-43");

    expect(first).not.toBe(second);
    expect(first.vin).toBe("JT-42");
    expect(second.vin).toBe("JT-43");
    expect(first.describe()).toBe("vehicle:JT-42");
    expect(first.charge()).toBe("charging: JT-42");

    expect(new Base("JT-44").describe()).toBe("vehicle:JT-44");
  });

  it("keeps data on instances and shares methods through prototypes", () => {
    const first = new Electric("JT-42");
    const second = new Electric("JT-43");

    expect(Reflect.ownKeys(first)).toEqual(["vin"]);
    expect(Object.hasOwn(first, "describe")).toBe(false);
    expect(Object.hasOwn(first, "charge")).toBe(false);

    expect(first.describe).toBe(second.describe);
    expect(first.describe).toBe(Base.prototype.describe);
    expect(first.charge).toBe(Electric.prototype.charge);
  });

  it("links distinct prototype objects for instance inheritance", () => {
    const car = new Electric("JT-42");

    expect(Electric.prototype).not.toBe(Base.prototype);

    expect(Object.getPrototypeOf(car)).toBe(Electric.prototype);
    expect(Object.getPrototypeOf(Electric.prototype)).toBe(Base.prototype);
    expect(Object.getPrototypeOf(Base.prototype)).toBe(Object.prototype);
    expect(Object.hasOwn(Base.prototype, "charge")).toBe(false);

    expect(car).toBeInstanceOf(Electric);
    expect(car).toBeInstanceOf(Base);
  });

  it("links the constructors and inherits the static category", () => {
    expect(Object.getPrototypeOf(Electric)).toBe(Base);
    expect(Object.getPrototypeOf(Base)).toBe(Function.prototype);

    expect(Base.category).toBe("vehicle");
    expect(Electric.category).toBe("vehicle");
    expect(Object.hasOwn(Electric, "category")).toBe(false);
  });
});
