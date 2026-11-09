// Implement the type. The runtime behavior below is supplied.
export type WritableSignal = (() => number) & {
  set: (next: number) => void;
  update: (updater: (current: number) => number) => void;
};

let value = 0;
export const counter: WritableSignal = Object.assign(() => value, {
  set(next: number): void {
    value = next;
  },
  update(updater: (current: number) => number): void {
    value = updater(value);
  },
});
