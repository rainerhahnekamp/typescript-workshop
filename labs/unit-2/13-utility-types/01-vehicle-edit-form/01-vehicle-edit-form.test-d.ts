import { describe, expectTypeOf, it } from "vitest";
import type { SaveVehicle, VehicleDraft } from "./01-vehicle-edit-form";

describe("vehicle edit form types", () => {
  it("makes both editable fields optional in the draft", () => {
    expectTypeOf<VehicleDraft>().toEqualTypeOf<{
      brand?: string;
      mileage?: number;
    }>();
  });

  it("requires both editable fields in the save payload", () => {
    expectTypeOf<SaveVehicle>().toEqualTypeOf<{
      brand: string;
      mileage: number;
    }>();
  });
});
