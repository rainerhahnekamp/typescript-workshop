// A callable signature combined with an object containing the methods.
export type WritableSignal = (() => number) & {
  set(value: number): void;
  update(updater: (current: number) => number): void;
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
