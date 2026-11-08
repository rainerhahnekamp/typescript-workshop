export type Flags<T> = { [Key in keyof T]: boolean };

type Result = Flags<{ vin: string; mileage: number }>;
// { vin: boolean; mileage: boolean }
