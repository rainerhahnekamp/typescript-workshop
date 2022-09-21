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

type Injector<Spies, Type> = Spies extends [infer Head, ...infer Tail]
  ? Type
  : never;
