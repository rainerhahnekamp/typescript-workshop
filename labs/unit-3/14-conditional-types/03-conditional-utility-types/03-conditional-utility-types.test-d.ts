import { describe, expectTypeOf, it } from "vitest";
import type {
  FirstParameter,
  MyParameters,
  MyReturnType,
  formatReadings,
  mileage,
  readMileage,
  readPlant,
  vehicle,
} from "./03-conditional-utility-types";

describe("Conditional function utilities", () => {
  it("extracts types from a function with two parameters", () => {
    expectTypeOf<MyReturnType<typeof readMileage>>().toEqualTypeOf<Promise<number>>();
    expectTypeOf<MyParameters<typeof readMileage>>().toEqualTypeOf<
      [vin: string, includeHistory: boolean]
    >();
    expectTypeOf<FirstParameter<typeof readMileage>>().toEqualTypeOf<string>();
  });

  it("extracts types from readPlant, which has no parameters", () => {
    expectTypeOf<MyReturnType<typeof readPlant>>().toEqualTypeOf<string>();
    expectTypeOf<MyParameters<typeof readPlant>>().toEqualTypeOf<[]>();
    expectTypeOf<FirstParameter<typeof readPlant>>().toEqualTypeOf<undefined>();
  });

  it("preserves the fixed and rest parameters of formatReadings", () => {
    expectTypeOf<MyReturnType<typeof formatReadings>>().toEqualTypeOf<string>();
    expectTypeOf<MyParameters<typeof formatReadings>>().toEqualTypeOf<
      [vin: string, ...readings: number[]]
    >();
    expectTypeOf<FirstParameter<typeof formatReadings>>().toEqualTypeOf<string>();
  });

  it("returns never from all three utilities for mileage and vehicle", () => {
    expectTypeOf<MyReturnType<typeof mileage>>().toEqualTypeOf<never>();
    expectTypeOf<MyParameters<typeof mileage>>().toEqualTypeOf<never>();
    expectTypeOf<FirstParameter<typeof mileage>>().toEqualTypeOf<never>();
    expectTypeOf<MyReturnType<typeof vehicle>>().toEqualTypeOf<never>();
    expectTypeOf<MyParameters<typeof vehicle>>().toEqualTypeOf<never>();
    expectTypeOf<FirstParameter<typeof vehicle>>().toEqualTypeOf<never>();
  });

  it("also handles a single parameter and a void return type", () => {
    type Inspect = (date: Date) => void;
    expectTypeOf<MyReturnType<Inspect>>().toEqualTypeOf<void>();
    expectTypeOf<MyParameters<Inspect>>().toEqualTypeOf<[date: Date]>();
    expectTypeOf<FirstParameter<Inspect>>().toEqualTypeOf<Date>();
  });
});
