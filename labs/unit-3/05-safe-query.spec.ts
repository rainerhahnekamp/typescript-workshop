import { describe, it } from "@jest/globals";
import { safeQuery } from "./05-safe-query";

describe("safeQuery", () => {
  it("should do safe queries", () => {
    const input: HTMLInputElement = safeQuery("input");
    const button: HTMLButtonElement = safeQuery("button");

    const intput2: HTMLInputElement = safeQuery("form input");
    const button2: HTMLButtonElement = safeQuery("div.form div.button button");
    const button3: HTMLButtonElement = safeQuery("#container button");

    const unsafe: never = safeQuery("div > p");
    // @ts-expect-error
    const wrongInput: HTMLInputElement = safeQuery("button");
  });
});
