import { describe, expectTypeOf, test } from "vitest";
import { assertType } from "./03-assert-type";

describe("assert type", () => {
  test("the caller chooses the exact output type independently of the input", () => {
    expectTypeOf(assertType<number>("this is a string")).toEqualTypeOf<number>();
    expectTypeOf(assertType<string>(true)).toEqualTypeOf<string>();
    expectTypeOf(assertType<Date>(undefined)).toEqualTypeOf<Date>();
    expectTypeOf(assertType<{ vin: string } | null>(false))
      .toEqualTypeOf<{ vin: string } | null>();
  });

  test("accepts unknown input and supplies no evidence for an inferred output", () => {
    const input: unknown = { vin: "JT-42" };
    expectTypeOf(assertType<Date>(input)).toEqualTypeOf<Date>();
    expectTypeOf(assertType(input)).toEqualTypeOf<unknown>();
    expectTypeOf(assertType("Toyota")).toEqualTypeOf<unknown>();
  });
});
