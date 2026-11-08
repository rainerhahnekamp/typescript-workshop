export type Vehicle = { vin: string };
export type ElectricVehicle = Vehicle & { charge: number };

// Design each inspect signature so the supplied assignment checks pass.
// Use T in the signature, keep inspect as the only member, and do not add
// variance annotations, any, assertions or extra members.
export interface InspectorA<T> {
  inspect: unknown;
}

export interface InspectorB<T> {
  inspect: unknown;
}

export interface InspectorC<T> {
  inspect: unknown;
}

export interface InspectorD<T> {
  inspect: unknown;
}

export function createInspectorA<T>(value: T): InspectorA<T> {
  throw new Error("Implement createInspectorA");
}

export function createInspectorB<T>(report: (value: T) => void): InspectorB<T> {
  throw new Error("Implement createInspectorB");
}

export function createInspectorC<T>(report: (value: T) => void): InspectorC<T> {
  throw new Error("Implement createInspectorC");
}

export function createInspectorD<T>(review: (value: T) => T): InspectorD<T> {
  throw new Error("Implement createInspectorD");
}
