export function getProperties(
  object: Record<string, Object>,
  types: string[] | string = [],
  filterPrimitives = false
): [string, string][] {
  types = Array.isArray(types) ? types : [types];
  const returner: [string, string][] = [];
  const keys = Object.keys(object);
  for (let key of keys) {
    const value = object[key];
    const type = typeof value;
    if (filterPrimitives) {
      if (type !== "object") {
        returner.push([key, object[key].toString()]);
      }
    } else {
      if (types.length === 0 || types.includes(type)) {
        returner.push([key, object[key].toString()]);
      }
    }
  }

  return returner;
}
