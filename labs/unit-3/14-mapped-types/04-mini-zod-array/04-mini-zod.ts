// Includes the completed object parser from Exercise 14.3.
export interface Schema<T = unknown> {
  parse(value: unknown): T;
}

export type Shape = Record<string, Schema>;

export const z = {
  string(): Schema<string> {
    return {
      parse: (value) => {
        if (typeof value === "string") {
          return value;
        }

        throw new TypeError();
      },
    };
  },

  number(): Schema<number> {
    return {
      parse: (value) => {
        if (typeof value === "number" && Number.isFinite(value)) {
          return value;
        }

        throw new TypeError();
      },
    };
  },

  boolean(): Schema<boolean> {
    return {
      parse: (value) => {
        if (typeof value === "boolean") {
          return value;
        }

        throw new TypeError();
      },
    };
  },

  date(): Schema<Date> {
    return {
      parse(value) {
        if (value instanceof Date && !Number.isNaN(value.getTime())) {
          return new Date(value.getTime());
        }
        if (typeof value === "string") {
          const date = new Date(value);
          if (!Number.isNaN(date.getTime())) {
            return date;
          }
        }
        throw new TypeError();
      },
    };
  },

  array(schema: Schema): Schema {
    // TODO: Validate the array, parse each item and preserve the item type.
    throw new Error("Implement z.array");
  },

  object<S extends Shape>(shape: S): ObjectSchema<S> {
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
    } as ObjectSchema<S>;
  },
};

export function optional<T>(schema: Schema<T>): Schema<T | undefined> {
  return {
    parse(value) {
      if (value === undefined) {
        return value;
      }

      return schema.parse(value);
    },
  };
}

type ObjectSchema<S extends Shape> = Schema<{
  [Prop in keyof S]: S[Prop] extends Schema<infer R> ? R : never;
}>;
