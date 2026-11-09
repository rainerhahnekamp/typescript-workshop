import { describe, expect, it } from "vitest";
import { mapDate } from "./05-map-date";

describe("mapDate", () => {
  it("preserves null, existing Dates and nested array shapes", () => {
    const date = new Date(2026, 0, 1);
    const source = { events: [null, date, [{ eventDate: "2026-01-01" }]] };
    expect(mapDate(source)).toEqual({
      events: [null, date, [{ eventDate: date }]],
    });
    expect(source.events[2]).toEqual([{ eventDate: "2026-01-01" }]);
  });

  it("does not copy inherited properties", () => {
    const source = Object.assign(
      Object.create({ inheritedDate: "2026-01-01" }),
      {
        ownDate: "2026-01-02",
      },
    );
    expect(mapDate(source)).toEqual({ ownDate: new Date(2026, 0, 2) });
  });
  it("should not be able to pass a primitive value", () => {
    // @ts-expect-error
    mapDate(1);

    // @ts-expect-error
    mapDate(false);

    // @ts-expect-error
    mapDate("does this work?");
  });

  it("should clone the original", () => {
    const person = { id: 1, firstname: "franz", birthdate: "1998-09-05" };
    expect(mapDate(person)).not.toBe(person);
  });

  it("should map properties ending with date", () => {
    const person = { id: 1, firstname: "franz", birthdate: "1998-09-05" };
    expect(mapDate(person)).toEqual({
      id: 1,
      firstname: "franz",
      birthdate: new Date(1998, 8, 5),
    });
  });

  it("should map properties ending with Date", () => {
    const person = { id: 1, firstname: "franz", birthDate: "1998-09-05" };
    expect(mapDate(person)).toEqual({
      id: 1,
      firstname: "franz",
      birthDate: new Date(1998, 8, 5),
    });
  });

  it("should not map properties ending with date or Date when they are not strings", () => {
    const person = { id: 1, firstname: "franz", birthDate: 123 };
    expect(mapDate(person)).toEqual({
      id: 1,
      firstname: "franz",
      birthDate: 123,
    });
  });

  it("should map properties containg an array, ending with Dates", () => {
    const person = {
      id: 1,
      firstname: "franz",
      importantDates: ["1998-09-05", "2001-12-01", "2018-10-10"],
    };
    expect(mapDate(person)).toEqual({
      id: 1,
      firstname: "franz",
      importantDates: [
        new Date(1998, 8, 5),
        new Date(2001, 11, 1),
        new Date(2018, 9, 10),
      ],
    });
  });

  it("should traverse resursively", () => {
    const person = {
      id: 1,
      firstname: "franz",
      events: { birthDate: "1998-09-05", marriageDate: "2018-10-10" },
    };

    expect(mapDate(person)).toEqual({
      id: 1,
      firstname: "franz",
      events: {
        birthDate: new Date(1998, 8, 5),
        marriageDate: new Date(2018, 9, 10),
      },
    });
  });

  it("should traverse recursively within an array", () => {
    const person = {
      id: 1,
      firstname: "franz",
      events: [
        { type: "birthday", eventDate: "1998-09-05" },
        { type: "marriage", eventDate: "2018-10-10" },
      ],
    };
    expect(mapDate(person)).toEqual({
      id: 1,
      firstname: "franz",
      events: [
        { type: "birthday", eventDate: new Date(1998, 8, 5) },
        { type: "marriage", eventDate: new Date(2018, 9, 10) },
      ],
    });
  });
});
