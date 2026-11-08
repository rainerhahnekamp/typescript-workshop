import { beforeEach, describe, expect, it } from "vitest";
import { state, view } from "./02-dashboard";

beforeEach(() => {
  state.selected.length = 0;
  state.status = "ready";
  view.columns.splice(0, view.columns.length, "vin", "mileage");
  view.sort[0] = "mileage";
  view.sort[1] = "desc";
});

describe("dashboard configuration", () => {
  it("preserves the initial application values", () => {
    expect(state).toEqual({ selected: [], status: "ready" });
    expect(view.title).toBe("Fleet");
    expect(view.columns).toEqual(["vin", "mileage"]);
    expect(view.sort).toEqual(["mileage", "desc"]);
  });

  it("records the VINs received by the selection callback", () => {
    view.onSelect("JT-42");
    view.onSelect("EV-1");
    expect(state.selected).toEqual(["JT-42", "EV-1"]);
  });

  it("keeps columns, sort order and application state mutable", () => {
    view.columns.push("vin");
    view.sort[0] = "vin";
    view.sort[1] = "asc";
    state.status = "loading";
    expect(view.columns).toEqual(["vin", "mileage", "vin"]);
    expect(view.sort).toEqual(["vin", "asc"]);
    expect(state.status).toBe("loading");
  });
});
