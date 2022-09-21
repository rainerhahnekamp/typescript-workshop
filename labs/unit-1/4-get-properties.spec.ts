import { describe, expect, it } from "@jest/globals";
import { getProperties } from "./4-get-properties";

const franz = {
  id: 1,
  firstname: "Franz",
  lastname: "Huber",
  birthdate: new Date(1978, 2, 10),
  isActive: true,
};

describe("getProperties", () => {
  it("should get values from an object as a string", () =>
    expect(getProperties(franz)).toEqual([
      ["id", "1"],
      ["firstname", "Franz"],
      ["lastname", "Huber"],
      ["birthdate", new Date(1978, 2, 10).toString()],
      ["isActive", "true"],
    ]));

  it("should get only properties of type string", () =>
    expect(getProperties(franz, "string")).toEqual([
      ["firstname", "Franz"],
      ["lastname", "Huber"],
    ]));

  it("should get only properties of type string and number", () =>
    expect(getProperties(franz, ["string", "number"])).toEqual([
      ["id", "1"],
      ["firstname", "Franz"],
      ["lastname", "Huber"],
    ]));

  it("should get propertie with of primitive type", () =>
    expect(getProperties(franz, [], true)).toEqual([
      ["id", "1"],
      ["firstname", "Franz"],
      ["lastname", "Huber"],
      ["isActive", "true"],
    ]));
});
