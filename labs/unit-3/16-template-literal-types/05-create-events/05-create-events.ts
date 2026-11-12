type EventCreator<Type extends string, Payload> = ((
  ...args: unknown[]
) => { type: Type; payload: Payload }) & { readonly type: Type };

type EventCreators<Source extends string, Events extends Record<string, unknown>> =
  Record<string, EventCreator<string, unknown>>;

export type EventFromGroup<Group> = unknown;

export function type<T>(): T {
  return undefined as T;
}

export function createEvents<
  Source extends string,
  Events extends Record<string, unknown>,
>(config: { source: Source; events: Events }): EventCreators<Source, Events> {
  return Object.fromEntries(
    Object.keys(config.events).map(name => {
      const type = `[${config.source}] ${name}`;
      const creator = (payload?: unknown) => ({ type, payload });
      return [name, Object.assign(creator, { type })];
    }),
  ) as unknown as EventCreators<Source, Events>;
}
