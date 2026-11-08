import { describe, expectTypeOf, it } from "vitest";
import type { Remaining } from "./02-drop-first-argument";

describe("Remaining", () => {
  it("keeps the parameter tuple after its first position", () => {
    expectTypeOf<Remaining<[string, boolean, number]>>().toEqualTypeOf<
      [boolean, number]
    >();
  });

  it("preserves an empty tuple", () => {
    expectTypeOf<Remaining<[]>>().toEqualTypeOf<[]>();
  });
});
