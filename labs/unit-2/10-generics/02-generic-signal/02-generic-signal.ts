const SIGNAL = Symbol("workshop.signal");

type SignalNode = boolean;

export type Signal<T> = (() => T) & {
  [SIGNAL]: SignalNode;
};

export type WritableSignal<T> = Signal<T> & {
  set(value: T): void;
  update(updater: (current: T) => T): void;
};

export function createSignal<T>(initial: T): WritableSignal<T> {
  let _value = initial;
  const node: WritableSignal<T> = () => _value;
  node[SIGNAL] = true;
  node.set = (value) => (_value = value);
  node.update = (updater) => (_value = updater(_value));

  return node;
}
