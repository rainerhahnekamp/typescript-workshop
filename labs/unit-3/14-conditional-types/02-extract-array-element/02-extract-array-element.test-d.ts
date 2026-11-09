import { describe, expectTypeOf, it } from "vitest";
import type { ElementOf } from "./02-extract-array-element";

describe("ElementOf", () => {
  it("extracts the element type of an array", () => {
    expectTypeOf<ElementOf<string[]>>().toEqualTypeOf<string>();
  });

  it("returns never for a non-array type", () => {
    expectTypeOf<ElementOf<boolean>>().toEqualTypeOf<never>();
  });
});
