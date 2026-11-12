type EventArgs<Payload> = [Payload, void] extends [void, Payload]
  ? []
  : [payload: Payload];

type EventCreator<Type extends string, Payload> = ((
  ...args: EventArgs<Payload>
) => { type: Type; payload: Payload }) & { readonly type: Type };

type EventCreators<Source extends string, Events extends Record<string, unknown>> = {
  readonly [Name in keyof Events & (string | number)]: EventCreator<
    `[${Source}] ${Name}`,
    Events[Name]
  >;
};

export type EventFromGroup<
  Group extends Record<string, (...args: never[]) => unknown>,
> = ReturnType<Group[keyof Group]>;

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
