import { describe, expect, expectTypeOf, it } from "vitest";
import {
  saveVehicle,
  type SaveVehicle,
  type VehicleDraft,
} from "./01-vehicle-edit-form";
import type { update } from "../../../unit-1/04-objects/04-mini-immer/04-mini-immer";

const car = { vin: "JT-42", brand: "Toyota", mileage: 100 };

// Supply the Unit 1 updater contract so this exercise runs on its own.
const updateCar: typeof update = (current, change) => {
  const draft = { brand: current.brand, mileage: current.mileage };
  change(draft);
  return draft;
};

describe("vehicle edit form", () => {
  it("applies a partial draft without changing the original car or its VIN", () => {
    let calls = 0;
    const updated = saveVehicle(car, { mileage: 0 }, (current, change) => {
      calls += 1;
      return updateCar(current, change);
    });
    expect(calls).toBe(1);
    expect(updated).toEqual({ vin: "JT-42", brand: "Toyota", mileage: 0 });
    expect(car.mileage).toBe(100);
  });

  it("keeps an explicitly cleared brand", () => {
    expect(saveVehicle(car, { brand: "" }, updateCar).brand).toBe("");
  });

  expectTypeOf<VehicleDraft>().toEqualTypeOf<{
    brand?: string;
    mileage?: number;
  }>();
  expectTypeOf<SaveVehicle>().toEqualTypeOf<{ brand: string; mileage: number }>();

  function checkRejectedDraft() {
    // @ts-expect-error: VIN is fixed
    saveVehicle(car, { vin: "other" }, updateCar);
  }
});
