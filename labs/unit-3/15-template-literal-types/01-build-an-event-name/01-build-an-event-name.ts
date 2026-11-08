export type VehicleEvent<Status extends string> = `vehicle:${Status}`;

type Result = VehicleEvent<"ready" | "delayed">;
// "vehicle:ready" | "vehicle:delayed"
