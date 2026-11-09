import type { Vehicle } from "./03-vehicle-library";
import { bookService, inspectVehicle } from "./03-vehicle-library";

export type VehicleEngine = Vehicle["engine"];
export type InspectionResult = ReturnType<typeof inspectVehicle>;
export type BookingOptions = Parameters<typeof bookService>[1];

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

export function describeVehicle(vehicle: Vehicle): string {
  return `${vehicle.vin}: ${describeEngine(vehicle.engine)}`;
}

export function inspectAndFormat(vin: string): string {
  return formatInspection(inspectVehicle(vin));
}
