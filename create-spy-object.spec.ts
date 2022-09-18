import { describe, it, expect } from "vitest";
import { createSpyObject } from "./create-spy-object";

class HttpClient {
  get(url: string): string {
    return "success";
  }
}

describe("Spy Object", () => {
  it("should create a spy object", () => {
    const spy = createSpyObject(HttpClient);
    spy.get.answer("foobar");
    expect(spy.get()).toBe("foobar");
  });
});
