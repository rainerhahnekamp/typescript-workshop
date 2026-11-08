import { defineConfig } from "vitest/config";

const directory =
  "labs/unit-1/08-api-contracts-and-testing/02-write-type-tests";

export default defineConfig({
  test: {
    include: [],
    typecheck: {
      enabled: true,
      include: [`${directory}/*.test-d.ts`],
      tsconfig: `${directory}/tsconfig.type-tests.json`,
    },
  },
});
