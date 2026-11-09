import { describe, expectTypeOf, it } from "vitest";
import type { DeepFlags } from "./02-flag-nested-fields";

describe("DeepFlags", () => {
  it("replaces the leaves of a nested record with booleans", () => {
    expectTypeOf<DeepFlags<{ vehicle: { vin: string }; ready: string }>>().toEqualTypeOf<
      { vehicle: { vin: boolean }; ready: boolean }
    >();
  });
});
