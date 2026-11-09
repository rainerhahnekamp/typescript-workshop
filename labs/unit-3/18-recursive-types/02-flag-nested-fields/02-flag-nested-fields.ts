export type DeepFlags<T> = T extends object
  ? { [Key in keyof T]: unknown }
  : boolean;

type Result = DeepFlags<{ vehicle: { vin: string }; ready: string }>;
// { vehicle: { vin: boolean }; ready: boolean }
