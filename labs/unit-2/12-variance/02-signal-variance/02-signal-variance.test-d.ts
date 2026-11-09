import { describe, expectTypeOf, test } from "vitest";
import { createSignal, type Signal, type WritableSignal } from "./02-signal-variance";

type Vehicle = { vin: string };
type ElectricVehicle = Vehicle & { charge: number };

describe("signal variance", () => {
  test("a writable Signal cannot be widened or narrowed", () => {
    const electric = createSignal<ElectricVehicle>({ vin: "JT-1", charge: 80 });
    const vehicle = createSignal<Vehicle>({ vin: "JT-2" });

    // @ts-expect-error This alias would allow a write that drops charge.
    const wider: WritableSignal<Vehicle> = electric;
    // @ts-expect-error The source may return a vehicle without charge.
    const narrower: WritableSignal<ElectricVehicle> = vehicle;
  });

  test("a read-only Signal can be widened without granting write access", () => {
    const electric = createSignal<ElectricVehicle>({ vin: "JT-1", charge: 80 });
    const readElectric = electric.asReadonly();
    expectTypeOf(readElectric).toEqualTypeOf<Signal<ElectricVehicle>>();

    const readVehicle: Signal<Vehicle> = readElectric;
    expectTypeOf(readVehicle()).toEqualTypeOf<Vehicle>();

    // @ts-expect-error The broader reader may return a vehicle without charge.
    const narrower: Signal<ElectricVehicle> = readVehicle;
    // @ts-expect-error The view has no setter.
    readVehicle.set({ vin: "JT-2" });
    // @ts-expect-error The view has no updater.
    readVehicle.update((current: Vehicle) => current);
  });
});
