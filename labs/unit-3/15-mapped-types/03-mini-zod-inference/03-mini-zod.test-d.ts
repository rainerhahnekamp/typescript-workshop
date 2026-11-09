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
});
