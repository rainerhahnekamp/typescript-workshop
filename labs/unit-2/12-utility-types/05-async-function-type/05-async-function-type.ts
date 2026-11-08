export type Asyncify<Fn extends (...args: any[]) => unknown> = (
  ...args: Parameters<Fn>
) => Promise<Awaited<ReturnType<Fn>>>;

export type ReadCharge = (vin: string, fallback?: number) => number;
export type LoadCharge = (vin: string, fallback?: number) => Promise<number>;
