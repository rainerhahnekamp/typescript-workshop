import { describe, expect, it } from "vitest";
import { getRoute, pathFor, ROUTES } from "./02-route-catalog";

describe("route catalog", () => {
  it("looks up the original catalog entry by its name", () => {
    expect(getRoute("vehicles")).toBe(ROUTES.vehicles);
    expect(getRoute("health")).toBe(ROUTES.health);
  });

  it("uses route names to obtain their URL paths", () => {
    expect(pathFor("vehicles")).toBe("/vehicles");
    expect(pathFor("health")).toBe("/health");
  });
});
