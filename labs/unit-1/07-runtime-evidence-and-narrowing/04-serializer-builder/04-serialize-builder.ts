export function createSerializers() {
  const serializers: Record<string, (value: unknown) => string> = {};

  function registerSerializer(type: string, fn: (value: unknown) => string) {
    serializers[type] = fn;
  }

  function serialize(value: unknown) {
    return serializers[typeof value]?.(value) ?? "";
  }

  return { registerSerializer, serialize };
}

function numberSerializer(value: number) {
  return value.toFixed(2);
}

const { registerSerializer, serialize } = createSerializers();

registerSerializer("number", numberSerializer);
