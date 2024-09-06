class Entity {
  id = 0;
}

class Person extends Entity {
  name = "";
}

interface Db<T> {
  create(): T;

  save(value: T): void;
}

let personDb: Db<Person> = {
  create: () => new Person(),
  save: (value) => void true,
};
let entityDb: Db<Entity> = {
  create: () => new Entity(),
  save: (value) => void true,
};

personDb = entityDb;
entityDb = personDb;

type Car = {
  id: string;
  name: string;
  licencePlate: string;
  constructionDate: string;
  createdDate: string;
  updatedDate: string;
};

type MapDatesType<Type> = {
  [Property in keyof Type]: Property extends `${infer Prefix}Date`
    ? Date
    : Type[Property];
};

const format = (value: string) => `${value} Modified`;

enum Type {
  SOME_VALUE = format("some_value"),
}

type ApplicationCar = MapDatesType<Car>;

declare function mapDate<Type>(value: Type): MapDatesType<Type>;

const car: Car = {
  id: "1",
  name: "",
  licencePlate: "E123",
  constructionDate: "2014-09-06",
  createdDate: "2014-09-06",
  updatedDate: "2014-09-06",
};

const applicationCar = mapDate(car);

function transformStringFn(value: string): string {
  return `${value} modified`;
}

enum MyValuesEnum {
  SOME_VALUE = transformStringFn("someValue"),
}

class MyValues {
  static someValue = transformStringFn("Some Value");
}

type Immutable<T> = T extends object ? Readonly<T> : T;

type IdType<Type> = Type extends { id: infer TypeOfId }
  ? TypeOfId extends number
    ? number
    : number
  : never;

type T1 = IdType<Car>;

function add(a: number, b: number): string {
  return "hallo";
}

type FnType<T> = T extends (a: infer A, b: infer B) => infer R
  ? { args: [A, B]; returned: R }
  : never;

type ReturningType<T> = FnType<T>["returned"];

const responseFromAdd: ReturningType<typeof add> = "hello";

type Getter<Type> = {
  [Property in keyof Type as Property extends "id"
    ? never
    : `set${Capitalize<Property & string>}`]: (value: Type[Property]) => void;
} & {
  [Property in keyof Type as `get${Capitalize<Property & string>}`]: () => Type[Property];
};

class Human {
  introduce(id: number) {}
}

class Musician extends Human {
  introduce(id: number, instrument: string) {
    super.introduce(id);
  }
}
