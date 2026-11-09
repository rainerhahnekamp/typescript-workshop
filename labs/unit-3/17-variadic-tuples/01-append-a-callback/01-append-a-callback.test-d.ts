import { describe, expectTypeOf, it } from "vitest";
import type { WithCallback } from "./01-append-a-callback";

describe("WithCallback", () => {
  it("appends a callback after the original parameters", () => {
    expectTypeOf<WithCallback<[string, boolean]>>().toEqualTypeOf<
      [string, boolean, () => void]
    >();
  });

  it("appends a callback to an empty tuple", () => {
    expectTypeOf<WithCallback<[]>>().toEqualTypeOf<[() => void]>();
  });
});
