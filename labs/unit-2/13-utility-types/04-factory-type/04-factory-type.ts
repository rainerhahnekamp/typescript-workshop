export type Factory<
  Ctor extends abstract new (...args: any[]) => unknown,
> = (...args: ConstructorParameters<Ctor>) => InstanceType<Ctor>;

export class InspectionReport {
  constructor(
    readonly vin: string,
    readonly passed: boolean,
  ) {}
}
