export type DeepFlags<T> = T extends object
  ? { [Key in keyof T]: DeepFlags<T[Key]> }
  : boolean;

type Result = DeepFlags<{ vehicle: { vin: string }; ready: string }>;
// { vehicle: { vin: boolean }; ready: boolean }
