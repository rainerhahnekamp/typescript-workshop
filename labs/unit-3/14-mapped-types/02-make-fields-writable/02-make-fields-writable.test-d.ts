import { describe, expectTypeOf, it } from "vitest";
import type { Writable } from "./02-make-fields-writable";

describe("Writable", () => {
  it("removes readonly while preserving field types and optionality", () => {
    expectTypeOf<Writable<{ readonly vin: string; readonly note?: string }>>().toEqualTypeOf<
      { vin: string; note?: string }
    >();
  });
});
