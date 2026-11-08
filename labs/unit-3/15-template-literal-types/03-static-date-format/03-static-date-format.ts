type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

type HasDigits<
  Text extends string,
  Count extends number,
  Seen extends unknown[] = [],
> = Seen["length"] extends Count
  ? Text extends ""
    ? true
    : false
  : Text extends `${Digit}${infer Rest}`
    ? HasDigits<Rest, Count, [...Seen, unknown]>
    : false;

type IsDateText<Value extends string> =
  Value extends `${infer Year}-${infer Month}-${infer Day}`
    ? HasDigits<Year, 4> extends true
      ? HasDigits<Month, 2> extends true
        ? HasDigits<Day, 2>
        : false
      : false
    : false;

export function dateText<Value extends string>(
  value: Value & (IsDateText<Value> extends true ? unknown : never),
): Value {
  return value;
}
