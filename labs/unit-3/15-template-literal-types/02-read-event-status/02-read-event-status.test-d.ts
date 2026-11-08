import { describe, expectTypeOf, it } from "vitest";
import type { EventStatus } from "./02-read-event-status";

describe("EventStatus", () => {
  it("extracts the status after the vehicle prefix", () => {
    expectTypeOf<EventStatus<"vehicle:ready">>().toEqualTypeOf<"ready">();
  });

  it("returns never for a different prefix", () => {
    expectTypeOf<EventStatus<"plant:ready">>().toEqualTypeOf<never>();
  });
});
