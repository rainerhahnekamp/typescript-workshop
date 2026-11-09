// Supplied generic Signal. Keep its behavior and brand; repair its variance.
const SIGNAL: unique symbol = Symbol("workshop.signal");
type SignalNode<T> = { value: T };

export type Signal<T> = (() => T) & { readonly [SIGNAL]: SignalNode<T> };
export type WritableSignal<T> = Signal<T> & {
  set: (value: T) => void;
  update: (updater: (current: T) => T) => void;
  asReadonly(): Signal<T>;
};

export function createSignal<T>(initial: T): WritableSignal<T> {
  const node: SignalNode<T> = { value: initial };
  const read = Object.assign(() => node.value, { [SIGNAL]: node });
  return Object.assign(read, {
    asReadonly: () => Object.assign(() => node.value, { [SIGNAL]: node }),
    set: (value: T) => {
      node.value = value;
    },
    update: (updater: (current: T) => T) => {
      node.value = updater(node.value);
    },
  });
}
