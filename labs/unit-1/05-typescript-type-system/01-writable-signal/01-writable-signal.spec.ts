import { beforeEach, expect, expectTypeOf, it } from "vitest";
import { counter, type WritableSignal } from "./01-writable-signal";

beforeEach(() => counter.set(0));

it("is callable and returns its current number", () => {
  expect(counter()).toBe(0);
  expectTypeOf(counter()).toEqualTypeOf<number>();
  expectTypeOf(counter).toEqualTypeOf<WritableSignal>();
});

it("replaces the value through set", () => {
  counter.set(10);

  expect(counter()).toBe(10);
  expectTypeOf(counter.set).returns.toEqualTypeOf<void>();
});

it("passes the current value to update", () => {
  counter.set(10);
  counter.update(current => {
    expectTypeOf(current).toEqualTypeOf<number>();
    return current + 1;
  });

  expect(counter()).toBe(11);
});

function checkRejectedCalls() {
  // @ts-expect-error A Signal stores numbers.
  counter.set("ten");
  // @ts-expect-error The updater must return a number.
  counter.update(() => "eleven");
  // @ts-expect-error Reading a Signal takes no arguments.
  counter(10);
}
