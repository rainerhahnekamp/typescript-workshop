import { reduce } from "./4-1-reduce";
import { describe, test, expect } from "@jest/globals";

describe("reduce", () => {
  test("number-specific reduce", () => {
    const numbers = [1, 2, 3, 4, 5];
    const sum = reduce(numbers, (n1, n2) => n1 + n2);
    expect(sum).toBe(15);
  });

  test("generic reduce", () => {
    const numbers = [1, 2, 3, 4, 5];
    const chars = "Angular".split("");

    expect(reduce(numbers, (n1, n2) => n1 * n2)).toBe(120);
    expect(reduce(chars, (c1, c2) => c1 + c2)).toBe("Angular");
  });
});
