import { it } from "vitest";

it("declares the text Prompt API contract", () => {
  const availability = LanguageModel.availability({
    expectedInputs: [{ type: "text", languages: ["en", "ja"] }],
    expectedOutputs: [{ type: "text", languages: ["en"] }],
  });

  const checkedAvailability: Promise<LanguageModelAvailability> = availability;
  void checkedAvailability;

  void LanguageModel.create({
    initialPrompts: [
      { role: "system", content: "Answer briefly" },
      { role: "assistant", content: "Ready", prefix: true },
    ],
  });

  // @ts-expect-error The workshop subset supports text output only.
  void LanguageModel.create({ expectedOutputs: [{ type: "image" }] });

  void LanguageModel.create({
    initialPrompts: [
      // @ts-expect-error Only assistant messages may prefill a response.
      { role: "user", content: "Hello", prefix: true },
    ],
  });

  async function inspectSession() {
    const session = await LanguageModel.create();
    const result: Promise<string> = session.prompt("Describe this vehicle");
    const stream: ReadableStream<string> = session.promptStreaming(
      "Describe this vehicle",
    );

    // @ts-expect-error Prompt input must be text or a typed message list.
    void session.prompt({ content: "missing role" });

    void result;
    void stream;
  }

  void inspectSession;
});
