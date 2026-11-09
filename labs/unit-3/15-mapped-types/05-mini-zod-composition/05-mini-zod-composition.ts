import { z, type Shape } from "./05-mini-zod";

// TODO: Preserve the concrete shape returned by the definition.
export function defineSchema(definition: (builder: typeof z) => Shape) {
  const schema = z.object(definition(z));
  return [schema.parse, z.array(schema).parse] as const;
}

export const [parseVehicle, parseVehicles] = defineSchema((z) => ({
  vin: z.string(),
  producedAt: z.date(),
  inspections: z.array(z.boolean()),
}));

export type Vehicle = ReturnType<typeof parseVehicle>;
