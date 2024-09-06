import { z } from "zod";

interface IPerson {
  id: number;
  name: string;
}

type TPerson = {
  id: number;
  name: string;
  surname: string;
};

type Direction = "north" | "south" | "east" | "west";

const initialDirection = "north";

type Entity = { id: number };
type Model = { id: number };

const c = {
  initialDirection: "north",
} as const;

go(c.initialDirection);
go(initialDirection);

function go(direction: Direction) {
  switch (direction) {
    case "east":
    case "north":
      return -1;
    case "west":
    case "south":
      return 1;
    default:
      const exhaustCheck: never = direction;
  }
}

type IntroduceFn = (name: string, surname: string) => string;

const introduce: IntroduceFn = (name, surname) => {
  return `${name} ${surname}`;
};

declare function doSomething(person: IPerson): void;

const tPerson: TPerson = {
  id: 1,
  name: "Konrad",
  surname: "Maier",
};

const iPerson = tPerson satisfies IPerson;

doSomething(tPerson);
doSomething({
  id: 1,
  name: "Konrad",
});

type Config = Record<string | number | symbol, string | number>;

const config = {
  baseUrl: "http",
} satisfies Config;

const value: string = config.baseUrl;

declare function init(config: Config): void;

init(config);

function forEach(values: unknown[], callback: (value: unknown) => undefined) {
  const value = callback(values[0]);
}

function printNumber(value: unknown): undefined {
  console.log(value);
}

numbers.forEach(printNumber);

forEach(numbers, printNumber);

function foo(value: unknown) {
  if (typeof value === "string") {
    value.toLowerCase();
  }
}

interface Person {
  birthday: Date;
}

interface PersonJson {
  birthday: string;
}

declare function doCalculation(value: Date): number;

function calcAge(
  value: Date | null | undefined | string | Person | PersonJson,
) {
  if (value instanceof Date) {
    calcAge(value);
  } else if (typeof value === "string") {
    doCalculation(new Date(value));
  } else if (!value) {
    return 0;
  } else if (isPerson(value)) {
    return doCalculation(value.birthday);
  } else {
    return doCalculation(new Date(value.birthday));
  }
}

const personSchema = z.object({
  id: z.number(),
  birthday: z.string(),
});

type ZPerson = z.infer<typeof personSchema>;

function isPerson(value: unknown): value is Person {
  return personSchema.safeParse(value).success;
}

function extractData(absoluteFilePath: string, linesOfCode: number): boolean;
function extractData(relativeFilePath: string, cwd: string): boolean;

function extractData(filePath: string, cwdOrLinesOfCode: string | number) {
  return true;
}

let word = { id: 1, name: "Konrad" };
const t = typeof word; // value space
type A = typeof word; // type space

type Car = {
  id: number;
  brand: string;
  doorCount: number;
  electric: boolean;
};

type TPersonKeys = keyof TPerson;

function getProperty<Type, PropertyName extends keyof Type>(
  entity: Type,
  propertyName: PropertyName,
): Type[PropertyName] {
  return entity[propertyName];
}

const konrad: TPerson = { id: 1, name: "Konrad", surname: "Maier" };
const car: Car = { id: 1, brand: "Some Brand", doorCount: 4, electric: false };

const personName: string = getProperty(konrad, "name");
const isElectric: boolean = getProperty(car, "electric");

const names = ["John", "Martin", "Sandra", "Jessica"].map((name) => ({
  isLogged: false,
  value: name,
}));
const numbers = [1, 2, 3, 4].map((number) => ({
  isLogged: false,
  value: number,
}));

function log<Type extends { isLogged: boolean }, FormatType>(
  value: Type,
  format: (value: Type) => FormatType,
): Type {
  if (value.isLogged) {
    return value;
  }
  console.log(format(value));
  return value;
}

names
  .map((name) => log(name, (value) => `Name: ${value}`))
  .map((name) => name.value.length);
numbers
  .map((number) => log(number, (value) => value.value * 2))
  .map((number) => number.value * 2);

declare function getIndex<Type>(
  values: Array<Type>,
  value: NoInfer<Type>,
): Type;

let nr = [1, 2, 3] as const;
const re = getIndex(nr, 2);
getIndex([1, 2, 3], 4);
