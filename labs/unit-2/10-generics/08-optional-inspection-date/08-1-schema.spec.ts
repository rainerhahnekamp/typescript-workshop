import { describe, expectTypeOf, it } from "vitest";
import type { Schema } from "./08-optional-schema";

describe("Step 1: make Schema generic", () => {
  it("preserves the chosen output type while accepting unknown input", () => {
    expectTypeOf<Schema<string>["parse"]>().returns.toBeString();
    expectTypeOf<Schema<number>["parse"]>().returns.toBeNumber();
    expectTypeOf<Schema<boolean>["parse"]>().returns.toBeBoolean();
    expectTypeOf<Schema<Date>["parse"]>().returns.toEqualTypeOf<Date>();
    expectTypeOf<Schema<string>["parse"]>().parameter(0).toBeUnknown();
  });

  it("defaults the output to unknown when no type argument is given", () => {
    expectTypeOf<Schema>().toEqualTypeOf<Schema<unknown>>();
    expectTypeOf<Schema["parse"]>().returns.toBeUnknown();
  });
});
