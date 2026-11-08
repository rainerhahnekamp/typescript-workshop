import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { generateZodSchemas } from "./generate-zod";

describe("TypeScript-to-Zod generation", () => {
  it("turns declarations and adjacent JSDoc constraints into schemas", async () => {
    const file = fileURLToPath(new URL("./vehicle-model.ts", import.meta.url));
    const source = await readFile(file, "utf8");

    const result = generateZodSchemas(file, source);

    expect(result.diagnostics).toEqual([]);
    expect(result.code).toContain('"id": z.number().int().min(1)');
    expect(result.code).toContain('"vin": z.string().min(10).max(17)');
    expect(result.code).toContain('"ownerEmail": z.string().email()');
    expect(result.code).toContain(
      '"inspectionCodes": z.array(z.string()).min(1).max(8)',
    );
    expect(result.code).toContain(
      '"producedAt": z.string().datetime().optional()',
    );
    expect(result.code).toContain('"status": VehicleStatusSchema');
    expect(result.code).toContain('"site": ProductionSiteSchema');
  });

  it("generates enums for string-literal unions", () => {
    const result = generateZodSchemas(
      "status.ts",
      `export type Status = "ready" | "blocked";`,
    );

    expect(result.diagnostics).toEqual([]);
    expect(result.code).toContain(
      'export const StatusSchema = z.enum(["ready", "blocked"]);',
    );
  });

  it("reports unsupported syntax instead of inventing validation", () => {
    const result = generateZodSchemas(
      "generic.ts",
      `export interface Page<Item> { items: Item[] }`,
    );

    expect(result.diagnostics[0]?.message).toBe(
      "Generic interface Page is not supported",
    );
    expect(result.code).not.toContain("PageSchema");
  });

  it("reports JSDoc tags used on incompatible property types", () => {
    const result = generateZodSchemas(
      "wrong-tag.ts",
      `interface Example { /** @format email */ count: number }`,
    );

    expect(result.diagnostics[0]?.message).toBe(
      "@format does not apply to TSNumberKeyword",
    );
  });
});
