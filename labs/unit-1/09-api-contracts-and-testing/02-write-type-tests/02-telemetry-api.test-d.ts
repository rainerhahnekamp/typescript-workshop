import { describe, assertType, expectTypeOf, test } from "vitest";
import {
  parseTelemetry,
  summarizeTelemetry,
  formatSummary,
  type TelemetryReading,
  type FleetSummary,
} from "../01-declaring-an-api/01-telemetry-api";

const csv = "vin,recordedAt,speedKmh\nJT-1001,2026-11-06T09:00:00Z,45";
const readings: readonly TelemetryReading[] = [
  {
    vin: "JT-1001",
    recordedAt: new Date("2026-11-06T09:00:00Z"),
    speedKmh: 45,
  },
];

describe("telemetry api", () => {
  test("CSV text produces typed readings", () => {
    const parsed = parseTelemetry(csv);
    expectTypeOf(parsed).toEqualTypeOf<TelemetryReading[]>();
  });

  test("readings produce a summary with optional filtering", () => {
    expectTypeOf(summarizeTelemetry(readings)).toEqualTypeOf<FleetSummary>();
    expectTypeOf(summarizeTelemetry(readings, {})).toEqualTypeOf<FleetSummary>();
    const summary = summarizeTelemetry(readings, { minimumSpeedKmh: 10 });
    expectTypeOf(summary).toEqualTypeOf<FleetSummary>();
    expectTypeOf(summary.totalReadings).toEqualTypeOf<number>();
  });

  test("the three declared functions form a usable pipeline", () => {
    const summary = summarizeTelemetry(parseTelemetry(csv));
    expectTypeOf(formatSummary(summary, "text")).toEqualTypeOf<string>();
    assertType<string>(formatSummary(summary, "text"));
    expectTypeOf(formatSummary(summary, "csv")).toEqualTypeOf<string>();
  });

  test("invalid calls are rejected", () => {
    // @ts-expect-error The parser needs CSV text, not pre-parsed readings.
    parseTelemetry(readings);
    // @ts-expect-error Summarizing requires readings, not raw CSV text.
    summarizeTelemetry(csv);
    // @ts-expect-error A minimum speed is numeric.
    summarizeTelemetry(readings, { minimumSpeedKmh: "10" });
    const summary = summarizeTelemetry(readings);
    // @ts-expect-error Only text and csv output formats are supported.
    formatSummary(summary, "pdf");
    // @ts-expect-error The output format must be chosen explicitly.
    formatSummary(summary);
  });
});
