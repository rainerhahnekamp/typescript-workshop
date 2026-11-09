export type StoredCar = {
  vin: string;
  brand: string;
  mileage: number;
  price?: {
    value: number;
    currency: string;
  };
};

// TODO: Select the editable fields, then make them optional for the form.
export type VehicleDraft = Partial<StoredCar>;

// TODO: Both editable fields must be present when saving.
export type SaveVehicle = VehicleDraft;
