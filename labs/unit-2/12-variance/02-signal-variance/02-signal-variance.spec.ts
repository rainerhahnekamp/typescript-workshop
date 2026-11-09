import { describe, expect, it } from "vitest";
import { createSignal } from "./02-signal-variance";

type Vehicle = { vin: string };
type ElectricVehicle = Vehicle & { charge: number };

// Keep the method signature here so this example still reproduces the bug
// after the exercise's writable Signal has been fixed.
type MethodSignal<T> = (() => T) & { set(value: T): void };

describe("signal variance", () => {
  it("reproduces the unsafe write through a method signature", () => {
    let current: ElectricVehicle = { vin: "JT-1", charge: 80 };
    const electric: MethodSignal<ElectricVehicle> = Object.assign(() => current, {
      set(value: ElectricVehicle) {
        current = value;
      },
    });

    const vehicle: MethodSignal<Vehicle> = electric;
    vehicle.set({ vin: "JT-2" });

    // The compiler still thinks electric().charge is a number.
    expect(electric().charge).toBeUndefined();
  });

  describe("a live read-only Signal", () => {
    it("shares a branded read-only view that follows writes to the source", () => {
      const initial: ElectricVehicle = { vin: "JT-1", charge: 80 };
      const electric = createSignal(initial);
      const view = electric.asReadonly();

      expect(view()).toBe(initial);
      expect("set" in view).toBe(false);
      expect("update" in view).toBe(false);
      expect(Object.getOwnPropertySymbols(view)).toEqual(
        Object.getOwnPropertySymbols(electric),
      );

      const replacement = { vin: "JT-2", charge: 60 };
      electric.set(replacement);
      expect(view()).toBe(replacement);
      electric.update((current) => ({ ...current, charge: 90 }));
      expect(view()).toEqual({ vin: "JT-2", charge: 90 });
    });
  });
});
