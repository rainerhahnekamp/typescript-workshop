import { describe, expectTypeOf, it } from "vitest";
import { mapIsoDates } from "./03-nested-iso-dates";

function fromApi(eventDate: string, birthdate: string, confirmed: boolean) {
  return mapIsoDates({
    name: "Rainer",
    events: { type: "marriage", eventDate },
    details: { person: { birthdate } },
    note: "2024-04-14",
    confirmed,
  });
}

describe("mapIsoDates output types", () => {
  it("replaces nested date fields and preserves the other types", () => {
    expectTypeOf(fromApi).returns.toEqualTypeOf<{
      name: string;
      events: { type: string; eventDate: Date };
      details: { person: { birthdate: Date } };
      note: string;
      confirmed: boolean;
    }>();
  });
});
