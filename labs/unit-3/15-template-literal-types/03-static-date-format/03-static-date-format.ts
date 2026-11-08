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

// TODO: Split the string and check for exactly four, two, and two digits.
type IsDateText<Value extends string> = boolean;

// TODO: Use IsDateText to constrain the argument and keep its literal type.
export function dateText<Value extends string>(value: Value): Value {
  return value;
}
