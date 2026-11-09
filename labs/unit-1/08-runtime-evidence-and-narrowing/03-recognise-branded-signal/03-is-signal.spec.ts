import { describe, expect, expectTypeOf, it } from "vitest";
import {
  createSignal,
  isSignal,
  type WritableSignal,
} from "./03-is-signal";

describe("the isSignal type predicate", () => {
  it("recognises values created by the factory", () => {
    const value: unknown = createSignal(42);

    expect(isSignal(value)).toBe(true);
    if (isSignal(value)) {
      expectTypeOf(value()).toEqualTypeOf<number>();
      expect(value()).toBe(42);
    }
  });

  it("rejects an ordinary structural lookalike", () => {
    const lookalike = Object.assign(() => 0, {
      set(_value: number) {},
      update(_updater: (current: number) => number) {},
    });

    expect(isSignal(lookalike)).toBe(false);

    if (false) {
      // @ts-expect-error The hidden unique-symbol property is missing.
      const forged: WritableSignal = lookalike;
      void forged;
    }
  });
});
