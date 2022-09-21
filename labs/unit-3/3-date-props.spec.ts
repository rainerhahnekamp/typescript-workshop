import { describe, it, expect } from "@jest/globals";
import { Assert, IsType } from "../../util/test-types";
import { DateProps, mapDateProperties } from "./3-date-props";

describe("DateProps", () => {
  it("should convert properties ending with [Dd]ate to type Date", () => {
    type T0 = Assert<
      IsType<
        DateProps<{
          id: number;
          birthdate: string;
          baptismdate: number;
          schoolEntryDate: boolean;
        }>,
        {
          id: number;
          birthdate: Date;
          baptismdate: Date;
          schoolEntryDate: Date;
        }
      >
    >;
  });

  it("should map a real object", () => {
    const rawFranz = {
      id: 1,
      firstname: "Franz",
      lastname: "Huber",
      birthdate: "1978-02-10",
    };

    const franz = mapDateProperties(rawFranz);
    expect(franz.birthdate).toEqual(new Date(1978, 1, 10));
  });
});
