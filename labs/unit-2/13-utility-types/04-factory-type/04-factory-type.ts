// Replace the placeholder with a function type derived from Ctor.
// Keep the supplied constructor constraint and InspectionReport unchanged.
export type Factory<
  Ctor extends abstract new (...args: any[]) => unknown,
> = (...args: unknown[]) => unknown;

export class InspectionReport {
  constructor(
    readonly vin: string,
    readonly passed: boolean,
  ) {}
}
