export {};

declare global {
  type LanguageModelAvailability =
    "unavailable" | "downloadable" | "downloading" | "available";

  type LanguageModelMessage =
    | {
        role: "system" | "user";
        content: string;
      }
    | {
        role: "assistant";
        content: string;
        prefix?: boolean;
      };

  interface LanguageModelExpected {
    type: "text";
    languages?: readonly string[];
  }

  interface LanguageModelCreateMonitor extends EventTarget {
    addEventListener(
      type: "downloadprogress",
      listener: (event: ProgressEvent) => void,
    ): void;
  }

  interface LanguageModelCreateOptions {
    expectedInputs?: readonly LanguageModelExpected[];
    expectedOutputs?: readonly LanguageModelExpected[];
    initialPrompts?: readonly LanguageModelMessage[];
    signal?: AbortSignal;
    monitor?: (monitor: LanguageModelCreateMonitor) => void;
  }

  interface LanguageModelPromptOptions {
    signal?: AbortSignal;
  }

  interface LanguageModel extends EventTarget {
    prompt(
      input: string | readonly LanguageModelMessage[],
      options?: LanguageModelPromptOptions,
    ): Promise<string>;
    promptStreaming(
      input: string | readonly LanguageModelMessage[],
      options?: LanguageModelPromptOptions,
    ): ReadableStream<string>;
    destroy(): void;
  }

  interface LanguageModelStatic {
    availability(
      options?: LanguageModelCreateOptions,
    ): Promise<LanguageModelAvailability>;
    create(options?: LanguageModelCreateOptions): Promise<LanguageModel>;
  }

  const LanguageModel: LanguageModelStatic;
}
