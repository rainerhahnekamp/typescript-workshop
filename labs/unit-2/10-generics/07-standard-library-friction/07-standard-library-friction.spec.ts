import { expect, expectTypeOf, it } from "vitest";
import { isIncluded, objectKeys } from "./07-standard-library-friction";

const vehicle = {
  vin: "JT-42",
  status: "ready" as const,
  delayed: false,
};

it("makes the Object.keys assumption explicit and local", () => {
  const standardKeys = Object.keys(vehicle);
  const knownKeys = objectKeys(vehicle);

  expectTypeOf(standardKeys).toEqualTypeOf<string[]>();
  expectTypeOf(knownKeys).toEqualTypeOf<Array<keyof typeof vehicle>>();
  expect(knownKeys).toEqual(["vin", "status", "delayed"]);
});

it("narrows an unknown value against a readonly literal list", () => {
  const statuses = ["ready", "delayed", "quality-hold"] as const;
  const input: unknown = "delayed";

  if (!isIncluded(statuses, input)) throw new Error("expected known status");

  expectTypeOf(input).toEqualTypeOf<(typeof statuses)[number]>();
  expect(input).toBe("delayed");
});

it("rejects values outside the literal list", () => {
  expect(isIncluded(["ready", "delayed"] as const, "missing")).toBe(false);
});
