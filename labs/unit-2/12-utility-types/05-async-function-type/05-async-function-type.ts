// Replace the placeholder with an async function type derived from Fn.
// Keep the supplied constraint and example function types unchanged.
export type Asyncify<Fn extends (...args: any[]) => unknown> = unknown;

export type ReadCharge = (vin: string, fallback?: number) => number;
export type LoadCharge = (vin: string, fallback?: number) => Promise<number>;
