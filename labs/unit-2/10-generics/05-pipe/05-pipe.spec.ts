import { expect, expectTypeOf, it } from "vitest";
import { pipe } from "./05-pipe";

it("infers callback inputs and results for one, two and three operators", () => {
  expect(
    pipe("Tokyo", (text) => {
      expectTypeOf(text).toEqualTypeOf<string>();
      return text.length;
    }),
  ).toBe(5);

  const two = pipe(
    "Tokyo",
    (text) => text.length,
    (length) => {
      expectTypeOf(length).toEqualTypeOf<number>();
      return length > 4;
    },
  );
  expect(two).toBe(true);
  expectTypeOf(two).toEqualTypeOf<boolean>();

  const events: string[] = [];
  const three = pipe(
    "Tokyo",
    (text) => {
      events.push("length");
      return text.length;
    },
    (length) => {
      events.push("classify");
      return length > 4;
    },
    (large) => {
      expectTypeOf(large).toEqualTypeOf<boolean>();
      events.push("wrap");
      return { large };
    },
  );
  expect(three).toEqual({ large: true });
  expectTypeOf(three).toEqualTypeOf<{ large: boolean }>();
  expect(events).toEqual(["length", "classify", "wrap"]);
});

it("infers callback inputs and runs four operators from left to right", () => {
  const events: string[] = [];
  const result = pipe(
    "Tokyo",
    (text) => {
      expectTypeOf(text).toEqualTypeOf<string>();
      events.push(`length:${text}`);
      return text.length;
    },
    (length) => {
      expectTypeOf(length).toEqualTypeOf<number>();
      events.push(`classify:${length}`);
      return length > 4;
    },
    (large) => {
      expectTypeOf(large).toEqualTypeOf<boolean>();
      events.push(`wrap:${large}`);
      return { large };
    },
    (info) => {
      expectTypeOf(info).toEqualTypeOf<{ large: boolean }>();
      events.push(`label:${info.large}`);
      return info.large ? "large" : "small";
    },
  );

  expect(result).toBe("large");
  expectTypeOf(result).toEqualTypeOf<string>();
  expect(events).toEqual([
    "length:Tokyo",
    "classify:5",
    "wrap:true",
    "label:true",
  ]);
});

it("accepts reusable predefined operators", () => {
  const length = (text: string) => text.length;
  const positive = (value: number) => value > 0;
  const wrap = (value: boolean) => ({ positive: value });
  const label = (value: { positive: boolean }) =>
    value.positive ? "yes" : "no";

  expect(pipe("Tokyo", length, positive, wrap, label)).toBe("yes");
  expect(pipe("", length, positive, wrap, label)).toBe("no");
});
