import { classNames } from "../../index";

describe("classNames function", () => {
  it("should return an empty string if all arguments are falsy", () => {
    expect(classNames()).toBe("");
    expect(classNames(null, undefined, false)).toBe("");
  });

  it("should concatenate non-falsy class names", () => {
    expect(classNames("class1", "class2", "class3")).toBe("class1 class2 class3");
  });

  it("should ignore falsy values", () => {
    expect(classNames("class1", null, "class2", undefined, "class3", false)).toBe(
      "class1 class2 class3",
    );
  });

  it("should handle edge cases", () => {
    expect(classNames("", "class1", "", "class2")).toBe("class1 class2");
    expect(classNames("class1", "class2", "", null, undefined, false)).toBe("class1 class2");
  });
});
