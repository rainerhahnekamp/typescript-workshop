import { describe, expect, expectTypeOf, it } from "vitest";
import {
  type DependencyResults,
  withDependencies,
} from "./04-variadic-dependencies";

type VehicleContext = {
  vin: string;
  plant: string;
};

describe("variadic dependency tuples", () => {
  it("preserves the number, order, and result type of every dependency", async () => {
    const result = await withDependencies(
      { vin: "JT123456789", plant: "Burnaston" },
      (vehicle) => vehicle.vin.length,
      async () => "night" as const,
      () => ({ canEdit: true }) as const,
    );

    expectTypeOf(result).toEqualTypeOf<
      [VehicleContext, number, "night", { readonly canEdit: true }]
    >();
    expect(result).toEqual([
      { vin: "JT123456789", plant: "Burnaston" },
      11,
      "night",
      { canEdit: true },
    ]);
  });

  it("maps a dependency tuple to its awaited result tuple", () => {
    type Results = DependencyResults<
      VehicleContext,
      [
        (vehicle: VehicleContext) => number,
        (vehicle: VehicleContext) => Promise<string>,
      ]
    >;

    expectTypeOf<Results>().toEqualTypeOf<[number, string]>();
  });

  it("keeps the source value when no dependencies are supplied", async () => {
    const result = await withDependencies({ vin: "JT123456789" });

    expectTypeOf(result).toEqualTypeOf<[{ vin: string }]>();
    expect(result).toEqual([{ vin: "JT123456789" }]);
  });

  it("rejects values that are not dependency functions", () => {
    if (false) {
      // @ts-expect-error every tuple position must be a dependency function
      void withDependencies({ vin: "JT123456789" }, "not a dependency");
    }

    expect(true).toBe(true);
  });
});
