// Replace the placeholder with an object that has a typed answer method.
export type Spy<Fn extends (...args: never[]) => unknown> = unknown;
