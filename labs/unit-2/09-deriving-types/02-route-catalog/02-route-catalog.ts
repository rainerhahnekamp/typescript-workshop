export const ROUTES = {
  vehicles: { path: "/vehicles", access: "authenticated" },
  health: { path: "/health", access: "public" },
} as const;

// Derive these types from ROUTES. Keep the catalog and helper bodies unchanged.
export type RouteName = unknown;
export type Route = unknown;
export type RoutePath = unknown;

export function getRoute(name: RouteName): Route {
  return ROUTES[name];
}

export function pathFor(name: RouteName): RoutePath {
  return getRoute(name).path;
}
