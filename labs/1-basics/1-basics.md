## 1. Generics

## Write a generic function with two arguments that must have the same Type

## Update your generic function so that the possible types can only be number or Date

```typescript
const numberResult: number = foobar(1, 2);
const stringResult: string = foobar('foo', 'bar');

// does not compile
const 

```

## 1.1. `reduce` with defined type

## 1.2. `reduce` with one generic type

## 1.3. `reduce` with accumulator and two generic types

## 1.4 `assertType`

The accumulator is mandatory in our version. So you have to combine generics with function overloading. 

## 1.4. Auditor class with generic `setValue` 

Similar to `readValue` from the slides, write the generic function `writeValue` that write a value to an object's property in a type-safe way.

# 2. Type Narrowing

## Object.keys with type guard

## assertNonNullable

## RxJs operator


## 3. Function Overloading: Typed Assertions (AssertJ)

Write a method `assertThat`, which provides type-specific matchers for numbers, string and objects.

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
