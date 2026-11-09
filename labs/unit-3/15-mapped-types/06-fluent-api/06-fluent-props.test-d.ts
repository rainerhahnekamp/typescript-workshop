import { describe, expectTypeOf, it } from "vitest";
import type { FluentProps } from "./06-fluent-props";

type Person = {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: Date;
};

describe("FluentProps", () => {
  it("converts an object's properties to fluent setters", () => {
    expectTypeOf<FluentProps<Person>>().toEqualTypeOf<{
      id: (value: number) => FluentProps<Person>;
      firstname: (value: string) => FluentProps<Person>;
      lastname: (value: string) => FluentProps<Person>;
      birthdate: (value: Date) => FluentProps<Person>;
    }>();
  });
});
