import { it } from "@jest/globals";
import { getProperty, setProperty } from "./5-get-set-property";

const franz = {
  id: 1,
  firstname: "Franz",
  lastname: "Huber",
  birthdate: new Date(1978, 2, 10),
};

const rome = { name: "Roma", population: 2.9 };

it("should get the property in type-safe way", () => {
  const name: string = getProperty(rome, "name");
  // @ts-expect-error
  const nameUnsafe: number = getProperty(rome, "name");

  const birthdate: Date = getProperty(franz, "birthdate");
  // @ts-expect-error
  const birthdateUnsafe: string = getProperty(franz, "birthdate");
});

it("should set the property in type-safe way", () => {
  setProperty(rome, "name", "Rom");
  // @ts-expect-error
  setProperty(rome, "name", 1);

  setProperty(franz, "birthdate", new Date());
  // @ts-expect-error
  setProperty(franz, "birthdate", "1998-09-12");
});
