import { describe, expectTypeOf, test } from "vitest";
import type {
  ElectricVehicle,
  Inspector,
  Seller,
  SpecializedInspector,
  SpecializedSeller,
  SwappableInspector,
  Vehicle,
} from "./01-inspector-variants";

declare const vehicle: Vehicle;
declare const electricVehicle: ElectricVehicle;
declare const vehicleSeller: Seller<Vehicle>;
declare const electricVehicleSeller: Seller<ElectricVehicle>;
declare const vehicleInspector: Inspector<Vehicle>;
declare const electricVehicleInspector: Inspector<ElectricVehicle>;
declare const swappableVehicleInspector: SwappableInspector<Vehicle>;
declare const swappableElectricVehicleInspector: SwappableInspector<ElectricVehicle>;
declare const specializedVehicleSeller: SpecializedSeller<Vehicle>;
declare const specializedElectricVehicleSeller: SpecializedSeller<ElectricVehicle>;
declare const specializedVehicleInspector: SpecializedInspector<Vehicle>;
declare const specializedElectricVehicleInspector: SpecializedInspector<ElectricVehicle>;

describe("vehicle sellers and inspectors", () => {
  test("1. an EV seller can fill a general vehicle seller's role", () => {
    const generalSeller: Seller<Vehicle> = electricVehicleSeller;
    // @ts-expect-error A general seller cannot promise an electric vehicle.
    const electricSeller: Seller<ElectricVehicle> = vehicleSeller;

    expectTypeOf(electricVehicleSeller.sell).toEqualTypeOf<() => ElectricVehicle>();
    expectTypeOf(generalSeller.sell()).toEqualTypeOf<Vehicle>();
  });

  test("2. a general inspector can take an EV-only job", () => {
    const electricInspector: Inspector<ElectricVehicle> = vehicleInspector;
    // @ts-expect-error An EV-only inspector cannot take every vehicle.
    const generalInspector: Inspector<Vehicle> = electricVehicleInspector;

    expectTypeOf(vehicleInspector.inspect).toEqualTypeOf<(vehicle: Vehicle) => void>();
    expectTypeOf(electricInspector.inspect).toEqualTypeOf<(vehicle: ElectricVehicle) => void>();
    electricInspector.inspect(electricVehicle);
    // @ts-expect-error The EV role accepts electric vehicles.
    electricInspector.inspect(vehicle);
  });

  test("3. the compiler allows both inspector swaps", () => {
    const generalInspector: SwappableInspector<Vehicle> = swappableElectricVehicleInspector;
    const electricInspector: SwappableInspector<ElectricVehicle> = swappableVehicleInspector;

    expectTypeOf(generalInspector.inspect).toEqualTypeOf<(vehicle: Vehicle) => void>();
    expectTypeOf(electricInspector.inspect).toEqualTypeOf<(vehicle: ElectricVehicle) => void>();
    generalInspector.inspect(vehicle);
    electricInspector.inspect(electricVehicle);
    // @ts-expect-error The original EV inspector still expects an electric vehicle.
    swappableElectricVehicleInspector.inspect(vehicle);
  });

  test("4. each specialized role rejects swaps in either direction", () => {
    // @ts-expect-error Keep the seller's electric specialization.
    const generalSeller: SpecializedSeller<Vehicle> = specializedElectricVehicleSeller;
    // @ts-expect-error Keep the seller's general specialization.
    const electricSeller: SpecializedSeller<ElectricVehicle> = specializedVehicleSeller;
    // @ts-expect-error Keep the inspector's electric specialization.
    const generalInspector: SpecializedInspector<Vehicle> = specializedElectricVehicleInspector;
    // @ts-expect-error Keep the inspector's general specialization.
    const electricInspector: SpecializedInspector<ElectricVehicle> = specializedVehicleInspector;

    expectTypeOf<keyof SpecializedSeller<Vehicle>>().toEqualTypeOf<"sell">();
    expectTypeOf<keyof SpecializedInspector<Vehicle>>().toEqualTypeOf<"inspect">();
    expectTypeOf(specializedVehicleSeller.sell).toEqualTypeOf<() => Vehicle>();
    expectTypeOf(specializedElectricVehicleSeller.sell).toEqualTypeOf<() => ElectricVehicle>();
    expectTypeOf(specializedVehicleInspector.inspect).toEqualTypeOf<(vehicle: Vehicle) => void>();
    expectTypeOf(specializedElectricVehicleInspector.inspect).toEqualTypeOf<(vehicle: ElectricVehicle) => void>();
  });
});
