import { Type } from "typescript";

export type Person = {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: Date;
};

const franz = {
  id: 1,
  firstname: "Franz",
  lastname: "Huber",
  birthdate: new Date(1978, 2, 10),
};
const maria = {
  id: 2,
  firstname: "Maria",
  lastname: "Denheis",
  birthdate: new Date(2001, 1, 1),
};
const konrad = {
  id: 3,
  firstname: "Konrad",
  lastname: "Wagner",
  birthdate: new Date(1989, 12, 7),
};

const belgrad = { name: "Beograd", population: 1.3 };
const berlin = { name: "Berlin", population: 3.7 };
const rome = { name: "Roma", population: 2.9 };
const vienna = { name: "Wien", population: 2.0 };

const people = [franz, maria, konrad];
const cities = [belgrad, berlin, rome, vienna];

// don't do anything with the value
function phase1() {
  function log(value: unknown): void {
    console.log(value);
  }

  people.forEach(log);
  cities.forEach(log);
}

// phase 2 -- pass it on
function phase2() {
  function log<T>(value: T): T {
    console.log(value);
    return value;
  }

  people.map(log).reduce((names, curr) => `${names}, ${curr.lastname}`, "");
  cities.map(log).reduce((names, curr) => `${names}, ${curr.name}`, "");
}

// phase 3 - external processing
function phase3() {
  function log<T>(value: T, format: (value: T) => string): T {
    console.log(format(value));
    return value;
  }

  people
    .map((person) => log(person, (person) => person.lastname))
    .reduce((names, curr) => `${names}, ${curr.lastname}`, "");
  cities
    .map((city) => log(city, (city) => city.name))
    .reduce((names, curr) => `${names}, ${curr.name}`, "");
}

// phase 4 - constraints
function phase4() {
  function log<T extends { isLogged: boolean }>(
    value: T,
    format: (value: T) => string
  ): T {
    if (!value.isLogged) {
      console.log(format(value));
    } else {
      value.isLogged = true;
    }

    return value;
  }

  people
    .map((person) => ({ ...person, isLogged: false }))
    .map((person) => log(person, (person) => person.lastname))
    .reduce((names, curr) => `${names}, ${curr.lastname}`, "");
  cities
    .map((city) => ({ ...city, isLogged: false }))
    .map((city) => log(city, (city) => city.name))
    .reduce((names, curr) => `${names}, ${curr.name}`, "");
}

// phase 5 - multiple types (processor)
function phase5() {
  function log<T, U>(value: T, processor: (value: T) => U): U {
    console.log(value);
    return processor(value);
  }

  const processedFranz = log(franz, (person) => ({
    ...person,
    processedDate: new Date(),
  }));
}

// phase 6 - derived type
function phase6() {
  function unsafeLog<T extends Record<string, unknown>>(
    value: T,
    property: string
  ) {
    if (property in value) {
      console.log(value[property]);
      return value[property];
    }

    throw new Error(`${property} does not`);
  }

  function safeLog<T, P extends keyof T>(value: T, property: P) {
    console.log(value[property]);
    return value[property];
  }

  const lastname = unsafeLog(franz, "lastName"); // unknown
  const id: number = safeLog(franz, "id"); // number
}

const a: Object = 5;
const b: object = [1, 2, 3];
