export type Flags<T> = unknown;

type Result = Flags<{ vin: string; mileage: number }>;
// { vin: boolean; mileage: boolean }
