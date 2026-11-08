import { describe, expect, expectTypeOf, it } from "vitest";
import {
  createSignal,
  type WritableSignal,
} from "./02-branded-signal";

describe("a factory-owned branded signal", () => {
  it("is callable and owns its update behaviour", () => {
    const counter = createSignal(0);

    expect(counter()).toBe(0);
    counter.set(2);
    counter.update((current) => current + 1);

    expect(counter()).toBe(3);
    expectTypeOf(counter).toEqualTypeOf<WritableSignal>();
    expectTypeOf(counter()).toEqualTypeOf<number>();
    counter.update((current) => {
      expectTypeOf(current).toEqualTypeOf<number>();
      return current + 1;
    });
  });

});
