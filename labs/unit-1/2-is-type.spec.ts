import { describe, expect, test } from "@jest/globals";
import { isType } from "./2-is-type";

describe("isType", () => {
  test.each([
    ["", true],
    ["foobar", true],
    [false, false],
    [1, false],
    [true, false],
    [new Date(), false],
    [[], false],
  ])("%s should be string: %s", (value, result) => {
    expect(isType(value, "string")).toBe(result);
  });

  test.each([
    ["", false],
    ["foobar", false],
    [false, false],
    [1, false],
    [true, false],
    [new Date(), true],
    [[], false],
  ])("%s should be a date: %s", (value, result) => {
    expect(isType(value, "date")).toBe(result);
  });

  test.each([
    ["", false],
    ["foobar", false],
    [false, false],
    [1, false],
    [true, false],
    [new Date(), false],
    [[], true],
  ])("%s should be an array: %s", (value, result) => {
    expect(isType(value, "array")).toBe(result);
  });

  test.each([
    ["", false],
    ["foobar", false],
    [false, false],
    [1, false],
    [true, false],
    [new Date(), false],
    [[], false],
    [{}, false],
    [undefined, false],
    [null, false],
    [[1], true], // ← please note
    [{ a: 1 }, true],
  ])(
    "%s should be a record (object literal) with entries: %s",
    (value, result) => {
      expect(isType(value, "record")).toBe(result);
    }
  );
});
