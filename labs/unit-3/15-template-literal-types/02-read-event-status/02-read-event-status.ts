export type EventStatus<Name extends string> = unknown;

type A = EventStatus<"vehicle:ready">; // "ready"
type B = EventStatus<"plant:ready">;   // never
