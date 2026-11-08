import type {
  FixtureFactories,
  FixtureName,
  Fixtures,
  FixtureTest,
} from "../_shared/fixture-types";

export function createLazyFixtures(
  factories: FixtureFactories,
): Fixtures {
  const values = {} as Fixtures;
  const names: FixtureName[] = ["page", "request", "session"];
  for (const name of names) {
    let initialized = false;
    let value: unknown;
    Object.defineProperty(values, name, {
      enumerable: true,
      get() {
        if (!initialized) {
          value = factories[name]();
          initialized = true;
        }
        return value;
      },
    });
  }
  return values;
}

export function runWithGetters(
  factories: FixtureFactories,
  test: FixtureTest,
): unknown {
  return test(createLazyFixtures(factories));
}