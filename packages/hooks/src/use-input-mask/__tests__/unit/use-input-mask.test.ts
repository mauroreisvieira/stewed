import { useInputMask } from "../../index";
// Utilities
import { renderHook, act } from "@testing-library/react";

describe("useInputMask", () => {
  it("should initialize with default value and format it correctly if mask is provided", () => {
    const { result } = renderHook(() =>
      useInputMask({
        pattern: /^\d+$/,
        defaultValue: "123456",
        mask: "XXX-XXX"
      })
    );

    expect(result.current.value).toBe("123-456"); // Masked value
    expect(result.current.isValid).toBe(true); // Matches pattern
  });

  it("should validate and format input correctly on change", () => {
    const { result } = renderHook(() =>
      useInputMask({
        pattern: /^\d{3}-\d{3}$/,
        mask: "XXX-XXX"
      })
    );

    act(() => {
      result.current.onChange({
        target: { value: "123456" }
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.value).toBe("123-456");
    expect(result.current.isValid).toBe(true);
  });

  it("should handle input exceeding mask length", () => {
    const { result } = renderHook(() =>
      useInputMask({
        pattern: /^\d{3}-\d{3}$/,
        mask: "XXX-XXX"
      })
    );

    act(() => {
      result.current.onChange({
        target: { value: "123456789" }
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // Value and value should stop at mask length
    expect(result.current.value).toBe("123-456");
    expect(result.current.isValid).toBe(true);
  });

  it("should handle blur validation for required field", () => {
    const { result } = renderHook(() =>
      useInputMask({
        pattern: /^\d+$/,
        required: true
      })
    );

    act(() => {
      result.current.onBlur({
        target: { value: "" }
      } as React.FocusEvent<HTMLInputElement>);
    });

    expect(result.current.isValid).toBe(false); // Empty value with required field

    act(() => {
      result.current.onBlur({
        target: { value: "123" }
      } as React.FocusEvent<HTMLInputElement>);
    });

    expect(result.current.isValid).toBe(true); // Valid value
  });

  it("should handle empty mask gracefully", () => {
    const { result } = renderHook(() =>
      useInputMask({
        pattern: /^\d+$/
      })
    );

    act(() => {
      result.current.onChange({
        target: { value: "123" }
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.value).toBe("123");
    expect(result.current.isValid).toBe(true);
  });

  it("should strip unwanted characters when charset is true", () => {
    const { result } = renderHook(() =>
      useInputMask({
        pattern: /^[A-Z]+$/,
        mask: "____",
        charset: true
      })
    );

    act(() => {
      result.current.onChange({
        target: { value: "A1B2C3" }
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.value).toBe("A");
    expect(result.current.isValid).toBe(false);
  });
});
