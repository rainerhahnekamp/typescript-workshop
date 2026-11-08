export function freeze(object: object) {
  for (const key of Reflect.ownKeys(object)) {
    Object.defineProperty(object, key, {
      writable: false,
      configurable: false,
    });
  }
}