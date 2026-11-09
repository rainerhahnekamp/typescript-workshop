import { describe, expectTypeOf, test } from "vitest";
import { type Asyncify, type ReadCharge, type LoadCharge } from "./05-async-function-type";

describe("async function type", () => {
  test("turns a synchronous function type into an async signature with the same parameters", () => {
    type AsyncReadCharge = Asyncify<ReadCharge>;
    expectTypeOf<AsyncReadCharge>().toEqualTypeOf<
      (vin: string, fallback?: number) => Promise<number>
    >();

    const readCharge: AsyncReadCharge = async (vin, fallback = 0) => fallback;
    expectTypeOf(readCharge("JT-1")).toEqualTypeOf<Promise<number>>();
    readCharge("JT-1", 80);
    // @ts-expect-error The VIN argument remains required.
    readCharge();
    // @ts-expect-error Optional arguments retain their types.
    readCharge("JT-1", "80");
    // @ts-expect-error The resulting signature requires a Promise return value.
    const synchronous: AsyncReadCharge = (vin, fallback = 0) => fallback;
  });

  test("does not add another Promise layer to an already-async function", () => {
    expectTypeOf<Asyncify<LoadCharge>>().toEqualTypeOf<
      (vin: string, fallback?: number) => Promise<number>
    >();
    expectTypeOf<Asyncify<LoadCharge>>().toEqualTypeOf<Asyncify<ReadCharge>>();
  });

  test("preserves unrelated arguments, rest parameters and object results", () => {
    type ScheduleInspection = (
      at: Date,
      ...vins: string[]
    ) => { bookingId: number; vehicles: string[] };

    expectTypeOf<Asyncify<ScheduleInspection>>().toEqualTypeOf<
      (at: Date, ...vins: string[]) => Promise<{
        bookingId: number;
        vehicles: string[];
      }>
    >();
  });

  test("recursively unwraps Promise types and handles mixed plain and promised results", () => {
    type Nested = (vin: string) => Promise<Promise<number>>;
    type Mixed = () => number | Promise<string>;
    expectTypeOf<Asyncify<Nested>>().toEqualTypeOf<
      (vin: string) => Promise<number>
    >();
    expectTypeOf<Asyncify<Mixed>>().toEqualTypeOf<() => Promise<number | string>>();

    // @ts-expect-error Asyncify requires a function type.
    type Invalid = Asyncify<number>;
  });
});
