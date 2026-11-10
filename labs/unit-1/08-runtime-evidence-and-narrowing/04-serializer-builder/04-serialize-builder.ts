export function createSerializers() {
  const serializers: Record<string, (value: never) => string> = {};

  function registerSerializer(type: string, fn: (value: never) => string) {
    serializers[type] = fn;
  }

  return { registerSerializer };
}

function numberSerializer(value: number) {
  return value.toFixed(2);
}

const { registerSerializer } = createSerializers();

registerSerializer("number", numberSerializer);