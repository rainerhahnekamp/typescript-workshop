export const vehicle = { vin: "JT-42", mileage: 12_000, status: "ready" as const };
export const VEHICLE_STATUSES = ["ready", "delayed", "quality-hold"] as const;

export type Vehicle = typeof vehicle;
export type VehicleKey = keyof Vehicle;
export type Mileage = Vehicle["mileage"];
export type VehicleStatus = (typeof VEHICLE_STATUSES)[number];
