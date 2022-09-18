// default way

import { bigint, unknown } from "zod";
import { Observable } from "rxjs";

type DateFields<T> = T extends string ? `hello_${Capitalize<T>}` : T;

function check(value: DateFields<"any" | "unknown">) {}

type LocaleMaker<
  COUNTRY extends string,
  LANG extends string
> = `${COUNTRY}-${LANG}`;

type AT = LocaleMaker<"at", "de">;
type ENGLISH_COUNTRIES = LocaleMaker<"us" | "ca" | "gb", "en">;
type CH = LocaleMaker<"ch", "de" | "fr" | "it">;
type SWITZERLAND = LocaleMaker<"ch" | "ch", "de" | "fr" | "it" | "rm">;

type BoolStr<T extends boolean> = `${T}`;
type TRUE = BoolStr<true>;

// # conditional mappping

// #infer

// ## country codes

type COUNTRY<T extends string> = T extends `${infer A}-${infer B}`
  ? { country: A; locale: B }
  : T;
type GERMANY = COUNTRY<"de-AT">;
function translate(allowedCountries: COUNTRY<ENGLISH_COUNTRIES>) {}
translate({ country: "us", locale: "en" });

// ## email

type EMAIL<T extends string> =
  T extends `${infer NAME}@${infer HOST}.${infer DOMAIN}` ? T : never;

function subscribe<T extends string>(email: EMAIL<T>) {}

subscribe("user@host.com");

// # type mapping with property names

type DateMapper<T> = {
  [Property in keyof T]: Property extends `${string}Date` ? Date : T[Property];
};

type PersonApi = {
  id: bigint;
  brithDate: string;
};

type Person = DateMapper<PersonApi>;

function mapApi<T>(value: T): DateMapper<T> {
  return value as DateMapper<T>;
}

const person = mapApi({ id: 1, birthDate: "2022-01-01" });

// # type mapper select methods

type PersonState = {
  entities: Person[];
  loading: boolean;
  hasError: boolean;
  selectedId: number | undefined;
};

type StateSelectors<T> = {
  [Property in keyof T as `select${Property extends string
    ? Capitalize<Property>
    : never}`]: Observable<T[Property]>;
};

function createFeature<T>(initialState: T): StateSelectors<T> {
  return {} as StateSelectors<T>;
}

const initialState: PersonState = {
  entities: [],
  loading: false,
  hasError: false,
  selectedId: undefined,
};
const personFeature = createFeature(initialState);
const entities: Observable<Person[]> = personFeature.selectEntities;
const loading: Observable<boolean> = personFeature.selectLoading;

// # createAction

type TypedAction<Type extends string, Payload> = {
  type: Type;
  payload: Payload;
};

function createAction<Type extends string, Payload>(
  type: Type,
  payload: Payload
): TypedAction<Type, Payload> {
  return {} as TypedAction<Type, Payload>;
}

const loadPerson = createAction("Load Person", { page: 1, size: 10 });

function on<AT extends TypedAction<Type, P>, Type extends string, P>(
  action: AT,
  reducer: (
    state: PersonState,
    p: AT extends TypedAction<Type, infer Payload> ? Payload : never
  ) => PersonState
): void {}

on(loadPerson, (state, { page }) => state);
