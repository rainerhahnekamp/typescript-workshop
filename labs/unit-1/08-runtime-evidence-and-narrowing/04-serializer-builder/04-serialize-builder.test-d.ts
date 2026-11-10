import { describe, test } from "vitest";
import { createSerializers } from "./04-serialize-builder";

describe("serialize builder", () => {
  test("the registry accepts callbacks with specific parameter types", () => {
    const { registerSerializer } = createSerializers();
    registerSerializer("string", (value: string) => value);
    registerSerializer("number", (value: number) => value.toFixed(2));
    registerSerializer("boolean", (value: boolean) => value ? "真" : "偽");
    registerSerializer("object", (value: unknown) => String(value));
  });

  test("registration still requires a string tag and a string-returning callback", () => {
    const { registerSerializer } = createSerializers();
    // @ts-expect-error Formatters must return strings.
    registerSerializer("number", (value: number) => value);
    // @ts-expect-error The runtime type tag must be a string.
    registerSerializer(42, (value: number) => value.toFixed(2));
    // @ts-expect-error A formatter must be a function.
    registerSerializer("number", "toFixed");
  });
});
