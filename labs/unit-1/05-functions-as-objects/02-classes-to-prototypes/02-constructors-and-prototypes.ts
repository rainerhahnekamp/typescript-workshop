type Vehicle = {
  vin: string;
  describe: () => string;
};

type ElectricVehicle = Vehicle & { charge: () => string };

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

export function VehicleFunction(this: VehicleClass, vin: string): void {
  this.vin = vin;
}

VehicleFunction.category = "vehicle";

VehicleFunction.prototype = {
  describe(this: VehicleClass): string {
    return `${VehicleFunction.category}:${this.vin}`;
  },
};

export function ElectricVehicleFunction(this: ElectricVehicleClass, vin: string): void {
  VehicleFunction.call(this, vin);
}

ElectricVehicleFunction.prototype = {
  charge(this: ElectricVehicleClass): string {
    return `charging: ${this.vin}`;
  },
};

Object.setPrototypeOf(ElectricVehicleFunction, VehicleFunction);

Object.setPrototypeOf(ElectricVehicleFunction.prototype, VehicleFunction.prototype);