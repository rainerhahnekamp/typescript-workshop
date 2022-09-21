import { describe, it, expect } from "@jest/globals";
import { assertNotNullable, isNonNullable } from "./3-non-nullable";

describe("isNonNullable", () => {
  it.each([
    [undefined, false],
    [null, false],
    ["", true],
    [0, true],
    [false, true],
    [1, true],
    [new Date(), true],
  ])("%s is not nullable: %s", (value, result) => {
    expect(isNonNullable(value)).toBe(result);
  });

  it.each([
    [undefined, false],
    [null, false],
    ["", true],
    [0, true],
    [false, true],
    [1, true],
    [new Date(), true],
  ])("assertNotNullable for %s should throw an error: %s", (value, result) => {
    if (result === true) {
      expect(() => assertNotNullable(value)).not.toThrow();
    } else {
      expect(() => assertNotNullable(value)).toThrow(
        `value ${value} is nullable`
      );
    }
  });
});
