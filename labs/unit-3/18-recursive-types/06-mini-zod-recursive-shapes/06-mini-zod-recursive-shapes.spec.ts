import { describe, expect, expectTypeOf, it } from "vitest";
import { z } from "./06-mini-zod";
import { nestedObject } from "./06-mini-zod-recursive-shapes";

describe("mini zod recursive shapes", () => {
  it("preserves nested keys and applies the leaf schemas", () => {
    const schema = nestedObject({
      id: z.number(),
      profile: {
        name: { first: z.string(), last: z.string() },
        joined: z.date(),
      },
    });

    type Person = {
      id: number;
      profile: { name: { first: string; last: string }; joined: Date };
    };
    expectTypeOf(schema.parse).toEqualTypeOf<(value: unknown) => Person>();

    const joined = "2024-04-19T00:00:00.000Z";
    const name = { first: "Ada", last: "Lovelace" };
    expect(schema.parse({ id: 1, profile: { name, joined } })).toEqual({
      id: 1,
      profile: { name, joined: new Date(joined) },
    });
    expect(() =>
      schema.parse({ id: 1, profile: { name: { ...name, first: 42 }, joined } }),
    ).toThrow(TypeError);
  });
});
