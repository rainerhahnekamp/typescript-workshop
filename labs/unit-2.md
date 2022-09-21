- [4. `reduce`](#4-reduce)
  - [4.1. `reduce` with one generic type](#41-reduce-with-one-generic-type)
  - [4.2. `reduce` with accumulator and two generic types](#42-reduce-with-accumulator-and-two-generic-types)
  - [4.3. `reduce` with optional accumulator](#43-reduce-with-optional-accumulator)
- [5. Property setter & reader](#5-property-setter--reader)
- [6. Spy](#6-spy)
  - [2. Type Guards, Function Overloading](#2-type-guards-function-overloading)
  - [Generic Type for Spy which returns methods for `called`, `returnValue`, `runFunction`.](#generic-type-for-spy-which-returns-methods-for-called-returnvalue-runfunction)
  - [Factory function allows us to return mocked or not mocked](#factory-function-allows-us-to-return-mocked-or-not-mocked)
  - [Rewrite Pick, Omit, Readonly, Partial utility types.](#rewrite-pick-omit-readonly-partial-utility-types)
- [Conditional Types](#conditional-types)
  - [`<Expect>` Type](#expect-type)
    - [Default](#default)
    - [IsEqual](#isequal)
    - [Not](#not)
  - [Typed Promise](#typed-promise)
- [1. Date Mapper](#1-date-mapper)

## 1. sameType

Write a generic function with two arguments that must have the same Type

## 2. `assertType`

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

## 3. nonNullable

### 3.1. type predicate isNonNullale<T>

As done in unit 1 with `isNullable`, create the opposite type predicate by using generics.

Hint: Any type intersected with an empty object `T & {}` cannot be `undefined` or `null`.

### 3.2. isNonNullable with utility type `NonNullable<T>`

Use the `NonNullable` utilty type for the type predicate `isNonNullable`.

### 3.3. `assertNonNullable`

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




## 2. Type Guards, Function Overloading

## Generic Type for Spy which returns methods for `called`, `returnValue`, `runFunction`.

## Factory function allows us to return mocked or not mocked

## Rewrite Pick, Omit, Readonly, Partial utility types.

# Conditional Types

## `<Expect>` Type

### Default

Come up with a new type `Expect<T>` where `T` can only be a `true`.

### IsEqual

Come up with `IsEqual<A, B>` which checks if two types are exactly the same and returns a boolean.

Following code should be possible:

```typescript
type T1 = Expect<IsEqual<string, string>>;
type T2 = Expect<IsEqual<number, number>>;
type T3 = Expect<IsEqual<{ a: number }, { a: number }>>;

// should not compile
type T4 = Expect<IsEqual<string, number>>;
type T5 = Expect<IsEqual<{ a: number }, { b: number }>>;
type T6 = Expect<IsEqual<string, "hello">>;
type T7 = Expect<IsEqual<"hello", string>>;
```

### Not

The `Not<T>` expects only a boolean and should negate it.

```typescript
type T1 = Expect<Not<IsEqual<string, number>>>;
type T2 = Expect<Not<IsEqual<{ a: number }, { b: number }>>>;
type T3 = Expect<Not<IsEqual<string, "hello">>>;
type T4 = Expect<Not<IsEqual<"hello", string>>>;

// should not compile
type T5 = Expect<Not<IsEqual<string, string>>>;
type T6 = Expect<Not<IsEqual<number, number>>>;
type T7 = Expect<Not<IsEqual<{ a: number }, { a: number }>>>;
```

## Typed Promise

```typescript
type IsEqual<A, T> = A extends T ? (T extends A ? true : false) : false;
type Assert<T extends true> = T;

type T1 = Assert<IsEqual<Promise<number>, Promise<number>>>;

const promise: Promise<number> = new Promise((resolve) => resolve(1));

function createUntypedPromise() {
  return new Promise((resolve) => resolve(1));
}

function createTypedPromise() {
  return new Promise<number>((resolve) => resolve(1));
}

type T2 = ReturnType<typeof createTypedPromise>;
type T3 = ReturnType<typeof createUntypedPromise>;
type T4 = Assert<IsEqual<T2, T3>>;
```

# 1. Date Mapper

JSON does not support the Date type. So it is quite common to do an additional mapping when dealing with data returned from an API.

1.0 Without type mapping but combination of Intersection and Omit

1.1 Generic Date Mapper where we have to define the

1.2 Gener Date Mapper that maps for certain variable names ending with "date" or "time"

1.3 Recursive Date Mapper
