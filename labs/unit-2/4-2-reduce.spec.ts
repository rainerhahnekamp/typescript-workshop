import { reduce } from "./4-2-reduce";
import { describe, test, expect } from "@jest/globals";

describe("reduce", () => {
  test("number-specific reduce", () => {
    const numbers = [1, 2, 3, 4, 5];
    const sum = reduce(numbers, (n1, n2) => n1 + n2, 0);
    expect(sum).toBe(15);
  });

  test("generic reduce", () => {
    const numbers = [1, 2, 3, 4, 5];
    const chars = "Angular".split("");

    expect(reduce(numbers, (n1, n2) => n1 * n2, 1)).toBe(120);
    expect(reduce(chars, (c1, c2) => c1 + c2, "")).toBe("Angular");
  });

  test("generic reduce with two types and accumulator", () => {
    const belgrad = { name: "Beograd", population: 1.3 };
    const berlin = { name: "Berlin", population: 3.7 };
    const rome = { name: "Roma", population: 2.9 };
    const vienna = { name: "Wien", population: 2.0 };

    const totalPopulation = reduce(
      [belgrad, berlin, rome, vienna],
      (total, city2) => total + city2.population,
      0
    );

    expect(totalPopulation).toBe(9.9);
  });
});
