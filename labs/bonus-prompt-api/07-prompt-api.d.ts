export {};

declare global {
  type LanguageModelAvailability =
    | "unavailable"
    | "downloadable"
    | "downloading"
    | "available";

  // TODO: Describe the LanguageModel global and the sessions it creates.
  // Use the supplied client and type tests to derive the contract.
}
