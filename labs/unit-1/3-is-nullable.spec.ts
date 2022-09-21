import { describe, it } from "@jest/globals";
import { isNullable } from "./3-is-nullable";

describe("isNullable", () => {
  it("should compile with number", () => {
    function foobar(value: number | undefined | null) {
      if (!isNullable(value)) {
        const n: number = value;
      }
    }
  });

  it("should compile with string", () => {
    function foobar(value: string | undefined | null) {
      if (!isNullable(value)) {
        const s: string = value;
      }
    }
  });
});
