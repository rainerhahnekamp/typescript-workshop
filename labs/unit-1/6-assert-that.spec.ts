import { describe, it, expect } from "@jest/globals";
import { assertThat } from "./6-assert-that";

describe("assert that", () => {
  it("should compile", () => {
    assertThat("This is a test").matches(/^[\w\s]+$/);

    assertThat(5).isBetween(4, 6);

    assertThat({ street: "Domgasse", city: "Vienna" }).hasProperties({
      city: "Vienna",
    });
  });

  it("should throw an error", () => {
    expect(() => assertThat("This is a test").matches(/^[\w]+$/)).toThrow();

    expect(() => assertThat(5).isBetween(5, 6)).toThrow();

    expect(() =>
      assertThat({ street: "Domgasse", city: "Vienna" }).hasProperties({
        city: "Wien",
      })
    ).toThrow();
  });

  it("should not compile", () => {
    // @ts-expect-error
    expect(() => assertThat(5).matches(/\d/)).toThrow();
    // @ts-expect-error
    expect(() => assertThat(5).hasProperties({ city: "Wien" })).toThrow();

    // @ts-expect-error
    expect(() => assertThat("foo").isBetween(5, 6)).toThrow();
    // @ts-expect-error
    expect(() => assertThat("foo").hasProperties({ city: "Wien" })).toThrow();

    // @ts-expect-error
    expect(() => assertThat({}).isBetween(5, 6)).toThrow();
    // @ts-expect-error
    expect(() => assertThat({}).matches(/.*/)).toThrow();
  });

  it("should continue", () => {
    expect(1).toBe(1);
  });
});
