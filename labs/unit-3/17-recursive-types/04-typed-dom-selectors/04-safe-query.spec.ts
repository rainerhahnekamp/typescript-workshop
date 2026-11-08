import { describe, expect, expectTypeOf, it } from "vitest";
import { safeQuery } from "./04-safe-query";

describe("safeQuery", () => {
  const emptyRoot = { querySelector: () => null };

  it("passes the selector to the query root and keeps a missing match as null", () => {
    const root = {
      querySelector(selector: string) {
        expect(selector).toBe('a[href="/docs"]');
        return null;
      },
    };

    expect(safeQuery('a[href="/docs"]', root)).toBeNull();
  });

  it("infers the element type for supported selectors", () => {
    expectTypeOf(
      safeQuery("input", emptyRoot),
    ).toEqualTypeOf<HTMLInputElement | null>();
    expectTypeOf(
      safeQuery("form input", emptyRoot),
    ).toEqualTypeOf<HTMLInputElement | null>();
    expectTypeOf(
      safeQuery("div.form div.button button", emptyRoot),
    ).toEqualTypeOf<HTMLButtonElement | null>();
    expectTypeOf(
      safeQuery("#container button", emptyRoot),
    ).toEqualTypeOf<HTMLButtonElement | null>();
    expectTypeOf(
      safeQuery("a.active", emptyRoot),
    ).toEqualTypeOf<HTMLAnchorElement | null>();
    expectTypeOf(
      safeQuery("a[href]", emptyRoot),
    ).toEqualTypeOf<HTMLAnchorElement | null>();
    expectTypeOf(
      safeQuery('a[href="/docs"]', emptyRoot),
    ).toEqualTypeOf<HTMLAnchorElement | null>();
  });

  it("falls back to Element for unsupported and dynamic selectors", () => {
    const dynamic: string = "input";
    expectTypeOf(
      safeQuery("div > p", emptyRoot),
    ).toEqualTypeOf<Element | null>();
    expectTypeOf(
      safeQuery("a.active, button", emptyRoot),
    ).toEqualTypeOf<Element | null>();
    expectTypeOf(
      safeQuery('a[title="some button.active"]', emptyRoot),
    ).toEqualTypeOf<Element | null>();
    expectTypeOf(safeQuery(dynamic, emptyRoot)).toEqualTypeOf<Element | null>();
  });

  it("rejects assigning a button result to an input type", () => {
    if (false) {
      // @ts-expect-error: the selector targets a button
      const input: HTMLInputElement | null = safeQuery("button", emptyRoot);
    }
  });
});
