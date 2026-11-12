import { describe, expectTypeOf, it } from "vitest";
import type { Flags } from "./01-turn-fields-into-flags";

describe("Flags", () => {
  it("preserves the keys and gives every property a boolean type", () => {
    expectTypeOf<Flags<{ vin: string; mileage: number }>>().toEqualTypeOf<{
      vin: boolean;
      mileage: boolean;
    }>();
  });
});
