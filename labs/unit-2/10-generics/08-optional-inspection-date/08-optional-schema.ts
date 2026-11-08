/**
 * Make Mini-Zod Generic in three steps. Run each test file with pnpm check:lab.
 *
 * 1. Make Schema generic: 08-1-schema.spec.ts
 *    Keep the parse input unknown, preserve the chosen output type and default
 *    the output to unknown when no type argument is given.
 * 2. Type the factories: 08-2-factories.spec.ts
 *    Update the return types of string, number, boolean and date. Keep their
 *    existing runtime validation and conversion bodies unchanged.
 * 3. Implement generic optional: 08-3-optional.spec.ts
 *    Accept undefined and otherwise delegate to the wrapped parser. Preserve
 *    its output type and add undefined, inferring the type from the schema.
 *
 * The Unit 1 runtime solution and a date parser are supplied below.
 * Keep Shape and z.object unchanged from Unit 1. Object parse results remain
 * unknown; inferring their individual properties is a later topic.
 */
// TODO 1: Add an output type parameter (defaulting to unknown) and use it below.
export interface Schema {
  parse(value: unknown): unknown;
}

export type Shape = Record<string, Schema>;

// TODO 2: Preserve the output types of string, number, boolean and date.
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

  // Supplied date parser for the optional-schema exercise.
  date(): Schema {
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

// TODO 3: Make optional generic, preserve the output type, and accept undefined.
export function optional(schema: Schema): Schema {
  return {
    parse(value) {
      // TODO: Accept undefined and delegate other values to schema.
      throw new Error("Implement optional");
    },
  };
}
