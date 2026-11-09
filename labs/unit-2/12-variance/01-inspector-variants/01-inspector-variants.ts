export type Vehicle = { vin: string };
export type ElectricVehicle = Vehicle & { charge: number };

// 1. A seller hands a vehicle to the customer.
export interface Seller<T> {
  sell: () => T;
}

// 2. An inspector receives a vehicle from the customer.
export interface Inspector<T> {
  inspect: (vehicle: T) => void;
}

// 3. The two inspector roles should be assignable in both directions.
export interface SwappableInspector<T> {
  inspect(vehicle: T): void;
}

// 4. Each role must keep its exact specialization when compared with
// another instantiation of the same generic type.
export interface SpecializedSeller<in out T> {
  sell: () => T;
}

export interface SpecializedInspector<in out T> {
  inspect: (vehicle: T) => void;
}
