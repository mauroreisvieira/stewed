import { useSelect } from "../../index";
// Utilities
import { renderHook, act } from "@testing-library/react";

describe("useSelect", () => {
  const items = ["Apple", "Banana", "Cherry", "Date"];

  it("initializes with the correct index and item based on initialIndex", () => {
    const { result } = renderHook(() => useSelect(items, 1));

    expect(result.current.index).toBe(1);
    expect(result.current.item).toBe("Banana");
  });

  it("defaults to index 0 and the first item if initialIndex is not provided", () => {
    const { result } = renderHook(() => useSelect(items));

    expect(result.current.index).toBe(0);
    expect(result.current.item).toBe("Apple");
  });

  it("updates the index correctly when setIndex is called", () => {
    const { result } = renderHook(() => useSelect(items));

    act(() => {
      result.current.setIndex(2);
    });

    expect(result.current.index).toBe(2);
    expect(result.current.item).toBe("Cherry");
  });

  it("sets the index to -1 if an out-of-bounds index is provided", () => {
    const { result } = renderHook(() => useSelect(items));

    act(() => {
      result.current.setIndex(10); // Out-of-bounds index
    });

    expect(result.current.index).toBe(10);
    expect(result.current.item).toBeUndefined();
  });

  it("updates the selected item correctly when setItem is called", () => {
    const { result } = renderHook(() => useSelect(items));

    act(() => {
      result.current.setItem("Date");
    });

    expect(result.current.index).toBe(3);
    expect(result.current.item).toBe("Date");
  });

  it("does nothing if setItem is called with an item not in the list", () => {
    const { result } = renderHook(() => useSelect(items));

    act(() => {
      result.current.setItem("Grape"); // Non-existent item
    });

    expect(result.current.index).toBe(0);
    expect(result.current.item).toBe("Apple");
  });

  it("maintains index and item if the list changes to an empty array", () => {
    const { result, rerender } = renderHook(({ initialItems }) => useSelect(initialItems), {
      initialProps: { initialItems: items }
    });

    act(() => {
      result.current.setIndex(2); // Select "Cherry"
    });

    rerender({ initialItems: [] }); // Change list to an empty array

    expect(result.current.index).toBe(2);
    expect(result.current.item).toBeUndefined();
  });
});
