export type VehicleStatus = "planned" | "in-production" | "completed";

export interface ProductionSite {
  /** @minLength 2 */
  code: string;

  /** @minLength 1 @maxLength 80 */
  name: string;
}

export interface Vehicle {
  /** @int @min 1 */
  id: number;

  /** @minLength 10 @maxLength 17 */
  vin: string;

  /** @format email */
  ownerEmail: string;

  status: VehicleStatus;

  site: ProductionSite;

  /** @minItems 1 @maxItems 8 */
  inspectionCodes: string[];

  /** @format datetime */
  producedAt?: string;
}
