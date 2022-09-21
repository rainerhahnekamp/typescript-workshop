// use never
export function getType(
  value: Date | number | string | unknown[] | bigint
): string {
  if (value instanceof Date) {
    return "Date";
  } else if (Array.isArray(value)) {
    return "Array";
  }

  switch (typeof value) {
    case "string":
      return "string";
    case "number":
    case "bigint":
      return "number";
    default:
      const exhaustCheck: never = value;
      return "";
  }
}
