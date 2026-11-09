import { describe, expect, expectTypeOf, it } from "vitest";
import { pipe } from "./05-pipe";
import { map, tap } from "./05-operators";

describe("pipe operators", () => {
  it("infers each callback and runs three operators from left to right", () => {
    const events: string[] = [];

    const result = pipe(
      "Tokyo",
      map((text) => {
        expectTypeOf(text).toEqualTypeOf<string>();
        events.push(`length:${text}`);
        return text.length;
      }),
      tap((length) => {
        expectTypeOf(length).toEqualTypeOf<number>();
        events.push(`tap:${length}`);
        return "This return value must be ignored";
      }),
      map((length) => {
        expectTypeOf(length).toEqualTypeOf<number>();
        events.push(`classify:${length}`);
        return length > 4 ? "large" : "small";
      }),
    );

    expect(result).toBe("large");
    expectTypeOf(result).toEqualTypeOf<string>();
    expect(events).toEqual(["length:Tokyo", "tap:5", "classify:5"]);
  });

  it("creates a reusable map operator and defers its callback until application", () => {
    const seen: string[] = [];
    const length = map((text: string) => {
      seen.push(text);
      return text.length;
    });

    expect(seen).toEqual([]);
    expect(length("Tokyo")).toBe(5);
    expect(length("Rome")).toBe(4);
    expect(seen).toEqual(["Tokyo", "Rome"]);
    expectTypeOf(length).toEqualTypeOf<(value: string) => number>();
  });

  it("creates a deferred tap that preserves object identity and ignores callback results", () => {
    const seen: Array<{ vin: string }> = [];
    const observe = tap((vehicle: { vin: string }) => {
      seen.push(vehicle);
      return { replacement: true };
    });
    const vehicle = { vin: "JT-42" };

    expect(seen).toEqual([]);
    expect(observe(vehicle)).toBe(vehicle);
    expect(seen).toEqual([vehicle]);
    expectTypeOf(observe).toEqualTypeOf<
      (value: { vin: string }) => { vin: string }
    >();
  });

  it("preserves false, zero and undefined through tap", () => {
    const seen: unknown[] = [];
    const observe = tap((value: unknown) => seen.push(value));

    expect(observe(false)).toBe(false);
    expect(observe(0)).toBe(0);
    expect(observe(undefined)).toBeUndefined();
    expect(seen).toEqual([false, 0, undefined]);
  });
});
