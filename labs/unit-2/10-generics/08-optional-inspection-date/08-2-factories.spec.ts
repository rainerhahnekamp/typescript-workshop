import { describe, expect, expectTypeOf, it } from "vitest";
import { z, type Schema } from "./08-optional-schema";

describe("Step 2: preserve schema factory outputs", () => {
  it("preserves each factory's parsed output type", () => {
    expectTypeOf(z.string()).toEqualTypeOf<Schema<string>>();
    expectTypeOf(z.number()).toEqualTypeOf<Schema<number>>();
    expectTypeOf(z.boolean()).toEqualTypeOf<Schema<boolean>>();
    expectTypeOf(z.date()).toEqualTypeOf<Schema<Date>>();
  });

  it("keeps the supplied validation and date conversion", () => {
    expect(z.string().parse("JT-42")).toBe("JT-42");
    expect(z.number().parse(0)).toBe(0);
    expect(z.boolean().parse(false)).toBe(false);
    expect(z.date().parse("2024-04-14T00:00:00.000Z")).toEqual(
      new Date("2024-04-14T00:00:00.000Z"),
    );
    expect(() => z.string().parse(42)).toThrow(TypeError);
    expect(() => z.number().parse("42")).toThrow(TypeError);
    expect(() => z.boolean().parse("false")).toThrow(TypeError);
    expect(() => z.date().parse("not-a-date")).toThrow(TypeError);
  });

  it("keeps the Unit 1 object parser working with unknown output", () => {
    const schema = z.object({ vin: z.string(), mileage: z.number() });
    expectTypeOf(schema.parse).returns.toBeUnknown();
    expect(schema.parse({ vin: "JT-42", mileage: 0 })).toEqual({
      vin: "JT-42",
      mileage: 0,
    });
  });
});
