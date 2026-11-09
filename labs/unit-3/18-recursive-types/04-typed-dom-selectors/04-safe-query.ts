type QueryRoot = {
  querySelector(selector: string): Element | null;
};

type LastSegment<Text extends string> = Text extends `${string} ${infer Rest}`
  ? LastSegment<Rest>
  : Text;
type StripAttribute<Text extends string> = Text extends `${infer Tag}[${string}`
  ? Tag
  : Text;
type StripClass<Text extends string> = Text extends `${infer Tag}.${string}`
  ? Tag
  : Text;
type TagName<Text extends string> = StripClass<StripAttribute<Text>>;
type SelectedElement<Selector extends string> = string extends Selector
  ? Element
  : Selector extends `${string}${"," | ">" | "+" | "~"}${string}`
    ? Element
    : Selector extends `${string}[${string} ${string}`
      ? Element
      : TagName<LastSegment<Selector>> extends keyof HTMLElementTagNameMap
        ? HTMLElementTagNameMap[TagName<LastSegment<Selector>>]
        : Element;

export function safeQuery<Selector extends string>(
  selector: Selector,
  root: QueryRoot = document,
): SelectedElement<Selector> | null {
  return root.querySelector(selector) as SelectedElement<Selector> | null;
}
