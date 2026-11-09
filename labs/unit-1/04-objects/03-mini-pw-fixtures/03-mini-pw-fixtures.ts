import type {
  FixtureFactories,
  Fixtures,
  FixtureTest,
} from "../_shared/fixture-types";

// Create getter-backed fixtures. Do not call a factory until its property is read.
// Cache page and request objects for repeated reads within each fixtures object.
export function createLazyFixtures(factories: FixtureFactories): Fixtures {
  throw new Error("Implement createLazyFixtures");
}

// Supplied runner: synchronous tests return directly; async tests return a promise.
export function runWithGetters(
  factories: FixtureFactories,
  test: FixtureTest,
): unknown {
  return test(createLazyFixtures(factories));
}
