import type { Signal } from "../../../unit-1/08-runtime-evidence-and-narrowing/03-recognise-branded-signal/03-is-signal";

// Create your own callable that passes the existing isSignal predicate.
// Keep source unchanged and return the requested value independently of it.
export function createCounterfeitSignal(source: Signal, value: number): Signal {
  throw new Error("Implement the counterfeit Signal.");
}
