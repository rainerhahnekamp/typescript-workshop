// Supplied types. The exercise is about runtime behavior, not generic typing.
export type PageFixture = { title: string };
export type RequestFixture = { baseUrl: string };
export type SessionFixture = { user: string };

export type Fixtures = {
  page: PageFixture;
  request: RequestFixture;
  session: SessionFixture | undefined;
};
export type FixtureName = "page" | "request" | "session";
export type FixtureTest = (fixtures: Fixtures) => unknown;

export type FixtureFactories = {
  page: () => PageFixture;
  request: () => RequestFixture;
  session: () => SessionFixture | undefined;
};
