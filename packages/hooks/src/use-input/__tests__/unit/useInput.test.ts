import { useInput, type UseInputValue, type UseInputProps } from "../../index";
// Utilities
import { renderHook, act } from "@testing-library/react";

describe("useInput", () => {
  // Mock validate function for testing
  const mockValidate = jest.fn(() => true);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with the provided initial value", () => {
    const initialValue = "test";
    const { result } = renderHook(() => useInput(initialValue));

    expect(result.current.value).toBe(initialValue);
  });

  it("should call validate function if provided", () => {
    const initialValue = "initial";
    const newValue = "new value";

    const validateOptions: UseInputProps<UseInputValue> = {
      validate: mockValidate,
    };

    const { result } = renderHook(() => useInput(initialValue, validateOptions));

    act(() => {
      result.current.onChange({
        target: { value: newValue },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(mockValidate).toHaveBeenCalledWith(newValue, initialValue);
    expect(result.current.value).toBe(newValue);
  });

  it("should not update value if validate function returns false", () => {
    const initialValue = "initial";
    const invalidValue = "new value";

    const validateOptions: UseInputProps<UseInputValue> = {
      validate: () => false,
    };

    const { result } = renderHook(() => useInput(initialValue, validateOptions));

    act(() => {
      result.current.onChange({
        target: { value: invalidValue },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.value).toBe(initialValue); // The value should remain unchanged
  });

  it("should not reset value when initialValue changes", () => {
    const { result, rerender } = renderHook(
      (props: { initialValue: UseInputValue }) => useInput(props.initialValue),
      {
        initialProps: { initialValue: "initial" },
      },
    );

    expect(result.current.value).toBe("initial");

    rerender({ initialValue: "new initial" });

    expect(result.current.value).toBe("initial");
  });
});
