export type Column = "vin" | "mileage";
export type Direction = "asc" | "desc";
export type Status = "ready" | "loading" | "error";

export interface ViewConfig {
  columns: readonly Column[];
  sort: readonly [Column, Direction];
  onSelect: (vin: string) => void;
}

// This supplied API only checks the configuration's static contract.
export function registerView(config: ViewConfig): void {}

// Repair the declarations below. Keep the initial values and callback behavior.
export const state = {
  selected: [],
  status: "ready",
};

export const view = {
  title: "Fleet",
  columns: ["vin", "mileage"],
  sort: ["mileage", "desc"],
  onSelect: vin => {
    state.selected.push(vin);
  },
};

registerView(view);
