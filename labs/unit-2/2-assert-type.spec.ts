import { describe, test } from "@jest/globals";
import { assertType } from "./2-assert-type";

test("assertType", () => {
  const input = "this is a string";
  const n: number = assertType<number>(input);

  const t = true;
  const strTrue: string = assertType<string>(t);

  const now: Date = assertType<Date>(undefined);
});
