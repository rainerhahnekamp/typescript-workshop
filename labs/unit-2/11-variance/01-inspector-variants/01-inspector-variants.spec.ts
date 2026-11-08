import { expect, test } from "vitest";
import {
  type Vehicle,
  type ElectricVehicle,
  type InspectorC,
  createInspectorA,
  createInspectorB,
  createInspectorC,
  createInspectorD,
} from "./01-inspector-variants";

test("A returns the value it holds", () => {
  const electric: ElectricVehicle = { vin: "JT-1", charge: 80 };
  expect(createInspectorA(electric).inspect()).toBe(electric);
});

test("B and C report on the supplied vehicle", () => {
  const inspected: string[] = [];
  const report = (vehicle: Vehicle) => {
    inspected.push(vehicle.vin);
  };
  createInspectorB(report).inspect({ vin: "JT-1" });
  createInspectorC(report).inspect({ vin: "JT-2" });
  expect(inspected).toEqual(["JT-1", "JT-2"]);
});

test("D returns the review result without changing the original vehicle", () => {
  const electric: ElectricVehicle = { vin: "JT-1", charge: 120 };
  const inspector = createInspectorD<ElectricVehicle>(vehicle => ({
    ...vehicle,
    charge: Math.min(100, vehicle.charge),
  }));

  expect(inspector.inspect(electric)).toEqual({ vin: "JT-1", charge: 100 });
  expect(electric.charge).toBe(120);
});

test("the unsafe C assignment compiles but fails for a non-electric vehicle", () => {
  const electricOnly = createInspectorC<ElectricVehicle>(vehicle => {
    vehicle.charge.toFixed();
  });
  const acceptsAnyVehicle: InspectorC<Vehicle> = electricOnly;

  expect(() => acceptsAnyVehicle.inspect({ vin: "JT-2" })).toThrow(TypeError);
});
