export type Vehicle = { vin: string };
export type ElectricVehicle = Vehicle & { charge: number };

// 1. A seller hands a vehicle to the customer.
export interface Seller<T> {
  sell: unknown;
}

// 2. An inspector receives a vehicle from the customer.
export interface Inspector<T> {
  inspect: unknown;
}

// 3. The two inspector roles should be assignable in both directions.
export interface SwappableInspector<T> {
  inspect: unknown;
}

// 4. Each role must keep its exact specialization when compared with
// another instantiation of the same generic type.
export interface SpecializedSeller<T> {
  sell: unknown;
}

export interface SpecializedInspector<T> {
  inspect: unknown;
}
