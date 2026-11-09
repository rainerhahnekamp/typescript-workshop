export type Status = "ready" | "delayed" | "quality-hold";

export interface Vehicle {
  vin: string;
  status: Status;
}

// Require one label per status, with no arbitrary string keys.
export const labels: Record<Status, string> = {
  ready: "Ready",
  delayed: "Delayed",
  "quality-hold": "Quality hold",
};

export function describeVehicle(
  vehicles: Record<string, Vehicle>,
  vin: string,
): string {
  const vehicle = vehicles[vin];
  const vins = Object.keys(vehicles);

  if (!vins.includes(vin) || vehicle === undefined) {
    return "Vehicle not found";
  }
  return `${vehicle.vin}: ${labels[vehicle.status]}`;
}

export function describeVehicleMap(
  vehicles: Map<string, Vehicle>,
  vin: string,
): string {
  const vehicle = vehicles.get(vin);
  if (!vehicle) {
    return "Vehicle not found";
  }
  return `${vehicle.vin}: ${labels[vehicle.status]}`;
}
