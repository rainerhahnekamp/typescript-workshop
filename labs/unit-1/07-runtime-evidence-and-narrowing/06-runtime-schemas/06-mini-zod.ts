// Implement a minimal runtime schema library. The public types are supplied.
export interface Schema {
  parse(value: unknown): unknown;
}

export type Shape = Record<string, Schema>;

export const z = {
  string(): Schema {
    return {
      parse: (value) => {
        if (typeof value === "string") {
          return value;
        }

        throw new TypeError();
      },
    };
  },

  number(): Schema {
    return {
      parse: (value) => {
        if (typeof value === "number" && Number.isFinite(value)) {
          return value;
        }

        throw new TypeError();
      },
    };
  },

  boolean(): Schema {
    return {
      parse: (value) => {
        if (typeof value === "boolean") {
          return value;
        }

        throw new TypeError();
      },
    };
  },

  object(shape: Shape): Schema {
    return {
      parse: (value) => {
        const isObject =
          typeof value === "object" && value !== null && !Array.isArray(value);
        if (!isObject) {
          throw new TypeError();
        }

        const object = value as Record<string, unknown>;

        return [...Object.entries(shape)].reduce(
          (prev, [key, { parse }]) => ({
            ...prev,
            [key]: parse(object[key]),
          }),
          {},
        );
      },
    };
  },
};
