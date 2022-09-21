import { describe, it, test } from "@jest/globals";
import { Assert, IsType } from "../../util/test-types";
import { PartialOptional, PartialReadOnly } from "./2-mapped-utility-types";

type Person = {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: Date;
};

describe("utility types via mapped types", () => {
  it("should test PartialReadOnly", () => {
    type T0 = Assert<
      IsType<
        PartialReadOnly<Person, "id" | "firstname">,
        {
          readonly id: number;
          readonly firstname: string;
          lastname: string;
          birthdate: Date;
        }
      >
    >;

    type T1 = Assert<
      IsType<
        PartialReadOnly<Person, "lastname">,
        {
          id: number;
          firstname: string;
          readonly lastname: string;
          birthdate: Date;
        }
      >
    >;

    // @ts-expect-error
    type T2 = PartialReadOnly<Person, "dummy">;
  });

  it("should test PartialOptional", () => {
    type T0 = Assert<
      IsType<
        PartialOptional<Person, "id" | "firstname">,
        {
          id?: number;
          firstname?: string;
          lastname: string;
          birthdate: Date;
        }
      >
    >;

    type T1 = Assert<
      IsType<
        PartialOptional<Person, "lastname">,
        {
          id: number;
          firstname: string;
          lastname?: string;
          birthdate: Date;
        }
      >
    >;

    // @ts-expect-error
    type T2 = PartialOptional<Person, "dummy">;
  });
});
