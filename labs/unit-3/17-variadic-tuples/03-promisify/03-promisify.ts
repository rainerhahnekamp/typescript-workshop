type Callback<Value> = (...result: [error: Error] | [error: null, value: Value]) => void;

// TODO: Infer the ordinary arguments and the callback's successful value.
// The supplied runtime follows a single-result, error-first callback contract.
export function promisify(fn: (...args: never[]) => void) {
  const invoke = fn as (...args: unknown[]) => void;
  return (...args: unknown[]): Promise<unknown> =>
    new Promise((resolve, reject) => {
      const callback: Callback<unknown> = (...result) => {
        if (result[0] === null) resolve(result[1]);
        else reject(result[0]);
      };
      invoke(...args, callback);
    });
}
