import { describe, expectTypeOf, it } from "vitest";
import type { IsNumber } from "./01-recognize-a-number";

describe("IsNumber", () => {
  it("recognizes a numeric literal", () => {
    expectTypeOf<IsNumber<42>>().toEqualTypeOf<true>();
  });

  it("returns false for a string literal", () => {
    expectTypeOf<IsNumber<"ready">>().toEqualTypeOf<false>();
  });
});
