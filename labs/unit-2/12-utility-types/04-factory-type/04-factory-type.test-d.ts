import { expectTypeOf, test } from "vitest";
import { type Factory, InspectionReport } from "./04-factory-type";

test("converts a constructor into a callable factory with the same arguments and instance", () => {
  type InspectionReportFactory = Factory<typeof InspectionReport>;
  expectTypeOf<InspectionReportFactory>().parameters.toEqualTypeOf<[
    vin: string,
    passed: boolean,
  ]>();
  expectTypeOf<InspectionReportFactory>().returns.toEqualTypeOf<InspectionReport>();

  const createReport: InspectionReportFactory = (...args) =>
    new InspectionReport(...args);
  expectTypeOf(createReport("JT-1", true)).toEqualTypeOf<InspectionReport>();
  // @ts-expect-error The constructor requires a boolean second argument.
  createReport("JT-1", "passed");
  // @ts-expect-error Required constructor arguments stay required.
  createReport("JT-1");
  // @ts-expect-error A factory is callable, not constructable.
  new createReport("JT-1", true);
});

test("works with another constructor and preserves optional and rest parameters", () => {
  class DeliveryManifest {
    constructor(
      readonly destination: URL,
      readonly priority?: number,
      ...vins: string[]
    ) {}
  }

  type ManifestFactory = Factory<typeof DeliveryManifest>;
  expectTypeOf<ManifestFactory>().parameters.toEqualTypeOf<[
    destination: URL,
    priority?: number,
    ...vins: string[],
  ]>();
  expectTypeOf<ManifestFactory>().returns.toEqualTypeOf<DeliveryManifest>();

  const createManifest: ManifestFactory = (...args) =>
    new DeliveryManifest(...args);
  createManifest(new URL("https://example.com"));
  createManifest(new URL("https://example.com"), 1, "JT-1", "JT-2");
  // @ts-expect-error Rest arguments retain their element type.
  createManifest(new URL("https://example.com"), 1, 42);
});

test("requires a constructor type rather than its instance type", () => {
  // @ts-expect-error An instance does not carry the constructor signature.
  type InstanceFactory = Factory<InspectionReport>;
  // @ts-expect-error A plain function is not a constructor.
  type FunctionFactory = Factory<() => InspectionReport>;
});
