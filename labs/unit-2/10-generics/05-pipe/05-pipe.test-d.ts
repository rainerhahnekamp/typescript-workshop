import { expectTypeOf, test } from "vitest";
import { pipe } from "./05-pipe";

test("preserves the final result type for predefined operators", () => {
  const length = (text: string) => text.length;
  const positive = (value: number) => value > 0;
  const label = (value: boolean) => value ? "yes" : "no";
  const upper = (text: string) => text.toUpperCase();

  expectTypeOf(pipe("Tokyo", length)).toEqualTypeOf<number>();
  expectTypeOf(pipe("Tokyo", length, positive)).toEqualTypeOf<boolean>();
  expectTypeOf(pipe("Tokyo", length, positive, label)).toEqualTypeOf<string>();
  expectTypeOf(pipe("Tokyo", length, positive, label, upper)).toEqualTypeOf<string>();

  // @ts-expect-error The first operator needs a string, even with one operator.
  pipe(42, length);
  // @ts-expect-error length returns a number; upper needs a string.
  pipe("Tokyo", length, upper);
  // @ts-expect-error positive returns a boolean; length needs a string.
  pipe("Tokyo", length, positive, length);

  // @ts-expect-error The first operator needs a string.
  pipe(42, length, positive, label, upper);
  // @ts-expect-error length returns a number; upper needs a string.
  pipe("Tokyo", length, upper, length, positive);
  // @ts-expect-error positive returns a boolean; length needs a string.
  pipe("Tokyo", length, positive, length, positive);
  // @ts-expect-error label returns a string; positive needs a number.
  pipe("Tokyo", length, positive, label, positive);
  // @ts-expect-error At least one operator is required.
  pipe("Tokyo");
  // @ts-expect-error At most four operators are supported.
  pipe("Tokyo", length, positive, label, upper, length);
});

