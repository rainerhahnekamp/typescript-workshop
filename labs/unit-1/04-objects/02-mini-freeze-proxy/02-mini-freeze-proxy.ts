export type Car = {
  speed: number;
  engine: { horsepower: number };
  [key: symbol]: unknown;
};

export function freeze(object: Car): Car {
  return new Proxy(object, {
    set() {
      throw new TypeError();
    },
    defineProperty() {
      throw new TypeError();
    },
  });
}