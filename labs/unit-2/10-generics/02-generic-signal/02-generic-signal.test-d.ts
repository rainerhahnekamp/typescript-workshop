import { expectTypeOf, test } from "vitest";
import { createSignal, type Signal, type WritableSignal } from "./02-generic-signal";

test("the initial value determines reads, writes and updater callbacks", () => {
  const counter = createSignal(0);
  const label = createSignal("Toyota");
  const enabled = createSignal(false);
  const car = createSignal({ vin: "JT-1" });

  expectTypeOf(counter).toEqualTypeOf<WritableSignal<number>>();
  expectTypeOf(label).toEqualTypeOf<WritableSignal<string>>();
  expectTypeOf(enabled).toEqualTypeOf<WritableSignal<boolean>>();
  expectTypeOf(car).toEqualTypeOf<WritableSignal<{ vin: string }>>();
  expectTypeOf(counter()).toEqualTypeOf<number>();
  expectTypeOf(label()).toEqualTypeOf<string>();
  expectTypeOf(enabled()).toEqualTypeOf<boolean>();
  expectTypeOf(car()).toEqualTypeOf<{ vin: string }>();

  counter.update((current) => {
    expectTypeOf(current).toEqualTypeOf<number>();
    return current + 1;
  });
  label.update((current) => {
    expectTypeOf(current).toEqualTypeOf<string>();
    return current.toUpperCase();
  });
  car.set({ vin: "JT-2" });

  // @ts-expect-error A number Signal cannot accept a string.
  counter.set("one");
  // @ts-expect-error The updater must return the Signal's value type.
  label.update(() => 42);
  // @ts-expect-error The inferred object shape must be preserved.
  car.set({ vin: 42 });
});

test("a caller can explicitly choose a union and the brand stays required", () => {
  const selected = createSignal<{ vin: string } | null>(null);
  selected.set({ vin: "JT-1" });
  selected.set(null);
  expectTypeOf(selected()).toEqualTypeOf<{ vin: string } | null>();

  // @ts-expect-error Generalizing the Signal must not remove its hidden brand.
  const lookalike: Signal<number> = () => 1;
});

