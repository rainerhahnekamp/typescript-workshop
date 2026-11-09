export type Vehicle = { vin: string };
export type ElectricVehicle = Vehicle & { charge: number };

export interface InspectorA<T> {
  inspect: () => T;
}

export interface InspectorB<T> {
  inspect: (value: T) => void;
}

export interface InspectorC<T> {
  inspect(value: T): void;
}

export interface InspectorD<T> {
  inspect: (value: T) => T;
}

export function createInspectorA<T>(value: T): InspectorA<T> {
  return { inspect: () => value };
}

export function createInspectorB<T>(report: (value: T) => void): InspectorB<T> {
  return { inspect: (value: T) => report(value) };
}

export function createInspectorC<T>(report: (value: T) => void): InspectorC<T> {
  return {
    inspect: (value: T) => {
      report(value);
    },
  };
}

export function createInspectorD<T>(review: (value: T) => T): InspectorD<T> {
  return { inspect: (value: T) => review(value) };
}
