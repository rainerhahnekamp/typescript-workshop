import { describe, expect, it } from "vitest";
import { mapIsoDates } from "./03-nested-iso-dates";

describe("mapIsoDates", () => {
  it("replaces named date fields in a nested object and keeps the source intact", () => {
    const input = {
      name: "Rainer",
      events: { type: "marriage", eventDate: "2024-04-14" },
      details: { person: { birthdate: "1990-03-20" } },
      note: "2024-04-14",
      confirmed: false,
    };

    expect(mapIsoDates(input)).toEqual({
      ...input,
      events: { ...input.events, eventDate: new Date("2024-04-14") },
      details: { person: { birthdate: new Date("1990-03-20") } },
    });
    expect(input.events.eventDate).toBe("2024-04-14");
  });

  it("rejects an invalid value in a named date field", () => {
    expect(() => mapIsoDates({ events: { eventDate: "2024-02-30" } })).toThrow(
      RangeError,
    );
    expect(() => mapIsoDates({ events: { eventDate: "pending" } })).toThrow(
      RangeError,
    );
  });
});
