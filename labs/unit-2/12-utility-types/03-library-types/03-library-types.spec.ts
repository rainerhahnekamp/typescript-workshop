import { expect, expectTypeOf, it, vi } from "vitest";
import * as library from "./03-vehicle-library";
import {
  bookFleetService,
  describeEngine,
  describeVehicle,
  formatInspection,
  inspectAndFormat,
  type BookingOptions,
  type InspectionResult,
  type VehicleEngine,
} from "./03-library-types";

expectTypeOf<VehicleEngine>().toEqualTypeOf<{
  fuel: "petrol" | "diesel" | "electric";
  powerKw: number;
}>();
expectTypeOf<InspectionResult>().toEqualTypeOf<{
  passed: boolean;
  issues: string[];
}>();
expectTypeOf<BookingOptions>().toEqualTypeOf<{
  priority: "normal" | "urgent";
  courtesyCar: boolean;
}>();

it("describes an engine independently of the rest of the vehicle", () => {
  const engine: VehicleEngine = { fuel: "electric", powerKw: 150 };
  expect(describeEngine(engine)).toBe("150 kW (electric)");
  expect(describeVehicle({ vin: "JT-1", engine })).toBe(
    "JT-1: 150 kW (electric)",
  );
});

it("formats both inspection outcomes", () => {
  expect(inspectAndFormat("JT-1")).toBe("Inspection passed");
  expect(inspectAndFormat("")).toBe("Issues: Missing VIN");
  expect(formatInspection({ passed: false, issues: ["Brakes", "Tyres"] })).toBe(
    "Issues: Brakes, Tyres",
  );
});

it("forwards the same options to every fleet booking", () => {
  const booking = vi.spyOn(library, "bookService").mockImplementation(() => {});
  try {
    const options: BookingOptions = { priority: "urgent", courtesyCar: true };
    bookFleetService(["JT-1", "JT-2"], options);
    expect(booking.mock.calls).toEqual([
      ["JT-1", options],
      ["JT-2", options],
    ]);
    expect(booking.mock.calls[0]?.[1]).toBe(options);
  } finally {
    booking.mockRestore();
  }
});

function rejectedInputs() {
  // @ts-expect-error Unsupported fuel.
  describeEngine({ fuel: "hydrogen", powerKw: 150 });
  // @ts-expect-error Issues must be strings.
  formatInspection({ passed: false, issues: [42] });
  // @ts-expect-error Courtesy car must be boolean.
  bookFleetService(["JT-1"], { priority: "urgent", courtesyCar: "yes" });
}
