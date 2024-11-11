import { usePrevious } from "../index";
// Utilities
import { renderHook } from "@testing-library/react";

describe("usePrevious", () => {
  it("should return undefined on the initial render", () => {
    const { result } = renderHook(() => usePrevious(0));

    // Initially, the previous value should be undefined
    expect(result.current).toBeUndefined();
  });

  it("should return the previous value after an update", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 0 },
    });

    // Initial render, previous value should be undefined
    expect(result.current).toBeUndefined();

    // Update the value to 1
    rerender({ value: 1 });
    expect(result.current).toBe(0);

    // Update the value to 2
    rerender({ value: 2 });
    expect(result.current).toBe(1);

    // Update the value to 3
    rerender({ value: 3 });
    expect(result.current).toBe(2);
  });
});
