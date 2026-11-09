export type StoredCar = {
  vin: string;
  brand: string;
  mileage: number;
  price?: {
    value: number;
    currency: string;
  };
};

export type VehicleDraft = Partial<Pick<StoredCar, "brand" | "mileage">>;

export type SaveVehicle = Required<VehicleDraft>;
