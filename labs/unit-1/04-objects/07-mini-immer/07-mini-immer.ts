export type Car = {
  brand: string;
  mileage: number;
  price?: {
    value: number;
    currency: string;
  };
};

export function update(car: Car, change: (draft: Car) => void): Car {
  let hasChanged = false;
  let clone: Car = { ...car };
  let draft = { ...car };

  const keys = Object.keys(car);
  for (const key of keys) {
    Object.defineProperty(draft, key, {
      set(value) {
        const descriptor = Reflect.getOwnPropertyDescriptor(car, key);
        if (
          descriptor?.writable === false ||
          (descriptor?.get && descriptor?.set === undefined)
        ) {
          throw new Error("Readonly Object");
        }

        if (!Object.is(value, Reflect.get(draft, key))) {
          hasChanged = true;
          Reflect.set(clone, key, value);
        }
      },
      get() {
        return Reflect.get(clone, key);
      },
    });
  }

  change(draft);

  return hasChanged ? clone : car;
}