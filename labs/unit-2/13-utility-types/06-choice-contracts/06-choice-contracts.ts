// The runtime behavior is complete. Repair the generic signature so only
// availableModes contributes inference candidates for Mode.
export function configureDriveModes<Mode extends string>(
  availableModes: readonly Mode[],
  defaultMode: Mode,
): { availableModes: readonly Mode[]; defaultMode: Mode } {
  return { availableModes, defaultMode };
}

// The runtime behavior is complete. Repair the signature so the callback
// cannot introduce a state that is missing from states.
export function chooseNextState<State extends string | number>(
  states: readonly State[],
  choose: () => State,
): State {
  return choose();
}

// Supplied comparison: State belongs to the first call. Investigate why
// the returned function already rejects an unsupported callback result.
export function createStateChooser<State extends string>(
  states: readonly State[],
) {
  return (choose: () => State): State => chooseNextState(states, choose);
}
