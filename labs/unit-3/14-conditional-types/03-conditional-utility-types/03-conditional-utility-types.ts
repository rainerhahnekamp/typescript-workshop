export type MyReturnType<Fn> = Fn extends (...args: never[]) => infer Result
  ? Result
  : never;
export type MyParameters<Fn> = Fn extends (...args: infer Args) => unknown
  ? Args
  : never;
export type FirstParameter<Fn> = MyParameters<Fn>[0];

export async function readMileage(vin: string, includeHistory: boolean) {
  const extraMileage = vin === "JT-42" && includeHistory ? 1_000 : 0;
  return 42_000 + extraMileage;
}

export function readPlant() {
  return "Motomachi";
}

export function formatReadings(vin: string, ...readings: number[]) {
  return `${vin}: ${readings.join(", ")}`;
}

export const mileage: number = 42_000;
export const vehicle = { vin: "JT-42", mileage };

// Hover over these examples to inspect the inferred types.
type MileageResult = MyReturnType<typeof readMileage>; // Promise<number>
type MileageParameters = MyParameters<typeof readMileage>; // [vin: string, includeHistory: boolean]
type MileageFirstParameter = FirstParameter<typeof readMileage>; // string
type PlantFirstParameter = FirstParameter<typeof readPlant>; // undefined
type ReadingParameters = MyParameters<typeof formatReadings>; // [vin: string, ...readings: number[]]
type NumberResult = MyReturnType<typeof mileage>; // never
type ObjectResult = MyReturnType<typeof vehicle>; // never
