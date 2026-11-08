import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { vi } from "vitest";
import { freeze } from "./01-mini-freeze";

describe("freezing an object", () => {
  beforeAll(() => {
    vi.spyOn(Object, "freeze").mockImplementation(() => {
      throw new Error();
    });
  });

  afterAll(() => vi.restoreAllMocks());

  it("throws on overriding a value", () => {
    const value = { speed: 42, engine: { horsepower: 100 } };

    freeze(value);

    expect(() => {
      value.speed = 100;
    }).toThrow(TypeError);
  });

  it("throws when setting configurable back to true", () => {
    const value = { speed: 42, engine: { horsepower: 100 } };

    freeze(value);

    expect(() => {
      Object.defineProperty(value, "speed", { configurable: true });
    }).toThrow(TypeError);
  });

  it("freezes a symbol-keyed property", () => {
    const key = Symbol("marker");
    const value = { speed: 42, engine: { horsepower: 100 }, [key]: "ready" };

    freeze(value);

    expect(() => {
      value[key] = "not ready";
    }).toThrow(TypeError);
  });

  it("throws on assignment to a locked accessor property", () => {
    let stored = 0;
    const value = {
      engine: { horsepower: 100 },
      get speed() {
        return stored;
      },
      set speed(next: number) {
        stored = next;
      },
    };

    freeze(value);

    expect(() => {
      value.speed = 1;
    }).toThrow(TypeError);
  });

  it("is shallow: nested objects remain mutable", () => {
    const value = { speed: 42, engine: { horsepower: 100 } };

    freeze(value);

    value.engine.horsepower = 150;
    expect(value.engine.horsepower).toBe(150);
  });

  it("throw when Object.freeze is used", () => {
    expect(() => Object.freeze({ value: 1 })).toThrow();
  });
});
