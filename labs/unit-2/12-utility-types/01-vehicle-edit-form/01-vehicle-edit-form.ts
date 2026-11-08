import type {
  Car,
  update,
} from "../../../unit-1/04-objects/07-mini-immer/07-mini-immer";

export type StoredCar = Car & { vin: string };

// TODO: Select the editable fields, then make them optional for the form.
export type VehicleDraft = Partial<StoredCar>;

// TODO: Both editable fields must be present when saving.
export type SaveVehicle = VehicleDraft;

export function saveVehicle(
  car: StoredCar,
  draft: VehicleDraft,
  updateCar: typeof update,
): StoredCar {
  // TODO: Fill missing fields from the car and pass the changes to updateCar.
  return car;
}
