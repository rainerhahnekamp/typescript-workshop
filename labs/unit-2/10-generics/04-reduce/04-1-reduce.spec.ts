import { describe, expect, test } from "vitest";
import { reduce } from "./04-reduce";

describe("reducer with one single type", () => {
  test("reduces numbers without an initial value", () => {
    expect(reduce([1, 2, 3, 4, 5], (total, n) => total + n)).toBe(15);
    expect(reduce([1, 2, 3, 4, 5], (total, n) => total * n)).toBe(120);
  });

  test("reduces strings without an initial value", () => {
    expect(reduce("Angular".split(""), (text, char) => text + char)).toBe(
      "Angular",
    );
  });
});
