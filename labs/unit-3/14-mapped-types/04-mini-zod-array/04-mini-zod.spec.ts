import { describe, expect, expectTypeOf, it } from "vitest";
import { z } from "./04-mini-zod";

const personSchema = z.object({ id: z.number(), first: z.string() });
type Person = { id: number; first: string };

describe("Mini-Zod array parsing", () => {
  it("parses a list of people and preserves the inferred item type", () => {
    const peopleSchema = z.array(personSchema);
    const people = [{ id: 1, first: "Ada" }];

    expectTypeOf(peopleSchema.parse).toEqualTypeOf<
      (value: unknown) => Person[]
    >();
    expect(peopleSchema.parse(people)).toEqual(people);
  });

  it("accepts an empty array and returns an empty array", () => {
    expect(z.array(personSchema).parse([])).toEqual([]);
  });

  it("rejects a non-array or an invalid item", () => {
    const peopleSchema = z.array(personSchema);
    const valid = { id: 1, first: "Ada" };
    expect(() => peopleSchema.parse(valid)).toThrow(TypeError);
    expect(() => peopleSchema.parse([valid, { ...valid, id: "1" }])).toThrow(
      TypeError,
    );
  });
});
