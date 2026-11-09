import { describe, expectTypeOf, test } from "vitest";
import { reduce } from "./04-reduce";

const cities = [{ name: "Wien", population: 2.0 }];

describe("reduce", () => {
  test("infers the item type without an initial value", () => {
    expectTypeOf(reduce([1, 2], (total, n) => total + n)).toEqualTypeOf<number>();
    expectTypeOf(reduce(["A", "B"], (text, char) => text + char)).toEqualTypeOf<string>();
  });

  test("preserves the same type when an initial value is supplied", () => {
    expectTypeOf(reduce([1, 2], (total, n) => total + n, 0)).toEqualTypeOf<number>();
    expectTypeOf(reduce(["A", "B"], (text, char) => text + char, "")).toEqualTypeOf<string>();
  });

  test("infers a different accumulator type from the initial value", () => {
    const population = reduce(cities, (total, city) => {
      expectTypeOf(total).toEqualTypeOf<number>();
      expectTypeOf(city).toEqualTypeOf<{ name: string; population: number }>();
      return total + city.population;
    }, 0);
    expectTypeOf(population).toEqualTypeOf<number>();
    expectTypeOf(reduce(cities, (names, city) => names + city.name, "")).toEqualTypeOf<string>();
  });

  test("the callback must return the accumulator type", () => {
    // @ts-expect-error A different accumulator type needs an initial value.
    reduce([1, 2], () => "wrong");
    // @ts-expect-error A numeric initial value requires a numeric accumulator result.
    reduce(cities, () => true, 0);
  });
});
