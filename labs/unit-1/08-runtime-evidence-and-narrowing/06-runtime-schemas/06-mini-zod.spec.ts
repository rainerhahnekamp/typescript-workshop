import { describe, expect, it } from "vitest";
import { z } from "./06-mini-zod";

describe("mini-zod", () => {
  describe("primitive schemas", () => {
    it("parses strings, including the empty string", () => {
      const schema = z.string();
      expect(schema.parse("JT-42")).toBe("JT-42");
      expect(schema.parse("")).toBe("");
    });

    it("rejects non-strings without coercion", () => {
      const schema = z.string();
      for (const value of [42, true, null, undefined, [], {}]) {
        expect(() => schema.parse(value)).toThrow(TypeError);
      }
    });

    it("parses finite numbers, including zero", () => {
      const schema = z.number();
      for (const value of [0, 42, -1, 1.5]) {
        expect(schema.parse(value)).toBe(value);
      }
    });

    it("rejects non-numbers and non-finite numbers", () => {
      const schema = z.number();
      for (const value of [
        "42",
        false,
        null,
        undefined,
        NaN,
        Infinity,
        -Infinity,
      ]) {
        expect(() => schema.parse(value)).toThrow(TypeError);
      }
    });

    it("parses both boolean values", () => {
      const schema = z.boolean();
      expect(schema.parse(true)).toBe(true);
      expect(schema.parse(false)).toBe(false);
    });

    it("rejects truthy and falsy values that are not booleans", () => {
      const schema = z.boolean();
      for (const value of [0, 1, "", "true", null, undefined, [], {}]) {
        expect(() => schema.parse(value)).toThrow(TypeError);
      }
    });
  });

  describe("object schemas", () => {
    const vehicleSchema = () =>
      z.object({
        vin: z.string(),
        mileage: z.number(),
        active: z.boolean(),
      });

    it("validates each declared property", () => {
      const input = { vin: "JT-42", mileage: 0, active: false };
      expect(vehicleSchema().parse(input)).toEqual(input);
    });

    it("rejects null, arrays and primitive values", () => {
      const schema = vehicleSchema();
      for (const value of [null, undefined, [], "vehicle", 42, true]) {
        expect(() => schema.parse(value)).toThrow(TypeError);
      }
    });

    it("rejects arrays even when the object schema has no required properties", () => {
      expect(() => z.object({}).parse([])).toThrow(TypeError);
    });

    it("rejects missing required properties", () => {
      const schema = vehicleSchema();
      for (const value of [
        { mileage: 0, active: false },
        { vin: "JT-42", active: false },
        { vin: "JT-42", mileage: 0 },
      ]) {
        expect(() => schema.parse(value)).toThrow(TypeError);
      }
    });

    it("rejects a wrong type in any declared property", () => {
      const schema = vehicleSchema();
      const valid = { vin: "JT-42", mileage: 0, active: false };
      for (const value of [
        { ...valid, vin: 42 },
        { ...valid, mileage: "0" },
        { ...valid, active: 0 },
      ]) {
        expect(() => schema.parse(value)).toThrow(TypeError);
      }
    });

    it("returns a new object containing only schema fields, without changing the input", () => {
      const input = Object.freeze({
        vin: "JT-42",
        mileage: 0,
        active: false,
        internal: true,
      });
      const parsed = vehicleSchema().parse(input);
      expect(parsed).toEqual({ vin: "JT-42", mileage: 0, active: false });
      expect(parsed).not.toBe(input);
      expect(input.internal).toBe(true);
      expect(z.object({}).parse({ extra: 1 })).toEqual({});
    });

    it("composes object schemas for nested values", () => {
      const schema = z.object({
        production: z.object({ completed: z.boolean() }),
      });
      expect(schema.parse({ production: { completed: true } })).toEqual({
        production: { completed: true },
      });
      expect(() => schema.parse({ production: { completed: "yes" } })).toThrow(
        TypeError,
      );
    });

    it("uses the parsed nested object instead of the original nested input", () => {
      const schema = z.object({
        production: z.object({ completed: z.boolean() }),
      });
      const input = {
        production: Object.freeze({ completed: true, internal: 42 }),
      };

      expect(schema.parse(input)).toEqual({
        production: { completed: true },
      });
      expect(input.production).toEqual({ completed: true, internal: 42 });
    });
  });
});
