import { describe, expect, it } from "vitest";
import { parseVehicle, parseVehicles } from "./05-mini-zod-composition";

const input = {
  vin: "JT-42",
  producedAt: "2024-04-19T00:00:00.000Z",
  inspections: [false],
};

describe("Mini-Zod schema validation", () => {
  it("parses unknown input into a vehicle and converts the date", () => {
    const payload: unknown = input;
    const expected = { ...input, producedAt: new Date(input.producedAt) };

    expect(parseVehicle(payload)).toEqual(expected);
    expect(parseVehicles([payload])).toEqual([expected]);
    expect(typeof input.producedAt).toBe("string");
  });

  it("rejects invalid array items in a single vehicle or a list", () => {
    const invalid = { ...input, inspections: ["yes"] };

    expect(() => parseVehicle(invalid)).toThrow(TypeError);
    expect(() => parseVehicles([input, invalid])).toThrow(TypeError);
  });
});
