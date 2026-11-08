import { describe, expectTypeOf, it } from "vitest";
import type { Leaf } from "./01-find-the-base-case";

describe("Leaf", () => {
  it("unwraps nested arrays", () => {
    expectTypeOf<Leaf<string[][]>>().toEqualTypeOf<string>();
  });

  it("returns the input type at the base case", () => {
    expectTypeOf<Leaf<boolean>>().toEqualTypeOf<boolean>();
  });
});
