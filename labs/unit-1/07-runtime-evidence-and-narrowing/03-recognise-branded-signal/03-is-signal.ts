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

export function isSignal(value: unknown): value is Signal {
  return typeof value === "function" && SIGNAL in value;
}
