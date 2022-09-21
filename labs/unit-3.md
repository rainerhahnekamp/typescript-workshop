## 3. Conditional Types, Type Mapping, Template Literals

## 1. Conditional types

Implement your own version of conditional types by using 

You can look up the spec from the official TypeScript website and of course in the unit test as well.

- `MyReturnType<T>`: returns type of a function
- `MyParameters<T>`: returns an tuple of a function's arguments
- `FirstParameter`: return the type of a function's first argument and `undefined` if there are not parameters.

- `Equal<T>`: only compiles if `T` is true
- `Not<T>`: only accepts a boolean and returns the opposite
- `AreEqual<T>`: returns true, if the types are exactly the same


## 2. Mapped types
- `PartialReadOnly<T, Properties>`: only set those properties to readonly wihch keys are set in `Properties`
- `PartialOptional<T>`: as `PartialReadOnly`, but for optional parameters

## 3. `DateProps<T>`

Create a `DateProps` type. It should generate a type that fits to the `mapDate` function, you created in unit 1. It should map alle properties ending with "[dD]ate" to type `Date`.

Also generate a function `mapDateProperties` that any passed object to type `DateProps`. Reuse your `mapDate`. For the implementation you can again use type assertion.

## 4. Fluent setters

Generate a new type that transforms all properties into a setter method. See the unit tests for details.

## 5. Typesafe HTML query

Look at the example below. Should be self-explanatory. Something we wanted to have for ages...

```typescript
let input: HTMLInputElement = safeQuery('input');
let button: HTMLButtonElement = safeQuery('button');

input = HTMLInputElement = safeQuery('form input')
button = HTMLButtonElement = safeQuery('div.form div.button button');
input = HTMLButtonElement = safeQuery('#container button')

safeQuery('div > p'); //should be never
```

Don't think too complicated. Just make sure that the unit tests work and don't add any other features.

## Spy examples
