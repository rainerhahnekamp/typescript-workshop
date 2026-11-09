type QueryRoot = {
  querySelector(selector: string): Element | null;
};

// TODO: Infer the last tag for the supported selector patterns and look it
// up in HTMLElementTagNameMap. Use Element for selectors outside the subset.
type SelectedElement<Selector extends string> = Element;

export function safeQuery<Selector extends string>(
  selector: Selector,
  root: QueryRoot = document,
): SelectedElement<Selector> | null {
  return root.querySelector(selector) as SelectedElement<Selector> | null;
}
