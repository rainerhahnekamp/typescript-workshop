type Vehicle = {
  vin: string;
  describe: () => string;
};

type ElectricVehicle = Vehicle & { charge: () => string };

// Supplied class version. Keep these class definitions unchanged.
export class VehicleClass implements Vehicle {
  static readonly category: string = "vehicle";

  constructor(public vin: string) {}

  describe(): string {
    return `${VehicleClass.category}:${this.vin}`;
  }
}

export class ElectricVehicleClass
  extends VehicleClass
  implements ElectricVehicle
{
  charge(): string {
    return `charging: ${this.vin}`;
  }
}

// Your function/prototype version. Use the same methods and properties as the classes.
export function VehicleFunction(this: Vehicle, vin: string) {
  throw new Error("Implement VehicleFunction");
}

export function ElectricVehicleFunction(this: ElectricVehicle, vin: string) {
  throw new Error("Implement ElectricVehicleFunction");
}
