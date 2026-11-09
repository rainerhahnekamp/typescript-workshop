import type {
  FixtureFactories,
  FixtureName,
  Fixtures,
  FixtureTest,
} from "../_shared/fixture-types";

export function createLazyFixtures(
  factories: FixtureFactories,
): Fixtures {
  const names: FixtureName[] = ["page", "request", "session"];
  const cache = {};
  const values = {};

  for (const name of names) {
    Object.defineProperty(values, name, {
      get() {
        if (!Reflect.get(cache, name)) {
          const value = factories[name]();
          Reflect.set(cache, name, value);
        }

        return Reflect.get(cache, name);
      },
    });
  }
  return values as Fixtures;
}

export function runWithGetters(
  factories: FixtureFactories,
  test: FixtureTest,
) {
  return test(createLazyFixtures(factories));
}