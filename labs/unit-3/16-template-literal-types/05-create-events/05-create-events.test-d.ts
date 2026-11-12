import { describe, expectTypeOf, it } from "vitest";
import { createEvents, type } from "./05-create-events";
import type { EventFromGroup } from "./05-create-events";

const events = createEvents({
  source: "Vehicle Page",
  events: {
    opened: type<void>(),
    mileageRecorded: type<{ vin: string; mileage: number }>(),
    vehicleSelected: type<string | null>(),
  },
});

describe("createEvents", () => {
  it("keeps the input keys and gives each creator its exact event type", () => {
    expectTypeOf<keyof typeof events>().toEqualTypeOf<
      "opened" | "mileageRecorded" | "vehicleSelected"
    >();
    expectTypeOf(events.opened.type).toEqualTypeOf<"[Vehicle Page] opened">();
    expectTypeOf(events.mileageRecorded.type).toEqualTypeOf<
      "[Vehicle Page] mileageRecorded"
    >();
  });

  it("requires the correct payload for events that carry one", () => {
    const event = events.mileageRecorded({ vin: "JT-42", mileage: 150 });
    expectTypeOf(event).toEqualTypeOf<{
      type: "[Vehicle Page] mileageRecorded";
      payload: { vin: string; mileage: number };
    }>();

    // @ts-expect-error The mileage event requires a payload.
    events.mileageRecorded();
    // @ts-expect-error Mileage must be a number.
    events.mileageRecorded({ vin: "JT-42", mileage: "150" });
  });

  it("takes no arguments for a payload-free event", () => {
    expectTypeOf(events.opened()).toEqualTypeOf<{
      type: "[Vehicle Page] opened";
      payload: void;
    }>();
    // @ts-expect-error The opened event takes no arguments.
    events.opened(undefined);
  });

  it("accepts the whole payload union in one creator", () => {
    expectTypeOf(events.vehicleSelected("JT-42").payload).toEqualTypeOf<string | null>();
    expectTypeOf(events.vehicleSelected(null).payload).toEqualTypeOf<string | null>();
    // @ts-expect-error Null is a valid payload, but the argument is required.
    events.vehicleSelected();
  });

  it("derives a discriminated union of the events that the group can create", () => {
    function readPayload(event: EventFromGroup<typeof events>) {
      if (event.type === "[Vehicle Page] mileageRecorded") {
        expectTypeOf(event.payload).toEqualTypeOf<{ vin: string; mileage: number }>();
      } else if (event.type === "[Vehicle Page] opened") {
        expectTypeOf(event.payload).toEqualTypeOf<void>();
      } else {
        expectTypeOf(event.type).toEqualTypeOf<"[Vehicle Page] vehicleSelected">();
        expectTypeOf(event.payload).toEqualTypeOf<string | null>();
      }
    }

    readPayload(events.opened());
    readPayload(events.vehicleSelected(null));
    readPayload(events.mileageRecorded({ vin: "JT-42", mileage: 150 }));
    // @ts-expect-error This payload belongs to a different event.
    readPayload({ type: "[Vehicle Page] mileageRecorded", payload: null });
  });
});
