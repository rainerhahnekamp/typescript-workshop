import { describe, expect, expectTypeOf, it } from "vitest";
import { dateText } from "./03-static-date-format";

describe("dateText", () => {
  it("accepts the format and preserves the exact literal type", () => {
    const result = dateText("2024-04-14");
    expect(result).toBe("2024-04-14");
    expectTypeOf(result).toEqualTypeOf<"2024-04-14">();

    // This has the right shape. Calendar validation is a separate step.
    dateText("2024-02-30");
  });

  it("rejects malformed literals and dynamic strings at compile time", () => {
    if (false) {
      const dynamic: string = "2024-04-14";
      // @ts-expect-error: month and day must have two digits
      dateText("2024-4-1");
      // @ts-expect-error: year must have four digits
      dateText("24-04-14");
      // @ts-expect-error: only digits and hyphen separators are allowed
      dateText("202x-04-14");
      // @ts-expect-error: this exercise checks the shape at compile time
      dateText(dynamic);
    }
  });
});
