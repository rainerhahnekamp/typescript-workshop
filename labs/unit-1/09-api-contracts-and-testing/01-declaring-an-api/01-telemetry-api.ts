export interface TelemetryReading {
  vin: string;
  recordedAt: Date;
  speedKmh: number;
}

export interface SummaryOptions {
  minimumSpeedKmh?: number;
}

export interface VehicleSummary {
  vin: string;
  averageSpeedKmh: number;
  sampleCount: number;
}

export interface FleetSummary {
  vehicles: VehicleSummary[];
  totalReadings: number;
}

export declare function parseTelemetry(csv: string): TelemetryReading[];

export declare function summarizeTelemetry(
  readings: readonly TelemetryReading[],
  options?: SummaryOptions,
): FleetSummary;

export declare function formatSummary(
  summary: FleetSummary,
  format: "text" | "csv",
): string;
