import { describe, expect, expectTypeOf, it } from "vitest";
import {
  parseEvent,
  type ParsedEvent,
  type RawEvent,
} from "./02-nested-event-date";

describe("nested event date", () => {
  it("converts one known nested date and preserves the original event", () => {
    const raw: RawEvent = {
      name: "Rainer",
      event: { type: "marriage", eventDate: "2024-04-14" },
    };

    expect(parseEvent(raw)).toEqual({
      name: "Rainer",
      event: { type: "marriage", eventDate: new Date("2024-04-14") },
    });
    expect(raw.event.eventDate).toBe("2024-04-14");
  });

  expectTypeOf<ParsedEvent>().toExtend<{
    name: string;
    event: { type: string; eventDate: Date };
  }>();
  expectTypeOf<ParsedEvent["event"]["eventDate"]>().toEqualTypeOf<Date>();
});
