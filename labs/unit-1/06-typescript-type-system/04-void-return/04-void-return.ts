export function getMessage(action: () => void): string {
  action();
  return "Done";
}

const message = getMessage(() => 42);
message.toUpperCase();
