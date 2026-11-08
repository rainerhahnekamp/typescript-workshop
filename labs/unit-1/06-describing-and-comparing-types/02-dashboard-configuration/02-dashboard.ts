export type Column = "vin" | "mileage";
export type Direction = "asc" | "desc";
export type Status = "ready" | "loading" | "error";

export interface ViewConfig {
  columns: readonly Column[];
  sort: readonly [Column, Direction];
  onSelect: (vin: string) => void;
}

export function registerView(config: ViewConfig): void {}

export const state: { selected: string[]; status: Status } = {
  selected: [],
  status: "ready",
};

const sort: [Column, Direction] = ["mileage", "desc"];

export const view = {
  title: "Fleet",
  columns: ["vin", "mileage"],
  sort,
  onSelect: vin => {
    state.selected.push(vin);
  },
} satisfies ViewConfig & { title: string };

registerView(view);
