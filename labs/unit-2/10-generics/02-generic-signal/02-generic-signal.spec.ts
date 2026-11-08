import { describe, expect, it } from "vitest";
import { createSignal } from "./02-generic-signal";

describe("a generic continuation of the Unit 1 Signal", () => {
  it("keeps number reads, writes and updates working", () => {
    const counter = createSignal(0);
    counter.set(2);
    counter.update((current) => current + 1);
    expect(counter()).toBe(3);
  });

  it("supports strings and booleans without separate factories", () => {
    const label = createSignal("Toyota");
    label.set("Honda");
    label.update((current) => current.toUpperCase());
    expect(label()).toBe("HONDA");

    const enabled = createSignal(false);
    enabled.update((current) => !current);
    expect(enabled()).toBe(true);
  });

  it("preserves object references and keeps separate Signals independent", () => {
    const initial = { vin: "JT-1" };
    const car = createSignal(initial);
    const other = createSignal({ vin: "JT-2" });
    expect(car()).toBe(initial);
    car.update((current) => ({ vin: current.vin + "-updated" }));
    expect(car()).toEqual({ vin: "JT-1-updated" });
    expect(other()).toEqual({ vin: "JT-2" });
    expect(Object.getOwnPropertySymbols(car).length).toBeGreaterThan(0);
  });

});
