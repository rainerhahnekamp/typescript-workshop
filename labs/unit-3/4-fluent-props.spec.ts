import { describe, it, expect } from "@jest/globals";
import { Assert, IsType } from "../../util/test-types";
import { FluentProps } from "./4-fluent-props";

type Person = {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: Date;
};

describe("FluentProps", () => {
  it("should convert an object's properties to fluent setters", () => {
    type T0 = Assert<
      IsType<
        FluentProps<Person>,
        {
          id: (value: number) => FluentProps<Person>;
          firstname: (value: string) => FluentProps<Person>;
          lastname: (value: string) => FluentProps<Person>;
          birthdate: (value: Date) => FluentProps<Person>;
        }
      >
    >;
  });
});
