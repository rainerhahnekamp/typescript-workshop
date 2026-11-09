export type Car = {
  brand: string;
  mileage: number;
  price?: {
    value: number;
    currency: string;
  };
};

export function update(car: Car, change: (draft: Car) => void): Car {
  const clone = { ...car };
  let hasChanged = false;

  const draft = new Proxy(car, {
    set(target, name, value) {
      const descriptor = Reflect.getOwnPropertyDescriptor(target, name);
      if (descriptor) {
        const { writable, set } = descriptor;
        if (!writable && set === undefined) {
          throw new TypeError();
        }
      }

      const existingValue = Reflect.get(clone, name);
      if (Object.is(existingValue, value)) {
        return true;
      }

      Reflect.set(clone, name, value);
      hasChanged = true;
      return true;
    },
    get(target, name) {
      return Reflect.get(clone, name);
    },
  });

  change(draft);

  return hasChanged ? clone : car;
}