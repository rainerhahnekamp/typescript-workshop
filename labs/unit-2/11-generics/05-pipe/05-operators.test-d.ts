import { describe, expectTypeOf, test } from "vitest";
import { map, tap } from "./05-operators";

describe("operators", () => {
  test("tap preserves its input type even when the effect returns a value", () => {
    const observe = tap((value: number) => String(value));
    expectTypeOf(observe).toEqualTypeOf<(value: number) => number>();
    // @ts-expect-error The observer accepts numbers only.
    observe("42");

    const length = map((value: string) => value.length);
    expectTypeOf(length).toEqualTypeOf<(value: string) => number>();
    // @ts-expect-error The mapper accepts strings only.
    length(42);
  });
});
