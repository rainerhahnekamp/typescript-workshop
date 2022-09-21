import { describe, it } from "@jest/globals";
import { sameType } from "./1-same-type";

describe("sameType", () => {
  it("should allow different types as long as they are of the same type", () => {
    sameType(1, 2);
    sameType("a", "b");
    sameType(true, false);
    sameType(new Date(), new Date());
    sameType(null, undefined);
    sameType<number | boolean>(1, true);
    sameType({ id: 1 }, { id: false }); // careful with these
  });

  it("should not allow that the two arguments are of a different type", () => {
    // @ts-expect-error
    sameType(1, "one");
    // @ts-expect-error
    sameType(1, true);
    // @ts-expect-error
    sameType(new Date(), { id: 1 });
    // @ts-expect-error
    sameType<null>(null, undefined);
    // @ts-expect-error
    sameType<{ id: number }>({ id: 1 }, { id: false });
    // @ts-expect-error
    sameType({ id: 1 } as { id: number }, { id: false } as { id: boolean });
  });
});
