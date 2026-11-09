import { describe, expectTypeOf, it } from "vitest";
import {
  defineSchema,
  parseVehicle,
  parseVehicles,
  type Vehicle,
} from "./05-mini-zod-composition";

type ExpectedVehicle = {
  vin: string;
  producedAt: Date;
  inspections: boolean[];
};

describe("Mini-Zod schema inference", () => {
  it("infers the vehicle and list outputs while accepting unknown input", () => {
    expectTypeOf<Vehicle>().toEqualTypeOf<ExpectedVehicle>();
    expectTypeOf(parseVehicle).toEqualTypeOf<
      (value: unknown) => ExpectedVehicle
    >();
    expectTypeOf(parseVehicles).toEqualTypeOf<
      (value: unknown) => ExpectedVehicle[]
    >();
  });

  it("infers both outputs from a different schema", () => {
    const [parse, parseMany] = defineSchema((z) => ({
      odometer: z.number(),
      scheduled: z.array(z.date()),
    }));

    type Maintenance = { odometer: number; scheduled: Date[] };
    expectTypeOf(parse).returns.toEqualTypeOf<Maintenance>();
    expectTypeOf(parseMany).returns.toEqualTypeOf<Maintenance[]>();
  });

  it("rejects a plain value in place of a schema field", () => {
    // @ts-expect-error A plain value cannot take the place of a schema.
    defineSchema(() => ({ vin: "JT-42" }));
  });
});
