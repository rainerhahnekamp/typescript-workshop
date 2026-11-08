export type Car = {
  brand: string;
  mileage: number;
  price?: {
    value: number;
    currency: string;
  };
};

export function update(car: Car, change: (draft: Car) => void): Car {
  const copy: Car = { ...car };
  let hasChanged = false;
  const draft = new Proxy(copy, {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value) {
      const descriptor = Reflect.getOwnPropertyDescriptor(car, key);
      if (
        descriptor?.writable === false ||
        (descriptor?.get && descriptor.set === undefined)
      ) {
        throw new Error("Readonly Object");
      }
      if (!Object.is(Reflect.get(target, key), value)) {
        Reflect.set(target, key, value);
        hasChanged = true;
      }
      return true;
    },
  });

  change(draft);
  return hasChanged ? copy : car;
}