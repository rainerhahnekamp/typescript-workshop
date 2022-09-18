import { describe, it, expect } from "vitest";
import { assertThat } from "./assert-that";

describe("assert that", () => {
  it("should compile", () => {
    assertThat("This is a test").matches(/^[\w\s]+$/);

    assertThat(5).isBetween(4, 6);

    assertThat({ street: "Domgasse", city: "Vienna" }).hasProperties({
      city: "Vienna",
    });
  });

  it("should throw an error", () => {
    expect(() => assertThat("This is a test").matches(/^[\w]+$/)).throws();

    expect(() => assertThat(5).isBetween(5, 6)).throws();

    expect(() =>
      assertThat({ street: "Domgasse", city: "Vienna" }).hasProperties({
        city: "Wien",
      })
    ).throws();
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
