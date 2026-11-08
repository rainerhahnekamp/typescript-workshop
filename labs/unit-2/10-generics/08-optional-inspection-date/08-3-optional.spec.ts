import { describe, expect, expectTypeOf, it } from "vitest";
import { optional, z, type Schema } from "./08-optional-schema";

describe("Step 3: implement generic optional", () => {
  it("infers optional output types from the supplied schema", () => {
    expectTypeOf(optional(z.string())).toEqualTypeOf<Schema<string | undefined>>();
    expectTypeOf(optional(z.number())).toEqualTypeOf<Schema<number | undefined>>();
    expectTypeOf(optional(z.boolean())).toEqualTypeOf<Schema<boolean | undefined>>();
    expectTypeOf(optional(z.date())).toEqualTypeOf<Schema<Date | undefined>>();
  });

  it("accepts undefined directly", () => {
    const schema = optional(z.date());
    expect(schema.parse(undefined)).toBeUndefined();
  });

  it("preserves the wrapped date schema's conversion", () => {
    const schema = optional(z.date());
    const inspectedAt = "2024-04-14T00:00:00.000Z";
    expect(schema.parse(inspectedAt)).toEqual(new Date(inspectedAt));
  });

  it("preserves the wrapped date schema's validation error", () => {
    const schema = optional(z.date());
    for (const value of ["not-a-date", null]) {
      expect(() => schema.parse(value)).toThrow(TypeError);
    }
  });

  it("also wraps a boolean schema and preserves false", () => {
    const inspectionSchema = optional(z.boolean());
    expect(inspectionSchema.parse(false)).toBe(false);
    expectTypeOf(inspectionSchema.parse).returns.toEqualTypeOf<boolean | undefined>();
  });

  it("makes the parsed optional date usable as Date or undefined", () => {
    const schema = optional(z.date());
    const inspectedAt = schema.parse("2024-04-14T00:00:00.000Z");
    expectTypeOf(inspectedAt).toEqualTypeOf<Date | undefined>();
    expect(inspectedAt?.getUTCFullYear()).toBe(2024);
  });
});
