// Supplied Signal implementation from Chapter 5. Implement only isSignal below.
const SIGNAL = Symbol("SIGNAL");
export type Signal = (() => number) & { [SIGNAL]: true };

export type WritableSignal = Signal & {
  set(value: number): void;
  update(updater: (current: number) => number): void;
};

export function createSignal(initial: number): WritableSignal {
  let _value = initial;
  const node: WritableSignal = () => _value;

  node[SIGNAL] = true;
  node.set = (value) => (_value = value);
  node.update = (updater) => (_value = updater(_value));

  return node;
}

// Add a type predicate signature and the runtime check for the private marker.
export function isSignal(value: unknown): boolean {
  throw new Error("Implement isSignal");
}
