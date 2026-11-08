import { describe, expect, it, vi } from "vitest";
import { createSerializers } from "./04-serialize-builder";

describe("Serializer Builder", () => {
  it("dispatches each value to its registered runtime-type formatter", () => {
    const { registerSerializer, serialize } = createSerializers();
    const number = vi.fn((value: number) => value.toFixed(2));
    const text = vi.fn((value: string) => `[${value}]`);
    const boolean = vi.fn((value: boolean) => value ? "真" : "偽");
    registerSerializer("number", number);
    registerSerializer("string", text);
    registerSerializer("boolean", boolean);

    expect(serialize(12.5)).toBe("12.50");
    expect(serialize("hallo")).toBe("[hallo]");
    expect(serialize(true)).toBe("真");
    expect(serialize(false)).toBe("偽");
    expect(number.mock.calls).toEqual([[12.5]]);
    expect(text.mock.calls).toEqual([["hallo"]]);
    expect(boolean.mock.calls).toEqual([[true], [false]]);
  });

  it("returns an empty string for unregistered types without invoking another formatter", () => {
    const { registerSerializer, serialize } = createSerializers();
    const number = vi.fn((value: number) => value.toFixed(2));
    registerSerializer("number", number);

    for (const value of ["hallo", false, null, undefined, {}, [], () => 0]) {
      expect(serialize(value)).toBe("");
    }
    expect(number).not.toHaveBeenCalled();
  });

  it("replaces an existing formatter for the same type", () => {
    const { registerSerializer, serialize } = createSerializers();
    registerSerializer("number", (value: number) => value.toFixed(2));
    expect(serialize(12.5)).toBe("12.50");
    registerSerializer("number", (value: number) => `number:${value}`);
    expect(serialize(12.5)).toBe("number:12.5");
  });

  it("keeps each registry independent and preserves empty formatter output", () => {
    const first = createSerializers();
    const second = createSerializers();
    expect(first.serialize(42)).toBe("");
    first.registerSerializer("number", (value: number) => value.toFixed(2));
    expect(first.serialize(42)).toBe("42.00");
    expect(second.serialize(42)).toBe("");
    first.registerSerializer("number", (_value: number) => "");
    expect(first.serialize(42)).toBe("");
  });
});
