import { describe, expect, test } from "vitest";
import { reduce } from "./04-reduce";

const cities = [
  { name: "Beograd", population: 1.3 },
  { name: "Berlin", population: 3.7 },
  { name: "Roma", population: 2.9 },
  { name: "Wien", population: 2.0 },
];

describe("reduce with initial value and different output", () => {
  test("reduces objects to a numeric accumulator", () => {
    expect(reduce(cities, (total, city) => total + city.population, 0)).toBe(
      9.9,
    );
  });

  test("reduces objects to a string accumulator", () => {
    expect(reduce(cities, (names, city) => names + city.name + ";", "")).toBe(
      "Beograd;Berlin;Roma;Wien;",
    );
  });

  test("the same function retains both earlier call forms", () => {
    expect(reduce([1, 2], (total, n) => total + n)).toBe(3);
    expect(reduce([1, 2], (total, n) => total + n, 10)).toBe(13);
  });

  test("an empty array without an initial value throws", () => {
    expect(() => reduce<number>([], (total, n) => total + n)).toThrow(
      TypeError,
    );
  });

  test("an explicit undefined initial value starts with the first item", () => {
    const accumulators: (number | undefined)[] = [];
    const result = reduce<number, number | undefined>(
      [1, 2],
      (total, n) => {
        accumulators.push(total);
        return (total ?? 10) + n;
      },
      undefined,
    );

    expect(result).toBe(13);
    expect(accumulators).toEqual([undefined, 11]);
  });

  test("an explicit undefined initial value is returned for an empty array", () => {
    let callbackCalled = false;
    const result = reduce<number, undefined>(
      [],
      () => {
        callbackCalled = true;
        return undefined;
      },
      undefined,
    );

    expect(result).toBeUndefined();
    expect(callbackCalled).toBe(false);
  });
});
