import { expectTypeOf, test } from "vitest";
import { getRoute, pathFor, type Route, type RouteName, type RoutePath } from "./02-route-catalog";

test("derives the catalog's names, entries and paths", () => {
  expectTypeOf<RouteName>().toEqualTypeOf<"vehicles" | "health">();
  expectTypeOf<Route>().toEqualTypeOf<
    | { readonly path: "/vehicles"; readonly access: "authenticated" }
    | { readonly path: "/health"; readonly access: "public" }
  >();
  expectTypeOf<RoutePath>().toEqualTypeOf<"/vehicles" | "/health">();
});

test("the supplied helpers accept catalog names and expose the derived result types", () => {
  expectTypeOf(getRoute).parameter(0).toEqualTypeOf<RouteName>();
  expectTypeOf(getRoute).returns.toEqualTypeOf<Route>();
  expectTypeOf(pathFor).parameter(0).toEqualTypeOf<RouteName>();
  expectTypeOf(pathFor).returns.toEqualTypeOf<RoutePath>();
  expectTypeOf(getRoute("health")).toEqualTypeOf<Route>();
  expectTypeOf(pathFor("vehicles")).toEqualTypeOf<RoutePath>();

  // @ts-expect-error This key does not exist in the catalog.
  getRoute("settings");
  // @ts-expect-error A URL path is not a catalog key.
  pathFor("/vehicles");
  // @ts-expect-error The type must reject paths not supplied by the catalog.
  const missing: RoutePath = "/missing";
  // @ts-expect-error The entry must keep the catalog's literal access values.
  const entry: Route = { path: "/health", access: "private" };
});
