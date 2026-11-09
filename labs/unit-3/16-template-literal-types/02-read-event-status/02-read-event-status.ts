export type EventStatus<Name extends string> =
  Name extends `vehicle:${infer Status}` ? Status : never;

type A = EventStatus<"vehicle:ready">; // "ready"
type B = EventStatus<"plant:ready">;   // never
