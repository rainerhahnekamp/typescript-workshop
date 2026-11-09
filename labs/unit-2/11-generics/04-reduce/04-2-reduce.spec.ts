import { describe, expect, test } from "vitest";
import { reduce } from "./04-reduce";

describe("reduce with initial value", () => {
  test("uses a numeric initial value with numeric items", () => {
    expect(reduce([1, 2, 3, 4, 5], (total, n) => total + n, 10)).toBe(25);
    expect(reduce([1, 2, 3, 4, 5], (total, n) => total * n, 2)).toBe(240);
  });

  test("uses a string initial value with string items", () => {
    expect(
      reduce("React".split(""), (text, char) => text + char, "Hello "),
    ).toBe("Hello React");
  });

  test("returns the initial value for an empty array", () => {
    const values: number[] = [];
    expect(reduce(values, (total) => total, 10)).toBe(10);
  });
});
