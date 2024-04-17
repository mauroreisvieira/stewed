import { useBem } from "@stewed/hooks";
import { renderHook } from "@testing-library/react";

// Mock classNames utility
jest.mock("@stewed/utilities", () => ({
  classNames: jest.fn((...args: string[]) => args.filter(Boolean).join(" ")),
}));

// Mock useCallback
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useCallback: jest.fn((callback) => callback),
}));

describe("useBem", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should generate correct class names for block", () => {
    const { result } = renderHook(() =>
      useBem({
        block: "button",
        styles: { "button": "button", "button--primary": "primary" },
      }),
    );

    expect(result.current.getBlock({})).toBe("button");
    expect(result.current.getBlock({ extraClasses: "extra-class" })).toBe("button extra-class");
  });

  it("should generate correct class names for elements", () => {
    const { result } = renderHook(() =>
      useBem({
        block: "button",
        styles: { button: "button", button__icon: "icon" },
      }),
    );

    expect(result.current.getElement(["icon"])).toBe("icon");
    expect(result.current.getElement(["icon"], "extra-class")).toBe("icon extra-class");
  });

  it("should generate correct class names for modifiers", () => {
    const { result } = renderHook(() =>
      useBem({
        block: "button",
        styles: { "button": "button", "button--primary": "primary" },
      }),
    );

    expect(result.current.getModifier(["primary"])).toBe("primary");
    expect(result.current.getModifier(["primary"], "extra-class")).toBe("primary extra-class");
  });
});
