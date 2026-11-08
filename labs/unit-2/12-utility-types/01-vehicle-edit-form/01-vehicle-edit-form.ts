import type {
  Car,
  update,
} from "../../../unit-1/04-objects/07-mini-immer/07-mini-immer";

export type StoredCar = Car & { vin: string };

export type VehicleDraft = Partial<Pick<StoredCar, "brand" | "mileage">>;

export type SaveVehicle = Required<VehicleDraft>;

export function saveVehicle(
  car: StoredCar,
  draft: VehicleDraft,
  updateCar: typeof update,
): StoredCar {
  const changes: SaveVehicle = {
    brand: draft.brand ?? car.brand,
    mileage: draft.mileage ?? car.mileage,
  };
  const updated = updateCar(car, (current) => {
    current.brand = changes.brand;
    current.mileage = changes.mileage;
  });
  return { ...updated, vin: car.vin };
}
