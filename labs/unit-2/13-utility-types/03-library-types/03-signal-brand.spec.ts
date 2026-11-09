import { describe, expect, expectTypeOf, it, vi } from "vitest";
import * as signalLibrary from "../../../unit-1/08-runtime-evidence-and-narrowing/03-recognise-branded-signal/03-is-signal";
import type { Signal } from "../../../unit-1/08-runtime-evidence-and-narrowing/03-recognise-branded-signal/03-is-signal";
import { createCounterfeitSignal } from "./03-signal-brand";

describe("signal brand", () => {
  it.each([
    { initial: 42, value: 999 },
    { initial: 7, value: 0 },
    { initial: 0, value: -5 },
  ])(
    "accepts a participant-created counterfeit returning $value",
    ({ initial, value }) => {
      const source = signalLibrary.createSignal(initial);
      const factory = vi.spyOn(signalLibrary, "createSignal");
      try {
        const counterfeit = createCounterfeitSignal(source, value);
        expect(factory).not.toHaveBeenCalled();
        expect(counterfeit).not.toBe(source);
        expectTypeOf(counterfeit).toExtend<Signal>();

        const candidate: unknown = counterfeit;
        expect(signalLibrary.isSignal(candidate)).toBe(true);
        if (signalLibrary.isSignal(candidate)) {
          expectTypeOf(candidate).toEqualTypeOf<Signal>();
          expect(candidate()).toBe(value);
          expect(source()).toBe(initial);
          source.set(initial + 1);
          expect(source()).toBe(initial + 1);
          expect(candidate()).toBe(value);
        } else {
          expect.fail(
            "The counterfeit must pass the existing isSignal predicate",
          );
        }
      } finally {
        factory.mockRestore();
      }
    },
  );
});
