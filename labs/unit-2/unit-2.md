- [1. sameType](#1-sametype)
- [2. `assertType`](#2-asserttype)
- [3. nonNullable](#3-nonnullable)
  - [3.1. type predicate isNonNullale<T>](#31-type-predicate-isnonnullalet)
  - [3.2. isNonNullable with utility type `NonNullable<T>`](#32-isnonnullable-with-utility-type-nonnullablet)
  - [3.3. `assertNonNullable`](#33-assertnonnullable)
- [4. `reduce`](#4-reduce)
  - [4.1. `reduce` with one generic type](#41-reduce-with-one-generic-type)
  - [4.2. `reduce` with accumulator and two generic types](#42-reduce-with-accumulator-and-two-generic-types)
  - [4.3. `reduce` with optional accumulator](#43-reduce-with-optional-accumulator)
- [5. Property setter & reader](#5-property-setter--reader)
- [6. Spy](#6-spy)

# 1. sameType

Write a generic function with two arguments that must have the same Type

# 2. `assertType`

Write a generic function `assertType` which internally is using type assertion to turn every type in to another one. The use case for this function is mainly in testing, when we deal with mocks.

Examples:

```typescript
const input = "this is a string";
const n: number = assertType<number>(input);

const t = true;
const strTrue: string = assertType<string>(t);

const now: Date = assertType<Date>(undefined);
```

You don't want to use `assertType` on a regular basis in an application code ;).

# 3. nonNullable

## 3.1. type predicate isNonNullale<T>

As done in unit 1 with `isNullable`, create the opposite type predicate by using generics.

Hint: Any type intersected with an empty object `T & {}` cannot be `undefined` or `null`.

## 3.2. isNonNullable with utility type `NonNullable<T>`

Use the `NonNullable` utilty type for the type predicate `isNonNullable`.

## 3.3. `assertNonNullable`

Instead of a type predicate like `isNonNullable`, write an assertion function `assertNonNullable`. Make sure it throws an error, if the value is `undefined` or `null`.

# 4. `reduce`

## 4.1. `reduce` with one generic type

Write a generic reducer function as JavaScript's `Array::reduce` but without an accumulator.

## 4.2. `reduce` with accumulator and two generic types

Write a generic reducer function as JavaScript's `Array::reduce` with a mandatory accumulator.

## 4.3. `reduce` with optional accumulator

Write a generic reducer function as JavaScript's `Array::reduce` with an optional accumulator.

# 5. Property setter & reader

Write two type-safe generic functions, that will set and get a property's value from any object with indexed access.

# 6. Spy

Create a generic type `Spy<T>` that expects a function (without parameters) as type and adds the property `answer` to it. `answer` should be a function, where we can define what the original function should return.

For example:

```typescript
let a = 1;
const incrementer = () => a++;
type Adder = typeof incrementer;

function spyCheck(spiedAdder: Spy<Adder, ReturnType<Adder>>) {
  spiedAdder.answer(1);
  spiedAdder.answer("hello"); // should fail
}
```

Further more, generate a funcion `spy`, that does the acutal transformation.

For exampe:

```typescript
const spiedAdder: Spy<Adder> = spy(adder);
```

It is ok, if you use type assertion for the implementation.
