import { describe, expect, expectTypeOf, it } from "vitest";
import { pipe } from "./05-pipe";

describe("pipe", () => {
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

  it("accepts reusable predefined operators", () => {
    const length = (text: string) => text.length;
    const positive = (value: number) => value > 0;
    const label = (value: boolean) => value ? "yes" : "no";

    expect(pipe("Tokyo", length, positive, label)).toBe("yes");
    expect(pipe("", length, positive, label)).toBe("no");
  });
});
