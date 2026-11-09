export const ROUTES = {
  vehicles: { path: "/vehicles", access: "authenticated" },
  health: { path: "/health", access: "public" },
} as const;

export type RouteName = keyof typeof ROUTES;
export type Route = (typeof ROUTES)[RouteName];
export type RoutePath = Route["path"];

export function getRoute(name: RouteName): Route {
  return ROUTES[name];
}

export function pathFor(name: RouteName): RoutePath {
  return getRoute(name).path;
}
