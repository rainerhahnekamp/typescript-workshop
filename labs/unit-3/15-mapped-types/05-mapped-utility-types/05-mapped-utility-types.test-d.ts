import { describe, expectTypeOf, it } from "vitest";
import type { PartialOptional, PartialReadOnly } from "./05-mapped-utility-types";

type Person = {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: Date;
};

describe("utility types via mapped types", () => {
  it("should test PartialReadOnly", () => {
    expectTypeOf<PartialReadOnly<Person, "id" | "firstname">>().toEqualTypeOf<{
      readonly id: number;
      readonly firstname: string;
      lastname: string;
      birthdate: Date;
    }>();

    expectTypeOf<PartialReadOnly<Person, "lastname">>().toEqualTypeOf<{
      id: number;
      firstname: string;
      readonly lastname: string;
      birthdate: Date;
    }>();

    // @ts-expect-error The selected key must exist on Person.
    type InvalidKey = PartialReadOnly<Person, "dummy">;
  });

  it("should test PartialOptional", () => {
    expectTypeOf<PartialOptional<Person, "id" | "firstname">>().toEqualTypeOf<{
      id?: number;
      firstname?: string;
      lastname: string;
      birthdate: Date;
    }>();

    expectTypeOf<PartialOptional<Person, "lastname">>().toEqualTypeOf<{
      id: number;
      firstname: string;
      lastname?: string;
      birthdate: Date;
    }>();

    // @ts-expect-error The selected key must exist on Person.
    type InvalidKey = PartialOptional<Person, "dummy">;
  });
});
