import { describe, expect, it, vi } from "vitest";
import { createLazyFixtures, runWithGetters } from "./04-mini-pw-fixtures";

function factories() {
  return {
    page: vi.fn(() => ({ title: "Cars" })),
    request: vi.fn(() => ({ baseUrl: "/api" })),
    session: vi.fn(() => undefined),
  };
}

describe("getter-backed fixtures", () => {
  it("does not set up unused fixtures", () => {
    const create = factories();
    createLazyFixtures(create);
    expect(create.page).not.toHaveBeenCalled();
    expect(create.request).not.toHaveBeenCalled();
    expect(create.session).not.toHaveBeenCalled();
  });

  it("runs the getter when a parameter is destructured, even if the body ignores it", () => {
    const create = factories();
    let setupBeforeBody = false;
    runWithGetters(create, ({ page }) => {
      setupBeforeBody = create.page.mock.calls.length === 1;
    });
    expect(setupBeforeBody).toBe(true);
    expect(create.page).toHaveBeenCalledTimes(1);
    expect(create.request).not.toHaveBeenCalled();
  });

  it("returns the fixture value and caches its identity", () => {
    const create = factories();
    const values = createLazyFixtures(create);
    const { page } = values;
    expect(page.title).toBe("Cars");
    expect(values.page).toBe(page);
    expect(create.page).toHaveBeenCalledTimes(1);
    expect(create.request).not.toHaveBeenCalled();
  });

  it("creates a fresh cache for each run and returns the test result", () => {
    const create = factories();
    const first = runWithGetters(create, ({ page }) => page);
    const second = runWithGetters(create, ({ page }) => page);
    expect(first).not.toBe(second);
    expect(create.page).toHaveBeenCalledTimes(2);
    expect(runWithGetters(create, ({ request }) => request.baseUrl)).toBe(
      "/api",
    );
  });

  it("propagates setup failures and returns promises from async test bodies", async () => {
    const create = factories();
    const failure = new Error("Cannot create page");
    create.page.mockImplementation(() => {
      throw failure;
    });
    expect(() => runWithGetters(create, ({ page }) => page)).toThrow(failure);
    const value = runWithGetters(factories(), async ({ request }) => {
      await Promise.resolve();
      return request.baseUrl;
    });
    await expect(value).resolves.toBe("/api");
  });
});
