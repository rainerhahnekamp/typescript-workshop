class HttpClient {
  post(url: string): Promise<void> {
    return Promise.resolve();
  }
}

class UserService {
  getCurrentUser() {
    return "Franz Huber";
  }
}

class RouterService {
  navigate(url: string): void {}
}

type MethodSpy<Args extends unknown[], Result> = ((...args: Args) => Result) & {
  calls: Args[];
};
type Spy<T> = {
  [Key in keyof T]: T[Key] extends (...args: infer Args) => infer Result
    ? MethodSpy<Args, Result>
    : T[Key];
};

type Injector<
  Spies extends readonly unknown[],
  Types extends readonly unknown[],
> = Types extends readonly [infer Head, ...infer Tail]
  ? [Head extends Spies[number] ? Spy<Head> : Head, ...Injector<Spies, Tail>]
  : [];

export type { HttpClient, Injector, RouterService, Spy, UserService };
