import { describe, expectTypeOf, it } from "vitest";
import { z } from "./03-mini-zod";

describe("mini zod", () => {
  it("infers the parsed person from the field schemas", () => {
    const personSchema = z.object({
      id: z.number(),
      first: z.string(),
      last: z.string(),
    });

    expectTypeOf(personSchema.parse).toEqualTypeOf<
      (value: unknown) => { id: number; first: string; last: string }
    >();
  });

  it("infers nested object schemas through z.object composition", () => {
    const personSchema = z.object({
      id: z.number(),
      profile: z.object({
        name: z.object({ first: z.string(), last: z.string() }),
        joined: z.date(),
      }),
    });

    expectTypeOf(personSchema.parse).toEqualTypeOf<
      (value: unknown) => {
        id: number;
        profile: {
          name: { first: string; last: string };
          joined: Date;
        };
      }
    >();
  });
});
