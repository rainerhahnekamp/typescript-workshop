import { describe, expectTypeOf, it } from "vitest";
import type { AreEqual, Expect, Not } from "./04-type-test-helpers";

describe("Expect", () => {
  it("accepts true and returns it", () => {
    expectTypeOf<Expect<true>>().toEqualTypeOf<true>();
  });

  it("requires a result known to be true", () => {
    // @ts-expect-error false does not satisfy the constraint.
    type RejectFalse = Expect<false>;
    // @ts-expect-error boolean might be false.
    type RejectBoolean = Expect<boolean>;
    // @ts-expect-error the constraint requires true.
    type RejectNumber = Expect<1>;
  });
});

describe("AreEqual", () => {
  it("compares literals and primitive types", () => {
    expectTypeOf<AreEqual<1, 1>>().toEqualTypeOf<true>();
    expectTypeOf<AreEqual<5, 1>>().toEqualTypeOf<false>();
    expectTypeOf<AreEqual<number, string>>().toEqualTypeOf<false>();
    expectTypeOf<AreEqual<"hi", string>>().toEqualTypeOf<false>();
  });

  it("compares plain object shapes in both directions", () => {
    expectTypeOf<AreEqual<{ id: number }, { id: number }>>().toEqualTypeOf<true>();
    expectTypeOf<AreEqual<{ id: number }, { id: string }>>().toEqualTypeOf<false>();
    expectTypeOf<AreEqual<{ id: number }, { id: number; tag: string }>>().toEqualTypeOf<false>();
    expectTypeOf<AreEqual<{ id: number; tag: string }, { id: number }>>().toEqualTypeOf<false>();
  });
});

describe("Not", () => {
  it("flips boolean literals", () => {
    expectTypeOf<Not<true>>().toEqualTypeOf<false>();
    expectTypeOf<Not<false>>().toEqualTypeOf<true>();
  });

  it("requires a boolean type", () => {
    // @ts-expect-error Not requires a boolean type.
    type RejectNonBoolean = Not<string>;
  });
});
