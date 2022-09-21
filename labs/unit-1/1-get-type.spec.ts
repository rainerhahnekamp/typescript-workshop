import { describe, expect, it } from "@jest/globals";
import { getType } from "./1-get-type";

describe("getType", () => {
  it("should get Date", () => {
    expect(getType(new Date())).toBe("Date");
  });
  it("should get Array", () => {
    expect(getType([])).toBe("Array");
  });
  it("should get string", () => {
    expect(getType("")).toBe("string");
  });
  it("should get number", () => {
    expect(getType(1)).toBe("number");
    expect(getType(1n)).toBe("number");
  });
});
