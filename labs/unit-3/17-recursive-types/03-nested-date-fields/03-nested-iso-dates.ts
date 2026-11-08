type DataRecord = {
  readonly [key: string]: string | number | boolean | null | DataRecord;
};

function parseDate(value: unknown): Date {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new RangeError("Expected a YYYY-MM-DD date string");
  }

  const date = new Date(value);
  if (
    Number.isNaN(date.getTime()) ||
    date.toISOString().slice(0, 10) !== value
  ) {
    throw new RangeError(`Invalid calendar date: ${value}`);
  }
  return date;
}

// TODO: Match keys ending in date or Date and recurse into nested records.
export type ParsedDates<Input> = Input;

function convertRecord(input: DataRecord): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => [
      key,
      /(?:date|Date)$/.test(key)
        ? parseDate(value)
        : value !== null && typeof value === "object"
          ? convertRecord(value)
          : value,
    ]),
  );
}

export function mapIsoDates<Input extends DataRecord>(
  input: Input,
): ParsedDates<Input> {
  return convertRecord(input) as ParsedDates<Input>;
}
