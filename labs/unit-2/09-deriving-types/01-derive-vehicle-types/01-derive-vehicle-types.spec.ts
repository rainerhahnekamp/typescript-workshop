import { expect, expectTypeOf, it } from "vitest";
import { vehicle, VEHICLE_STATUSES, type Vehicle, type VehicleKey, type Mileage, type VehicleStatus } from "./01-derive-vehicle-types";

it("derives contracts from the existing vehicle and runtime status list", () => {
  expectTypeOf<Vehicle>().toEqualTypeOf<typeof vehicle>();
  expectTypeOf<VehicleKey>().toEqualTypeOf<"vin" | "mileage" | "status">();
  expectTypeOf<Mileage>().toEqualTypeOf<number>();
  expectTypeOf<VehicleStatus>().toEqualTypeOf<"ready" | "delayed" | "quality-hold">();
  expect(VEHICLE_STATUSES).toContain(vehicle.status);
});

function rejectedValues() {
  // @ts-expect-error Only keys of the supplied vehicle are allowed.
  const key: VehicleKey = "charge";
  // @ts-expect-error Mileage is numeric.
  const mileage: Mileage = "12000";
  // @ts-expect-error Unsupported status.
  const status: VehicleStatus = "missing";
}
