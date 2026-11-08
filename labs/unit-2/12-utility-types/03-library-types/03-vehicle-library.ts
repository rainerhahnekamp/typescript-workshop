// Supplied library: use its public exports without changing this file.
interface Engine {
  fuel: "petrol" | "diesel" | "electric";
  powerKw: number;
}

export interface Vehicle {
  vin: string;
  engine: Engine;
}

interface Inspection {
  passed: boolean;
  issues: string[];
}

export function inspectVehicle(vin: string): Inspection {
  return vin.trim()
    ? { passed: true, issues: [] }
    : { passed: false, issues: ["Missing VIN"] };
}

interface ServiceOptions {
  priority: "normal" | "urgent";
  courtesyCar: boolean;
}

export function bookService(vin: string, options: ServiceOptions): void {
  if (!vin.trim()) throw new Error("Missing VIN");
  // A real library would send this booking to a service here.
  console.log(`Booked ${vin}`, options);
}
