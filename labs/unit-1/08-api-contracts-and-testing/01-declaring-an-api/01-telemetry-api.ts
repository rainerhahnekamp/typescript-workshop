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

// Declare parseTelemetry, summarizeTelemetry and formatSummary here.
// Use export declare function, parameter types and explicit return types.
// Do not implement CSV parsing, aggregation or report formatting.
