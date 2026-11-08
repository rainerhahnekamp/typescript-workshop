import { afterEach, describe, expect, it } from "vitest";
import { installPromptApiFallback } from "./07-prompt-api-fallback.js";
import {
  getPromptApiAvailability,
  promptVehicle,
  streamVehiclePrompt,
} from "./07-prompt-api-client";

afterEach(() => {
  Reflect.deleteProperty(globalThis, "LanguageModel");
});

describe("a declared browser Prompt API", () => {
  it("still requires a runtime availability check", async () => {
    await expect(getPromptApiAvailability()).resolves.toBe("unavailable");
    await expect(promptVehicle("JT-42 is ready")).rejects.toThrow(
      "does not provide the Prompt API",
    );
  });

  it("runs against the deterministic workshop fallback", async () => {
    installPromptApiFallback();

    await expect(getPromptApiAvailability()).resolves.toBe("available");
    await expect(promptVehicle("JT-42 is ready")).resolves.toBe(
      "[workshop fallback] JT-42 is ready",
    );
  });

  it("preserves the ReadableStream contract", async () => {
    installPromptApiFallback();

    const reader = (
      await streamVehiclePrompt("JT-42 is ready")
    ).getReader();
    const chunks: string[] = [];
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    expect(chunks.join("")).toBe("[workshop fallback] JT-42 is ready");
  });
});
