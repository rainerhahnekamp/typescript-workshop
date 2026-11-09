import { describe, expectTypeOf, it } from "vitest";
import type {
  HttpClient,
  Injector,
  RouterService,
  Spy,
  UserService,
} from "./05-spy-injector";

describe("Injector", () => {
  it("replaces only the selected dependencies and preserves their order", () => {
    type Dependencies = [HttpClient, UserService, RouterService];
    expectTypeOf<Injector<[HttpClient, RouterService], Dependencies>>()
      .toEqualTypeOf<[Spy<HttpClient>, UserService, Spy<RouterService>]>();
  });

  it("preserves an empty dependency tuple", () => {
    expectTypeOf<Injector<[HttpClient], []>>().toEqualTypeOf<[]>();
  });
});
