export function configureDriveModes<Mode extends string>(
  availableModes: readonly Mode[],
  defaultMode: NoInfer<Mode>,
): { availableModes: readonly Mode[]; defaultMode: Mode } {
  return { availableModes, defaultMode };
}

export function chooseNextState<State extends string | number>(
  states: readonly State[],
  choose: () => NoInfer<State>,
): State {
  return choose();
}

export function createStateChooser<State extends string>(
  states: readonly State[],
) {
  return (choose: () => State): State => chooseNextState(states, choose);
}
