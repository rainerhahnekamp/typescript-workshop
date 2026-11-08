import { expectTypeOf, test } from "vitest";
import { configureDriveModes, chooseNextState, createStateChooser } from "./06-choice-contracts";

test("a second argument cannot add a new mode to the inferred union", () => {
  const config = configureDriveModes(["eco", "sport"], "eco");
  expectTypeOf(config.defaultMode).toEqualTypeOf<"eco" | "sport">();
  expectTypeOf(config.availableModes).toEqualTypeOf<readonly ("eco" | "sport")[]>();
  // @ts-expect-error The default must not add snow to the inferred union.
  configureDriveModes(["eco", "sport"], "snow");
  // @ts-expect-error An empty literal list supplies no available mode.
  configureDriveModes([], "eco");
});

test("supports readonly tuples and unrelated mode names", () => {
  const modes = ["city", "highway"] as const;
  const config = configureDriveModes(modes, "highway");
  expectTypeOf(config.defaultMode).toEqualTypeOf<"city" | "highway">();
  // @ts-expect-error The readonly tuple does not contain eco.
  configureDriveModes(modes, "eco");
  const only = configureDriveModes(["manual"], "manual");
  expectTypeOf(only.defaultMode).toEqualTypeOf<"manual">();
});

test("cannot recover literals already widened to string", () => {
  const modes: string[] = ["eco", "sport"];
  const config = configureDriveModes(modes, "snow");
  expectTypeOf(config.defaultMode).toEqualTypeOf<string>();
});

// Supplied baseline: leave this signature unchanged for the comparison.
function select<State extends string | number>(
  states: readonly State[],
  choose: () => State,
): State {
  return choose();
}

test("ordinary inference expands the string union but already rejects the mixed primitive call", () => {
  const expanded = select(["idle", "running"], () => "crashed");
  expectTypeOf(expanded).toEqualTypeOf<"idle" | "running" | "crashed">();
  // @ts-expect-error The original signature already rejects this mixed primitive call.
  select([42], () => "hello");
});

test("the repaired signature rejects additional states and preserves the numeric rejection", () => {
  // @ts-expect-error The callback must not add a state missing from the first argument.
  chooseNextState(["idle", "running"], () => "crashed");
  // @ts-expect-error This call is rejected both before and after the repair.
  chooseNextState([42], () => "hello");
  const numeric = chooseNextState([42, 7], () => 42);
  expectTypeOf(numeric).toEqualTypeOf<42 | 7>();
});

test("a callback return type cannot add a new state to the inferred union", () => {
  const state = chooseNextState(["idle", "running"], () => "running");
  expectTypeOf(state).toEqualTypeOf<"idle" | "running">();
  // @ts-expect-error The callback must not introduce crashed into State.
  chooseNextState(["idle", "running"], () => "crashed");
  const states = ["queued", "done"] as const;
  const readonlyState = chooseNextState(states, () => "done");
  expectTypeOf(readonlyState).toEqualTypeOf<"queued" | "done">();
  const unsupported = (): "failed" => "failed";
  // @ts-expect-error Predefined callbacks must obey the same contract.
  chooseNextState(states, unsupported);
});

test("currying fixes State before the callback is supplied", () => {
  const choose = createStateChooser(["idle", "running"]);
  expectTypeOf(choose(() => "running")).toEqualTypeOf<"idle" | "running">();
  expectTypeOf(choose).parameter(0).returns.toEqualTypeOf<"idle" | "running">();
  // @ts-expect-error The first call has already fixed State.
  choose(() => "crashed");
  const chooseDelivery = createStateChooser(["queued", "done"] as const);
  expectTypeOf(chooseDelivery(() => "done")).toEqualTypeOf<"queued" | "done">();
  // @ts-expect-error A curried chooser also rejects an unrelated state.
  chooseDelivery(() => "running");
});

test("the helpers cannot recover a union already widened to string", () => {
  const states: string[] = ["idle", "running"];
  expectTypeOf(chooseNextState(states, () => "crashed")).toEqualTypeOf<string>();
  expectTypeOf(createStateChooser(states)(() => "crashed")).toEqualTypeOf<string>();
});
