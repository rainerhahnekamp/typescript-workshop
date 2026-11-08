export type VehicleEvent<Status extends string> = unknown;

type Result = VehicleEvent<"ready" | "delayed">;
// "vehicle:ready" | "vehicle:delayed"
