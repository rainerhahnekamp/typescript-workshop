// Add a private symbol brand to Signal.
export type Signal = () => number;

export type WritableSignal = Signal & {
  set(value: number): void;
  update(updater: (current: number) => number): void;
};

export function createSignal(initial: number): WritableSignal {
  throw new Error("Implement createSignal");
}
