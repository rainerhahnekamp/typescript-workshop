import { expect, test } from "vitest";
import { assertType } from "./03-assert-type";

test("choosing a type does not convert or validate the value", () => {
  const claimedNumber = assertType<number>("this is a string");
  expect(claimedNumber).toBe("this is a string");
  expect(typeof claimedNumber).toBe("string");
  expect(assertType<string>(true)).toBe(true);
  expect(assertType<Date>(undefined)).toBeUndefined();
});

test("returns the original object without copying it", () => {
  const input = { vin: "JT-42" };
  expect(assertType<Date>(input)).toBe(input);
});
