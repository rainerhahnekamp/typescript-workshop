import { Spy, spy } from "./6-spy";
import { describe, it, expect } from "@jest/globals";

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
