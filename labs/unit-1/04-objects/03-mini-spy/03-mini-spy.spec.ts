import { describe, expect, it } from "vitest";
import { spyOn } from "./03-mini-spy";

describe("spying on a method", () => {
  it("starts with no calls and does not run the method during setup", () => {
    let runs = 0;
    const car = { drive: () => runs++ };

    const spy = spyOn(car, "drive");

    expect(spy.calls).toEqual([]);
    expect(runs).toBe(0);
  });

  it("records each call's arguments in order", () => {
    const car = { drive: (distance: number, unit: string) => distance };
    const spy = spyOn(car, "drive");

    car.drive(50, "km");
    car.drive(20, "mi");

    expect(spy.calls).toEqual([
      [50, "km"],
      [20, "mi"],
    ]);
  });

  it("records an empty array for a call without arguments", () => {
    const car = { start: () => "ready" };
    const spy = spyOn(car, "start");

    car.start();

    expect(spy.calls).toEqual([[]]);
  });

  it("returns the original result", () => {
    const car = { double: (distance: number) => distance * 2 };
    spyOn(car, "double");

    expect(car.double(25)).toBe(50);
  });

  it("calls the original method with its receiver", () => {
    const car = {
      mileage: 100,
      drive(distance: number) {
        this.mileage += distance;
      },
    };
    spyOn(car, "drive");

    car.drive(50);

    expect(car.mileage).toBe(150);
  });
});
