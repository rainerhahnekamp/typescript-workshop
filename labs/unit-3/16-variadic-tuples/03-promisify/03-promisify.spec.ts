import { describe, expect, expectTypeOf, it } from "vitest";
import { promisify } from "./03-promisify";

function readMileage(
  vin: string,
  includeHistory: boolean,
  callback: (...result: [Error] | [null, number]) => void,
) {
  if (!vin.startsWith("JT")) callback(new Error("Unknown vehicle"));
  else callback(null, includeHistory ? 42 : 7);
}

describe("promisify", () => {
  it("preserves argument order and infers the successful result", async () => {
    const readMileageAsync = promisify(readMileage);
    expectTypeOf(readMileageAsync).toEqualTypeOf<
      (vin: string, includeHistory: boolean) => Promise<number>
    >();
    await expect(readMileageAsync("JT-42", true)).resolves.toBe(42);
    if (false) {
      // @ts-expect-error The callback does not appear in the returned signature.
      void readMileageAsync("JT-42", true, () => {});
      // @ts-expect-error The ordinary arguments keep their original order.
      void readMileageAsync(true, "JT-42");
    }
  });

  it("rejects with the callback error", async () => {
    await expect(promisify(readMileage)("unknown", false)).rejects.toThrow(
      "Unknown vehicle",
    );
  });

  it("also accepts a function with no ordinary arguments", async () => {
    const readPlant = promisify(
      (callback: (...result: [Error] | [null, string]) => void) =>
        callback(null, "Toyota City"),
    );
    expectTypeOf(readPlant).toEqualTypeOf<() => Promise<string>>();
    await expect(readPlant()).resolves.toBe("Toyota City");
  });
});
