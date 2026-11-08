import { describe, expectTypeOf, it } from "vitest";
import type { DateProps } from "./04-date-props";

describe("DateProps", () => {
  it("converts properties ending with date or Date to type Date", () => {
    expectTypeOf<
      DateProps<{
        id: number;
        birthdate: string;
        baptismdate: number;
        schoolEntryDate: boolean;
      }>
    >().toEqualTypeOf<{
      id: number;
      birthdate: Date;
      baptismdate: Date;
      schoolEntryDate: Date;
    }>();
  });
});
