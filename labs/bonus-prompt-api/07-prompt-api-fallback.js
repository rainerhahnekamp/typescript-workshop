class WorkshopLanguageModel extends EventTarget {
  #destroyed = false;

  async prompt(input) {
    if (this.#destroyed) throw new Error("The session was destroyed");
    const text =
      typeof input === "string"
        ? input
        : input.map((message) => message.content).join(" ");
    return `[workshop fallback] ${text}`;
  }

  promptStreaming(input) {
    const text = typeof input === "string" ? input : "streamed prompt";
    return new ReadableStream({
      start(controller) {
        controller.enqueue("[workshop fallback] ");
        controller.enqueue(text);
        controller.close();
      },
    });
  }

  destroy() {
    this.#destroyed = true;
  }
}

function installPromptApiFallback() {
  Object.defineProperty(globalThis, "LanguageModel", {
    configurable: true,
    value: {
      async availability() {
        return "available";
      },
      async create(options = {}) {
        options.monitor?.(new EventTarget());
        return new WorkshopLanguageModel();
      },
    },
  });
}

module.exports = { installPromptApiFallback };
