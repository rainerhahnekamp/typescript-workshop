import { defineConfig } from "vitest/config";

const vehicleRegistry =
  "labs/unit-1/06-describing-and-comparing-types/03-vehicle-registry";

function testProject(
  name: string,
  directories: string[],
  tsconfig: string,
  exclude: string[] = [],
) {
  const runtime = directories.map(directory => `${directory}/**/*.spec.ts`);
  return {
    test: {
      name,
      include: runtime,
      exclude,
      globalSetup: "./scripts/vitest-typecheck.mjs",
      typecheck: {
        include: [
          ...runtime,
          ...directories.map(directory => `${directory}/**/*.{test-d,type-tests}.ts`),
        ],
        exclude,
        tsconfig,
      },
    },
  };
}

export default defineConfig({
  plugins: [{
    name: "workshop-typecheck-options",
    config({ test }) {
      // Vitest does not forward the CLI's typecheck flags to test projects.
      for (const project of test?.projects ?? []) {
        if (
          typeof project === "object" &&
          "test" in project &&
          project.test?.typecheck
        ) {
          Object.assign(project.test.typecheck, test?.typecheck);
        }
      }
    },
  }],
  test: {
    typecheck: { enabled: true },
    projects: [
      testProject("exercises", ["labs/unit-*", "labs/bonus-*"], "tsconfig.json", [
        `${vehicleRegistry}/**`,
      ]),
      testProject(
        "vehicle-registry",
        [vehicleRegistry],
        `${vehicleRegistry}/tsconfig.vehicle-registry.json`,
      ),
      testProject("woven", ["labs/woven"], "tsconfig.woven.json"),
    ],
  },
});
