import { parseISO } from "date-fns";

export function mapDate(object: Record<string, unknown>) {
  const returner: Record<string, unknown> = {};
  for (const [property, value] of Object.entries(object)) {
    returner[property] = mapDateValue(value, property);
  }

  return returner;
}

function mapDateValue(value: unknown, property: string): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => mapDateValue(item, property));
  }
  if (isRecord(value)) return mapDate(value);
  if (typeof value === "string" && property.match(/[dD]ates?$/)) {
    return parseISO(value);
  }
  return value;
}

function isRecord(object: unknown): object is Record<string, unknown> {
  return (
    object !== null &&
    typeof object === "object" &&
    !Array.isArray(object) &&
    !(object instanceof Date)
  );
}
