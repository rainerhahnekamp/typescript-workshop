import { describe, expectTypeOf, test } from "vitest";
import {
  type Column,
  type Direction,
  type Status,
  type ViewConfig,
  registerView,
  state,
  view,
} from "./02-dashboard";

describe("dashboard", () => {
  test("the configuration keeps its useful inferred shape", () => {
    expectTypeOf(view).toExtend<ViewConfig>();
    expectTypeOf(view.title).toEqualTypeOf<string>();
    expectTypeOf(view.columns).toEqualTypeOf<Column[]>();
    expectTypeOf(view.sort).toEqualTypeOf<[Column, Direction]>();
    expectTypeOf(view.onSelect).toEqualTypeOf<(vin: string) => void>();
    expectTypeOf(state.selected).toEqualTypeOf<string[]>();
    expectTypeOf(state.status).toEqualTypeOf<Status>();
  });

  test("valid edits remain available through the concrete configuration", () => {
    registerView(view);
    view.title.toUpperCase();
    view.columns.push("vin", "mileage");
    view.sort[0] = "vin";
    view.sort[1] = "asc";
    state.status = "loading";
    state.status = "error";
    state.selected.push("JT-42");
    view.onSelect("EV-1");
  });

  test("invalid edits are rejected rather than widened away", () => {
    // @ts-expect-error Internal fields are not display columns.
    view.columns.push("purchasePrice");
    // @ts-expect-error The second tuple position is a direction.
    view.sort[1] = "up";
    // @ts-expect-error The first tuple position is a column.
    view.sort[0] = "desc";
    // @ts-expect-error The tuple has exactly two positions.
    view.sort[2] = "vin";
    // @ts-expect-error Status is a closed set of application states.
    state.status = "broken";
    // @ts-expect-error Selected VINs are strings.
    state.selected.push(42);
    // @ts-expect-error Selection callbacks receive a VIN string.
    view.onSelect(42);
  });

  test("the supplied API still accepts readonly configurations", () => {
    const columns: readonly Column[] = ["vin"];
    const sort: readonly [Column, Direction] = ["vin", "asc"];
    registerView({ columns, sort, onSelect: vin => vin.toUpperCase() });
  });
});
