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
  const draft = { ...car };
  let hasChanged = false;

  for (const name of Reflect.ownKeys(car)) {
    Object.defineProperty(draft, name, {
      set(value) {
        const descriptor = Object.getOwnPropertyDescriptor(car, name);
        if (descriptor) {
          const { writable, set } = descriptor;
          if (!writable && set === undefined) {
            throw new TypeError();
          }
        }

        const existingValue = Reflect.get(clone, name);
        if (Object.is(existingValue, value)) {
          return;
        }

        Reflect.set(clone, name, value);
        hasChanged = true;
      },
      get() {
        return Reflect.get(clone, name);
      },
    });
  }

  change(draft);

  return hasChanged ? draft : car;
}