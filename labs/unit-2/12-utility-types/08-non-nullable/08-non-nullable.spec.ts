import { describe, expect, expectTypeOf, it } from "vitest";
import { assertNotNullable, isNonNullable } from "./08-non-nullable";

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

  it("narrows a filtered array without removing other falsy values", () => {
    const values: Array<string | number | boolean | null | undefined> = [
      "ready",
      "",
      0,
      false,
      null,
      undefined,
    ];

    const truthy = values.filter(Boolean);
    const present = values.filter(isNonNullable);

    expectTypeOf(truthy).toEqualTypeOf<typeof values>();
    expectTypeOf(present).toEqualTypeOf<Array<string | number | boolean>>();
    expect(truthy).toEqual(["ready"]);
    expect(present).toEqual(["ready", "", 0, false]);
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
        `value ${value} is nullable`,
      );
    }
  });
});
