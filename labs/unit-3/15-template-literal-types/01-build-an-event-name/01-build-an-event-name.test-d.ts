import { describe, expectTypeOf, it } from "vitest";
import type { VehicleEvent } from "./01-build-an-event-name";

describe("VehicleEvent", () => {
  it("prefixes each status in the union", () => {
    expectTypeOf<VehicleEvent<"ready" | "delayed">>().toEqualTypeOf<
      "vehicle:ready" | "vehicle:delayed"
    >();
  });
});
