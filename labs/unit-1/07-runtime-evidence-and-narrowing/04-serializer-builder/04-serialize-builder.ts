export function createSerializers() {
  const serializers: Record<string, (value: never) => string> = {};

  function registerSerializer(type: string, fn: (value: never) => string) {
    serializers[type] = fn;
  }

  function serialize(value: unknown) {
    return serializers[typeof value]?.(value as never) ?? "";
  }

  return { registerSerializer, serialize };
}

function numberSerializer(value: number) {
  return value.toFixed(2);
}

const { registerSerializer, serialize } = createSerializers();

registerSerializer("number", numberSerializer);