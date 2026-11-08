// Implement a minimal runtime schema library. The public types are supplied.
export interface Schema {
  parse(value: unknown): unknown;
}

export type Shape = Record<string, Schema>;

export const z = {
  string(): Schema {
    throw new Error("Implement z.string");
  },

  number(): Schema {
    throw new Error("Implement z.number");
  },

  boolean(): Schema {
    throw new Error("Implement z.boolean");
  },

  object(shape: Shape): Schema {
    throw new Error("Implement z.object");
  },
};
