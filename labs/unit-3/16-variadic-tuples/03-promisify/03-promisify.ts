type Callback<Value> = (...result: [error: Error] | [error: null, value: Value]) => void;

export function promisify<Args extends unknown[], Value>(
  fn: (...args: [...Args, Callback<Value>]) => void,
): (...args: Args) => Promise<Value> {
  return (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (...result) => {
        if (result[0] === null) resolve(result[1]);
        else reject(result[0]);
      });
    });
}
