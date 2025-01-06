import { isArray } from "../index";

describe("isArray", () => {
  it("should return true for an array of numbers", () => {
    const result = isArray([1, 2, 3]);
    expect(result).toBe(true);
  });

  it("should return true for an array of strings", () => {
    const result = isArray(["a", "b", "c"]);
    expect(result).toBe(true);
  });

  it("should return false for a non-array object", () => {
    const result = isArray({ key: "value" });
    expect(result).toBe(false);
  });

  it("should return false for a string", () => {
    const result = isArray("hello");
    expect(result).toBe(false);
  });

  it("should return false for null", () => {
    const result = isArray(null);
    expect(result).toBe(false);
  });

  it("should return false for undefined", () => {
    const result = isArray(undefined);
    expect(result).toBe(false);
  });

  it("should return false for a number", () => {
    const result = isArray(123);
    expect(result).toBe(false);
  });
});
