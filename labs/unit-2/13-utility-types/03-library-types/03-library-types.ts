import type { Vehicle } from "./03-vehicle-library";
import { bookService, inspectVehicle } from "./03-vehicle-library";

// Replace unknown by deriving types from the public exports above.
// Do not copy the library's interfaces or change 03-vehicle-library.ts.
export type VehicleEngine = unknown;
export type InspectionResult = unknown;
export type BookingOptions = unknown;

export function describeEngine(engine: VehicleEngine): string {
  return `${engine.powerKw} kW (${engine.fuel})`;
}

export function formatInspection(result: InspectionResult): string {
  return result.passed
    ? "Inspection passed"
    : `Issues: ${result.issues.join(", ")}`;
}

export function bookFleetService(
  vins: string[],
  options: BookingOptions,
): void {
  for (const vin of vins) bookService(vin, options);
}

// Application code needs the aliases to annotate reusable helpers.
export function describeVehicle(vehicle: Vehicle): string {
  return `${vehicle.vin}: ${describeEngine(vehicle.engine)}`;
}

export function inspectAndFormat(vin: string): string {
  return formatInspection(inspectVehicle(vin));
}
