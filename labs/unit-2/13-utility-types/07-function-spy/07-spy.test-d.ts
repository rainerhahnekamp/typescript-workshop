import { describe, expectTypeOf, it } from "vitest";
import type { Spy } from "./07-spy";

describe("spy answer type", () => {
  it("takes a number as the answer for a function that returns a number", () => {
    type ReadMileage = (vin: string) => number;

    expectTypeOf<Spy<ReadMileage>>().toEqualTypeOf<{
      answer: (value: number) => void;
    }>();
  });

  it("preserves a union of possible answers", () => {
    type ReadStatus = (vin: string) => "ready" | "delayed" | undefined;

    expectTypeOf<Spy<ReadStatus>>().toEqualTypeOf<{
      answer: (value: "ready" | "delayed" | undefined) => void;
    }>();
  });
});
