import { describe, expect, expectTypeOf, it } from "vitest";
import { optional, z } from "./06-mini-zod";
import type { TypeOfSchema } from "./06-mini-zod-recursive-shapes";

describe("TypeOfSchema", () => {
  it("infers primitive schema outputs", () => {
    const text = z.string();
    const number = z.number();
    const boolean = z.boolean();
    const date = z.date();

    expectTypeOf<TypeOfSchema<typeof text>>().toEqualTypeOf<string>();
    expectTypeOf<TypeOfSchema<typeof number>>().toEqualTypeOf<number>();
    expectTypeOf<TypeOfSchema<typeof boolean>>().toEqualTypeOf<boolean>();
    expectTypeOf<TypeOfSchema<typeof date>>().toEqualTypeOf<Date>();
  });

  it("infers optional and array schema outputs", () => {
    const date = optional(z.date());
    const names = z.array(z.string());

    expectTypeOf<TypeOfSchema<typeof date>>().toEqualTypeOf<Date | undefined>();
    expectTypeOf<TypeOfSchema<typeof names>>().toEqualTypeOf<string[]>();
  });

  it("infers the complete output of a nested object schema", () => {
    const schema = z.object({
      id: z.number(),
      profile: z.object({
        name: z.object({ first: z.string(), last: z.string() }),
        joined: z.date(),
      }),
    });

    type Person = TypeOfSchema<typeof schema>;
    expectTypeOf<Person>().toEqualTypeOf<{
      id: number;
      profile: {
        name: { first: string; last: string };
        joined: Date;
      };
    }>();
    expectTypeOf(schema.parse).toEqualTypeOf<(value: unknown) => Person>();

    const joined = "2024-04-19T00:00:00.000Z";
    const name = { first: "Ada", last: "Lovelace" };
    const person: Person = schema.parse({ id: 1, profile: { name, joined } });
    expect(person).toEqual({
      id: 1,
      profile: { name, joined: new Date(joined) },
    });
  });
});
