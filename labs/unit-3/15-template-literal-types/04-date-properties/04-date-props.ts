import { parseISO } from "date-fns";

export type DateProps<T> = {
  [Key in keyof T]: Key extends `${string}date` | `${string}Date`
    ? Date
    : T[Key];
};

export function mapDateProperties<T extends object>(object: T): DateProps<T> {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [
      key,
      /(?:date|Date)$/.test(key) ? parseISO(String(value)) : value,
    ]),
  ) as DateProps<T>;
}
