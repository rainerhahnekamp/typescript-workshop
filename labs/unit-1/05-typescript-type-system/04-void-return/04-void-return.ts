export function getMessage(action: () => void) {
  return action() ?? "Done";
}

const message = getMessage(() => 42);
message.toUpperCase();
