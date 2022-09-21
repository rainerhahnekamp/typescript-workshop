export function isType(
  value: unknown,
  type: "string" | "date" | "array" | "record"
): boolean {
  switch (type) {
    case "string":
      return typeof value === "string";
    case "date":
      return value instanceof Date;
    case "array":
      return Array.isArray(value);
    case "record":
      return (
        typeof value === "object" &&
        value !== null &&
        Object.keys(value).length > 0
      );
    default:
      const exhaustCheck: never = type;
      return false;
  }
}
