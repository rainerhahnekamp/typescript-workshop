# Generic Function, Conditional Types, Index Access,  Utility Types

## Clean Response

Come up with a Type by using Utility Types that removes meta and version from a property. It should work like this:



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
type T3 = Expect<IsEqual<{a: number}, {a: number}>>;

// should not compile
type T4 = Expect<IsEqual<string, number>>;
type T5 = Expect<IsEqual<{a: number}, {b: number}>>;
type T6 = Expect<IsEqual<string, 'hello'>>;
type T7 = Expect<IsEqual<'hello', string>>;
```

### Not

The `Not<T>` expects only a boolean and should negate it.

```typescript
type T1 = Expect<Not<IsEqual<string, number>>>;
type T2 = Expect<Not<IsEqual<{a: number}, {b: number}>>>;
type T3 = Expect<Not<IsEqual<string, 'hello'>>>;
type T4 = Expect<Not<IsEqual<'hello', string>>>;

// should not compile
type T5 = Expect<Not<IsEqual<string, string>>>;
type T6 = Expect<Not<IsEqual<number, number>>>;
type T7 = Expect<Not<IsEqual<{a: number}, {a: number}>>>;
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