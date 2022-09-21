import { describe, it, test } from "@jest/globals";
import { isEqual } from "date-fns";
import { Assert, IsType } from "../../util/test-types";
import {
  FirstParameter,
  MyParameters,
  MyReturnType,
  Expect,
  AreEqual,
  Not,
} from "./1-conditional-utility-types";

describe("utility types via conditional types", () => {
  it("should test MyReturnType", () => {
    type T0 = Assert<IsType<MyReturnType<number>, never>>;

    type T1 = Assert<IsType<MyReturnType<() => number>, number>>;
    type T2 = Assert<IsType<MyReturnType<() => Date>, Date>>;
    type T3 = Assert<IsType<MyReturnType<(a: number) => number>, number>>;
    type T4 = Assert<
      IsType<MyReturnType<(a: number, b: string) => void>, void>
    >;
  });

  it("should test MyParameters", () => {
    type T0 = Assert<IsType<MyParameters<number>, never>>;
    type T1 = Assert<IsType<MyParameters<() => number>, []>>;
    type T2 = Assert<
      IsType<MyParameters<(date: Date, word: string) => Date>, [Date, string]>
    >;
    type T3 = Assert<IsType<MyParameters<(a: number) => number>, [number]>>;
  });

  it("should test FirstParameter", () => {
    type T0 = Assert<IsType<FirstParameter<number>, never>>;
    type T1 = Assert<IsType<FirstParameter<() => number>, undefined>>;
    type T2 = Assert<
      IsType<FirstParameter<(date: Date, word: string) => Date>, Date>
    >;
    type T3 = Assert<IsType<FirstParameter<(a: number) => number>, number>>;
  });

  test("Expect should only allow true", () => {
    // @ts-expect-error
    type T1 = Expect<1>;
    // @ts-expect-error
    type T2 = Expect<boolean>;
    // @ts-expect-error
    type T3 = Expect<"">;
    // @ts-expect-error
    type T4 = Expect<{}>;

    type T5 = Expect<true>;
  });
  it("AreEqual should be true if both types are the same", () => {
    type T0 = Assert<IsType<AreEqual<5, 1>, false>>;
    type T1 = Assert<IsType<AreEqual<1, 1>, true>>;
    type T2 = Assert<IsType<AreEqual<number, string>, false>>;
    type T3 = Assert<IsType<AreEqual<"hi", string>, false>>;

    type T4 = Assert<IsType<AreEqual<{ id: number }, { id: string }>, false>>;
    type T5 = Assert<IsType<AreEqual<{ id: number }, { id: number }>, true>>;
    type T6 = Assert<
      IsType<AreEqual<{ id: number }, { id: number; a: string }>, false>
    >;
  });
  it("Not accepts a boolean and negates", () => {
    type T0 = Assert<IsType<Not<true>, false>>;
    type T1 = Assert<IsType<Not<false>, true>>;

    // @ts-expect-error
    type T2 = Not<string>;
  });
});
