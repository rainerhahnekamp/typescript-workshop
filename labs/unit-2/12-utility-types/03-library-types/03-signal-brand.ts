import type { Signal } from "../../../unit-1/07-runtime-evidence-and-narrowing/03-recognise-branded-signal/03-is-signal";

export type SignalBrandKey = Extract<keyof Signal, symbol>;
export type SignalBrandValue = Signal[SignalBrandKey];

export function getSignalBrandKey(signal: Signal): SignalBrandKey {
  const symbols = Object.getOwnPropertySymbols(signal);
  const key = symbols[0];
  if (symbols.length !== 1 || key === undefined) {
    throw new Error("Expected exactly one own symbol");
  }
  // Controlled library shape: its sole own symbol is the Signal brand.
  // Reflection returns symbol[], so TypeScript can't recover this identity.
  return key as SignalBrandKey;
}

export function readSignalBrand(signal: Signal): SignalBrandValue {
  return signal[getSignalBrandKey(signal)];
}

export function createCounterfeitSignal(source: Signal, value: number): Signal {
  const key: SignalBrandKey = getSignalBrandKey(source);
  return Object.assign(() => value, { [key]: source[key] });
}
