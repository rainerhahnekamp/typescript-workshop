export type FilterOptions = {
  label: string;
} & (
  | { value: string; onChange: (value: string) => void; defaultValue?: never }
  | { defaultValue: string; value?: never; onChange?: (value: string) => void }
);

export function configureFilter(options: FilterOptions): void {}
