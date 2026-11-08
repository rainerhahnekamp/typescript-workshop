import { expectTypeOf, test } from "vitest";
import {
  createSignal,
  type Signal,
  type WritableSignal,
} from "./02-branded-signal";

test("Unit 1 signals carry numbers throughout the API", () => {
  const counter = createSignal(0);
  expectTypeOf(counter).toEqualTypeOf<WritableSignal>();
  expectTypeOf(counter()).toEqualTypeOf<number>();
  counter.update((current) => {
    expectTypeOf(current).toEqualTypeOf<number>();
    return current + 1;
  });

  // @ts-expect-error Other value types are introduced in Unit 2.
  createSignal("ready");
  // @ts-expect-error A number Signal cannot accept a string.
  counter.set("one");
  // @ts-expect-error The updater must also return a number.
  counter.update(() => "one");
  // @ts-expect-error An ordinary callable has no private runtime brand.
  const lookalike: Signal = () => 0;
});
