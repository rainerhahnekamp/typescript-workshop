import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

const require = createRequire(import.meta.url);

// Compile the selected contract and its imports, rather than unrelated,
// deliberately broken exercises. This also checks assertions inside .spec.ts.
export function checkTypes(
  files,
  project = "tsconfig.json",
  cwd = process.cwd(),
) {
  const configPath = resolve(cwd, project);
  const config = ts.readConfigFile(configPath, ts.sys.readFile);
  if (config.error) return [config.error];
  const parsed = ts.parseJsonConfigFileContent(
    config.config,
    ts.sys,
    dirname(configPath),
  );
  if (parsed.errors.length) return parsed.errors;
  const program = ts.createProgram(
    files.map((file) => resolve(cwd, file)),
    {
      ...parsed.options,
      noEmit: true,
      types: [],
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
    },
  );
  return ts.getPreEmitDiagnostics(program);
}

export function runCheck(args) {
  const files = [];
  const runtimeArgs = [];
  let project = "tsconfig.json";
  let typesOnly = false;
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--project") project = args[++i];
    else if (arg === "--types-only") typesOnly = true;
    else if (arg === "-t" || arg === "--testNamePattern")
      runtimeArgs.push(arg, args[++i]);
    else if (/\.(spec|test-d)\.ts$/.test(arg)) files.push(arg);
    else throw new Error(`Unsupported argument: ${arg}`);
  }
  if (!files.length)
    throw new Error("Provide at least one .spec.ts or .test-d.ts file");
  const diagnostics = checkTypes(files, project);
  if (diagnostics.length) {
    process.stderr.write(
      ts.formatDiagnosticsWithColorAndContext(diagnostics, {
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        getCanonicalFileName: (file) => file,
        getNewLine: () => "\n",
      }),
    );
  } else
    console.log("Type contracts passed (selected files and their imports).");
  const runtimeFiles = files.filter((file) => file.endsWith(".spec.ts"));
  let runtimeStatus = 0;
  if (!typesOnly && runtimeFiles.length) {
    const cli = resolve(
      dirname(require.resolve("vitest/package.json")),
      "vitest.mjs",
    );
    const result = spawnSync(
      process.execPath,
      [cli, "run", ...runtimeFiles, "--no-typecheck", ...runtimeArgs],
      {
        stdio: "inherit",
      },
    );
    if (result.error) throw result.error;
    runtimeStatus = result.status ?? 1;
  }
  return diagnostics.length || runtimeStatus ? 1 : 0;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  process.exitCode = runCheck(process.argv.slice(2));
}
