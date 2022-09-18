import { spy } from "./spy";
import { describe, it, expect } from "vitest";

describe("mocking tests", () => {
  it("should spy without answer", () => {
    const fn = function foo() {
      return "bar";
    };

    const spiedFn = spy(fn);
    expect(spiedFn()).toBe("bar");
  });

  it("should spy with answer", () => {
    const fn = spy(() => "bar");
    expect(fn()).toBe("bar");
    fn.answer("foo");
    expect(fn()).toBe("foo");
  });
});
