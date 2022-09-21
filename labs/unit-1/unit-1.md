# Unit 1

Every function needs to be fully type-safe. No type assertions like `as undefined as string` are allowed.

For each function, you a have a unit test. You can run all of them via `npx jest unit-1` or a single one like `npx jest 1-get-type`.

## 1. getType

Write a function `getType` that accepts a value of type `Date | number | string | unknown[] | bigint` and returns a string with the name of the type according the spec `1-get-type.spec.ts`.

Try to apply an exhaust check with type `never`.

## 2. isType

Write a function `isType` that accepts a value of `unknown` and an argument `type` of `"string" | "date" | "array" | "record"`. It should return a boolean if `value` is of type, according to `type`.

Check out `2-is-type.spec.ts` for further details.

## 3. isNullable

Write a type guard, that combined together with control flow analysis and negation, asserts that a value is not of type `null` or `undefined`.

For example:

```typescript
function foobar(value: number | undefined | null) {
  if (!isNullable(value)) {
    const n: number = value;
  }
}
```

## 4. getProperties

Write a function `getProperties` with signature `function getProperties(object: {find out the right type}, types: {find out the right type} = [], filterPrimitives = false): [string, string][]`  that returns an array with key/value tuple of an object. It should be possible to filter the properties according to their type. And there should be a third optional argument, where only primitive types are used.

## 5. mapDate

Write a function that traverses through an object and map all properties of type `string` and their names ending with 'date' or 'Date' to a `Date` type.

Do this in a type-safe way (no type assertion).

You will probably have to check if a property is an empty object. Write a type guard for that.

## 6. assertThat (function overloading)

Write a function `assertThat`, which provides type-specific matchers for numbers, strings, and objects.

This should compile:

```typescript
assertThat("This is a test").matches(/^[\w\s]+$/);
assertThat(5).isBetween(4, 6);
assertThat({ street: "Domgasse", city: "Vienna" }).hasProperties({
  city: "Wien",
});
```

But this not

```typescript
assertThat(5).matches(/^[\w\s]+$/);
assertThat("foobar").isBetween(4, 6);
assertThat("foobar").hasProperties({ city: "Wien" });
```

```typescript
class Person {
  constructor(public id: number, public firstname: string) {}
}
const franz = new Person(1, "Franz");
const car = { id: 1, engine: "diesel", colour: "blue" };

const id: number = readValue(car, "id");
const n: string = readValue(franz, "firstname");
```