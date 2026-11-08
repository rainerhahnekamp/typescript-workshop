const modelOptions = {
  expectedInputs: [{ type: "text", languages: ["en"] }],
  expectedOutputs: [{ type: "text", languages: ["en"] }],
  initialPrompts: [
    {
      role: "system",
      content: "Answer with one concise sentence about the supplied vehicle.",
    },
  ],
} as const satisfies LanguageModelCreateOptions;

export async function getPromptApiAvailability(): Promise<LanguageModelAvailability> {
  if (typeof LanguageModel === "undefined") return "unavailable";
  return LanguageModel.availability(modelOptions);
}

export async function promptVehicle(
  description: string,
  signal?: AbortSignal,
): Promise<string> {
  if (typeof LanguageModel === "undefined") {
    throw new Error("The browser does not provide the Prompt API");
  }

  const availability = await LanguageModel.availability(modelOptions);
  if (availability === "unavailable") {
    throw new Error("The language model is unavailable");
  }

  const session = await LanguageModel.create({
    ...modelOptions,
    signal,
    monitor(monitor) {
      monitor.addEventListener("downloadprogress", (event) => {
        void event.loaded;
      });
    },
  });

  try {
    return await session.prompt(description, { signal });
  } finally {
    session.destroy();
  }
}

export async function streamVehiclePrompt(
  description: string,
  signal?: AbortSignal,
): Promise<ReadableStream<string>> {
  if (typeof LanguageModel === "undefined") {
    throw new Error("The browser does not provide the Prompt API");
  }

  const session = await LanguageModel.create({ ...modelOptions, signal });
  return session.promptStreaming(description, { signal });
}
