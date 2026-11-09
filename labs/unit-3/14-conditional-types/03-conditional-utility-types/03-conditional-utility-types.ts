export type MyReturnType<Fn> = unknown;
export type MyParameters<Fn> = unknown;
export type FirstParameter<Fn> = unknown;

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

// Hover over these examples as you implement the utilities.
type MileageResult = MyReturnType<typeof readMileage>; // Promise<number>
type MileageParameters = MyParameters<typeof readMileage>; // [vin: string, includeHistory: boolean]
type MileageFirstParameter = FirstParameter<typeof readMileage>; // string
type PlantFirstParameter = FirstParameter<typeof readPlant>; // undefined
type ReadingParameters = MyParameters<typeof formatReadings>; // [vin: string, ...readings: number[]]
type NumberResult = MyReturnType<typeof mileage>; // never
type ObjectResult = MyReturnType<typeof vehicle>; // never
