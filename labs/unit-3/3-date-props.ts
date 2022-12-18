import { mapDate } from "../unit-1/5-map-date";

export type DateProps<Type> = {
  [Property in keyof Type]: Uppercase<
    Property & string
  > extends `${infer P}DATE`
    ? Date
    : Type[Property];
};

export function mapDateProperties<T extends Record<string, unknown>>(
  object: T
): DateProps<T> {
  return mapDate(object) as DateProps<T>;
}
