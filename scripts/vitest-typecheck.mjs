import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";

// Test discovery and TypeScript project membership are separate in Vitest.
// Compile exactly the selected test files and their dependencies.
export async function setup(project) {
  const { root, typecheck } = project.config;
  if (!typecheck.enabled) return;

  const files = project.vitest.state.getPaths().filter(file =>
    project.vitest.getModuleSpecifications(file).some(spec =>
      spec.project === project && spec.pool === "typescript"
    )
  );
  if (!files.length) return;

  const promptDirectory = resolve(root, "labs/bonus-prompt-api");
  if (files.some(file => dirname(resolve(file)) === promptDirectory)) {
    files.push(join(promptDirectory, "07-prompt-api.d.ts"));
  }

  const directory = await mkdtemp(join(tmpdir(), "workshop-vitest-"));
  const tsconfig = join(directory, "tsconfig.json");
  const cleanUp = () => rm(directory, { recursive: true, force: true });
  try {
    await writeFile(tsconfig, JSON.stringify({
      extends: resolve(root, typecheck.tsconfig),
      compilerOptions: { module: "ESNext", moduleResolution: "Bundler", types: [] },
      files,
      include: [],
    }));
  } catch (error) {
    await cleanUp();
    throw error;
  }
  typecheck.tsconfig = tsconfig;
  // The native typechecker reads watch mode from the individual project.
  project.config.watch = project.vitest.config.watch;
  return cleanUp;
}
