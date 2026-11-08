export const vehicle = {
  vin: "JT-42",
  mileage: 12_000,
  status: "ready" as const,
};
export const VEHICLE_STATUSES = ["ready", "delayed", "quality-hold"] as const;

// Derive these aliases from the supplied values. Do not copy their shapes.
export type Vehicle = unknown;
export type VehicleKey = unknown;
export type Mileage = unknown;
export type VehicleStatus = unknown;
