import { describe, expect, it } from "vitest";
import { mapDateProperties } from "./04-date-props";

describe("DateProps", () => {
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
