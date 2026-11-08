import { Spy, spy } from "./07-spy";
import { describe, expect, it } from "vitest";

describe("mocking tests", () => {
  it("should compile", () => {
    let a = 1;
    const incrementer = () => a++;
    type Adder = typeof incrementer;

    function spyCheck(spiedAdder: Spy<Adder, ReturnType<Adder>>) {
      spiedAdder.answer(1);
      // @ts-expect-error
      spiedAdder.answer("hello"); // should fail
    }
  });

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
