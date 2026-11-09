import { describe, expect, it } from "vitest";
import {
  describeVehicle,
  describeVehicleMap,
  labels,
  type Vehicle,
} from "./03-vehicle-registry";

const vehicles: Record<string, Vehicle> = {
  "JT-42": { vin: "JT-42", status: "ready" },
  "EV-1": { vin: "EV-1", status: "delayed" },
  "QH-2": { vin: "QH-2", status: "quality-hold" },
};

describe("vehicle registry", () => {
  it("supplies a display label for every status", () => {
    expect(labels).toEqual({
      ready: "Ready",
      delayed: "Delayed",
      "quality-hold": "Quality hold",
    });
  });

  it.each([
    ["JT-42", "JT-42: Ready"],
    ["EV-1", "EV-1: Delayed"],
    ["QH-2", "QH-2: Quality hold"],
  ])("describes %s using either collection", (vin, expected) => {
    expect(describeVehicle(vehicles, vin)).toBe(expected);
    expect(describeVehicleMap(new Map(Object.entries(vehicles)), vin)).toBe(
      expected,
    );
  });

  it.each(["missing", "", "toString", "constructor", "__proto__"])(
    "handles the missing VIN %j",
    (vin) => {
      expect(describeVehicle(vehicles, vin)).toBe("Vehicle not found");
      expect(describeVehicleMap(new Map(Object.entries(vehicles)), vin)).toBe(
        "Vehicle not found",
      );
    },
  );

  it("handles empty collections", () => {
    expect(describeVehicle({}, "JT-42")).toBe("Vehicle not found");
    expect(describeVehicleMap(new Map(), "JT-42")).toBe("Vehicle not found");
  });

  it("does not treat a non-enumerable own property as a registered vehicle", () => {
    const vehicle: Vehicle = { vin: "JT-42", status: "ready" };
    const registry: Record<string, Vehicle> = {};
    Object.defineProperty(registry, vehicle.vin, {
      value: vehicle,
      enumerable: false,
    });

    expect(describeVehicle(registry, "JT-42")).toBe("Vehicle not found");
  });

  it("does not modify the collection or vehicle", () => {
    const vehicle = Object.freeze({ vin: "JT-42", status: "ready" as const });
    const registry = Object.freeze({ "JT-42": vehicle });
    const map = new Map([["JT-42", vehicle]]);
    expect(describeVehicle(registry, "JT-42")).toBe("JT-42: Ready");
    expect(describeVehicleMap(map, "JT-42")).toBe("JT-42: Ready");
    expect(map.size).toBe(1);
    expect(map.get("JT-42")).toBe(vehicle);
  });
});
