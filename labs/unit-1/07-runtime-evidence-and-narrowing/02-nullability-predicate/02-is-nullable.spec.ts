import { describe, expect, it } from "vitest";
import { isNullable } from "./02-is-nullable";

describe("isNullable", () => {
  it.each([null, undefined])("recognises %s as nullish", (value) => {
    expect(isNullable(value)).toBe(true);
  });

  it.each(
    [0, false, "", NaN, [], {}, "null", "undefined"].map((value) => [value]),
  )("rejects non-nullish value %s", (value) => {
    expect(isNullable(value)).toBe(false);
  });

  it("should compile with number", () => {
    function foobar(value: number | undefined | null) {
      if (!isNullable(value)) {
        const n: number = value;
      }
    }
  });

  it("should compile with string", () => {
    function foobar(value: string | undefined | null) {
      if (!isNullable(value)) {
        const s: string = value;
      }
    }
  });
});
