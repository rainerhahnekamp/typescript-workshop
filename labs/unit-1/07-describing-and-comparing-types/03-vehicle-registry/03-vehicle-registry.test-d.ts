import { describe, expectTypeOf, test } from "vitest";
import { describeVehicle, describeVehicleMap, labels, type Status, type Vehicle } from "./03-vehicle-registry";

describe("vehicle registry", () => {
  test("the label dictionary requires exactly the known status keys", () => {
    expectTypeOf(labels).toEqualTypeOf<Record<Status, string>>();
    const valid: typeof labels = { ready: "Ready", delayed: "Delayed", "quality-hold": "Quality hold" };
    // @ts-expect-error Every status needs a label.
    const missing: typeof labels = { ready: "Ready", delayed: "Delayed" };
    // @ts-expect-error A misspelled status is not a label key.
    const typo: typeof labels = { ready: "Ready", delayed: "Delayed", "quality-hold": "Quality hold", delayd: "Typo" };
    // @ts-expect-error Arbitrary string keys are not exposed by this finite dictionary.
    labels.missing;
  });

  test("the lookup API accepts arbitrary VIN strings and preserves its result type", () => {
    const registry: Record<string, Vehicle> = {};
    expectTypeOf(describeVehicle(registry, "missing")).toEqualTypeOf<string>();
    expectTypeOf(describeVehicleMap(new Map<string, Vehicle>(), "missing")).toEqualTypeOf<string>();
    // @ts-expect-error VINs are strings.
    describeVehicle(registry, 42);
    // @ts-expect-error Registered vehicles must have a known status.
    describeVehicle({ invalid: { vin: "JT-42", status: "broken" } }, "invalid");
  });
});
