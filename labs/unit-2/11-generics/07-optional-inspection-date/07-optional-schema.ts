/**
 * Make Mini-Zod Generic in three steps. Run each test file with pnpm check:lab.
 *
 * 1. Make Schema generic: 07-1-schema.spec.ts
 *    Keep the parse input unknown, preserve the chosen output type and default
 *    the output to unknown when no type argument is given.
 * 2. Type the factories: 07-2-factories.spec.ts
 *    Update the return types of string, number, boolean and date. Keep their
 *    existing runtime validation and conversion bodies unchanged.
 * 3. Implement generic optional: 07-3-optional.spec.ts
 *    Accept undefined and otherwise delegate to the wrapped parser. Preserve
 *    its output type and add undefined, inferring the type from the schema.
 *
 * The Unit 1 runtime solution and a date parser are supplied below.
 * Keep Shape and z.object unchanged from Unit 1. Object parse results remain
 * unknown; inferring their individual properties is a later topic.
 */
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

  // Supplied date parser for the optional-schema exercise.
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

  // Unchanged Unit 1 object parser. Its output remains unknown.
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
