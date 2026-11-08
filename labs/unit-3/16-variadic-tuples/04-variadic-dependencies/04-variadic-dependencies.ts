export type Dependency<Value> = (value: Value) => unknown | Promise<unknown>;

export type DependencyResults<
  Value,
  Dependencies extends readonly Dependency<Value>[],
> = {
  [Index in keyof Dependencies]: Awaited<ReturnType<Dependencies[Index]>>;
};

export async function withDependencies<
  Value,
  const Dependencies extends readonly Dependency<Value>[],
>(
  value: Value,
  ...dependencies: Dependencies
): Promise<[Value, ...DependencyResults<Value, Dependencies>]> {
  const results = await Promise.all(
    dependencies.map((dependency) => dependency(value)),
  );

  // Array methods cannot retain the positional relationship of a generic tuple.
  // The public signature and tests define the checked contract at this boundary.
  return [value, ...results] as unknown as [
    Value,
    ...DependencyResults<Value, Dependencies>,
  ];
}
