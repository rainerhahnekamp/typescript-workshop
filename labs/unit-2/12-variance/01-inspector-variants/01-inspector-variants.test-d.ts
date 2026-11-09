import { describe, expectTypeOf, test } from "vitest";
import {
  type Vehicle,
  type ElectricVehicle,
  type InspectorA,
  type InspectorB,
  type InspectorC,
  type InspectorD,
  createInspectorA,
  createInspectorB,
  createInspectorC,
  createInspectorD,
} from "./01-inspector-variants";

const electric: ElectricVehicle = { vin: "JT-1", charge: 80 };
const vehicle: Vehicle = { vin: "JT-2" };

describe("inspector variants", () => {
  test("A can be widened from electric vehicles to vehicles, but not narrowed", () => {
    const electricInspector = createInspectorA<ElectricVehicle>(electric);
    const vehicleInspector = createInspectorA<Vehicle>(vehicle);

    const wider: InspectorA<Vehicle> = electricInspector;
    // @ts-expect-error A vehicle-producing inspector cannot promise an EV result.
    const narrower: InspectorA<ElectricVehicle> = vehicleInspector;

    expectTypeOf(electricInspector.inspect).parameters.toEqualTypeOf<[]>();
    expectTypeOf(electricInspector.inspect()).toEqualTypeOf<ElectricVehicle>();
    expectTypeOf(wider.inspect()).toEqualTypeOf<Vehicle>();
  });

  test("B can be narrowed from vehicles to electric vehicles, but not widened", () => {
    const electricInspector = createInspectorB<ElectricVehicle>(value => {
      value.charge.toFixed();
    });
    const vehicleInspector = createInspectorB<Vehicle>(value => {
      value.vin.toUpperCase();
    });

    const narrower: InspectorB<ElectricVehicle> = vehicleInspector;
    // @ts-expect-error An EV-only inspector cannot accept every vehicle.
    const wider: InspectorB<Vehicle> = electricInspector;

    expectTypeOf(electricInspector.inspect).parameters.toEqualTypeOf<[value: ElectricVehicle]>();
    expectTypeOf(electricInspector.inspect).returns.toEqualTypeOf<void>();
    narrower.inspect(electric);
    // @ts-expect-error The narrowed API only accepts electric vehicles.
    narrower.inspect(vehicle);
  });

  test("C permits both assignment directions while keeping a typed inspect parameter", () => {
    const electricInspector = createInspectorC<ElectricVehicle>(value => {
      value.charge.toFixed();
    });
    const vehicleInspector = createInspectorC<Vehicle>(value => {
      value.vin.toUpperCase();
    });

    const wider: InspectorC<Vehicle> = electricInspector;
    const narrower: InspectorC<ElectricVehicle> = vehicleInspector;

    expectTypeOf(electricInspector.inspect).parameters.toEqualTypeOf<[value: ElectricVehicle]>();
    expectTypeOf(electricInspector.inspect).returns.toEqualTypeOf<void>();
    expectTypeOf(wider.inspect).parameters.toEqualTypeOf<[value: Vehicle]>();
    expectTypeOf(narrower.inspect).parameters.toEqualTypeOf<[value: ElectricVehicle]>();
    // @ts-expect-error Both assignments are allowed, but the original parameter stays specific.
    electricInspector.inspect(vehicle);
  });

  test("D permits neither assignment direction because it accepts and returns T", () => {
    const electricInspector = createInspectorD<ElectricVehicle>(value => ({
      ...value,
      charge: Math.min(100, value.charge),
    }));
    const vehicleInspector = createInspectorD<Vehicle>(value => value);

    // @ts-expect-error Widening would allow a non-electric input.
    const wider: InspectorD<Vehicle> = electricInspector;
    // @ts-expect-error Narrowing would promise an electric output the source cannot guarantee.
    const narrower: InspectorD<ElectricVehicle> = vehicleInspector;

    expectTypeOf(electricInspector.inspect).parameters.toEqualTypeOf<[value: ElectricVehicle]>();
    expectTypeOf(electricInspector.inspect(electric)).toEqualTypeOf<ElectricVehicle>();
    // @ts-expect-error The input must also be an electric vehicle.
    electricInspector.inspect(vehicle);
  });
});
