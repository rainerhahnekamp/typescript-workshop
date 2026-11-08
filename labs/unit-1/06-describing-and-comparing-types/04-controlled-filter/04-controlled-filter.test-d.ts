import { expectTypeOf, test } from "vitest";
import { configureFilter, type FilterOptions } from "./04-controlled-filter";

test("filters with value require contextually typed callback", () => {
  configureFilter({
    label: "Status",
    value: "ready",
    onChange: (value) => {
      expectTypeOf(value).toEqualTypeOf<string>();
    },
  });
  configureFilter({
    label: "Status",
    value: "",
    onChange: (value) => value.toUpperCase(),
  });
});

test("filters without value require a defaultValue", () => {
  configureFilter({ label: "Status", defaultValue: "ready" });
  configureFilter({
    label: "Status",
    defaultValue: "",
    onChange: (value) => {
      expectTypeOf(value).toEqualTypeOf<string>();
    },
  });
});

test("invalid combinations are rejected at creation and through variables", () => {
  // @ts-expect-error A value requires onChange.
  configureFilter({ label: "Status", value: "ready" });
  // @ts-expect-error Supply either a controlled value or a default value.
  configureFilter({ label: "Status" });
  // @ts-expect-error A callback alone does not select either configuration mode.
  configureFilter({ label: "Status", onChange: (value: string) => {} });
  // @ts-expect-error Controlled and uncontrolled values cannot be combined.
  configureFilter({
    label: "Status",
    value: "ready",
    defaultValue: "delayed",
    onChange: (value: string) => {},
  });
  const conflicting = {
    label: "Status",
    value: "ready",
    defaultValue: "delayed",
    onChange: (value: string) => {},
  };
  // @ts-expect-error Exclusivity must also hold for non-fresh objects.
  configureFilter(conflicting);
  // @ts-expect-error Labels remain required.
  configureFilter({ defaultValue: "ready" });

  configureFilter({
    label: "Status",
    // @ts-expect-error Filter values are strings.
    value: 42,
    onChange: (value: string) => {},
  });
  configureFilter({
    label: "Status",
    value: "ready",
    // @ts-expect-error Change callbacks accept strings, not numbers.
    onChange: (value: number) => {},
  });
  // @ts-expect-error The exported options type must enforce the same contract.
  const invalid: FilterOptions = conflicting;
});
