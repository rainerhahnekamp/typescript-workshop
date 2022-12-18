import { parseISO } from "date-fns";

export function mapDate(object: Record<string, unknown>) {
  const returner: Record<string, unknown> = {};
  for (const property in object) {
    const value = object[property];
    if (Array.isArray(value)) {
      returner[property] = value.map((v) => {
        if (typeof v === "object") {
          return mapDate(v);
        } else {
          return mapDateValue(v, property);
        }
      });
    } else if (isRecord(value)) {
      returner[property] = mapDate(value);
    } else {
      returner[property] = mapDateValue(value, property);
    }
  }

  return returner;
}

function mapDateValue(value: unknown, property: string) {
  if (typeof value === "string" && property.match(/[dD]ates?$/)) {
    return parseISO(value);
  }
  return value;
}

function isRecord(object: unknown): object is Record<string, unknown> {
  return (
    !!object && typeof object === "object" && Object.keys(object).length > 0
  );
}
