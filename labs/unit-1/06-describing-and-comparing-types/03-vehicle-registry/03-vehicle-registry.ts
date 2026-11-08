export type Status = "ready" | "delayed" | "quality-hold";

export interface Vehicle {
  vin: string;
  status: Status;
}

// Require one label per status, with no arbitrary string keys.
export const labels: Record<string, string> = {
  ready: "Ready",
  delayed: "Delayed",
};

export function describeVehicle(
  vehicles: Record<string, Vehicle>,
  vin: string,
): string {
  const vehicle = vehicles[vin];
  return `${vehicle.vin}: ${labels[vehicle.status]}`;
}

export function describeVehicleMap(
  vehicles: Map<string, Vehicle>,
  vin: string,
): string {
  const vehicle = vehicles.get(vin);
  return `${vehicle.vin}: ${labels[vehicle.status]}`;
}
