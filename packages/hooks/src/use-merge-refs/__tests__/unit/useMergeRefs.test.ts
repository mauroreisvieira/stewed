import { RefObject, createRef } from "react";
// Hooks
import { useMergeRefs } from "../../index";
// Utilities
import { renderHook } from "@testing-library/react";

describe("useMergeRefs", () => {
  it("should merge multiple refs and assign the same DOM element", () => {
    // Arrange
    const ref1 = createRef<HTMLDivElement>();
    const ref2: RefObject<HTMLDivElement | null> = { current: null };

    // Act
    const { result } = renderHook(() => useMergeRefs<HTMLDivElement>());
    const mergedRef = result.current([ref1, ref2]);

    const element = document.createElement("div");
    mergedRef(element);

    // Assert
    expect(ref1.current).toBe(element);
    expect(ref2.current).toBe(element);
  });

  it("should call ref callback with the DOM element", () => {
    // Arrange
    const refCallback = vi.fn();

    // Act
    const { result } = renderHook(() => useMergeRefs<HTMLDivElement>());
    const mergedRef = result.current([refCallback]);

    const element = document.createElement("div");
    mergedRef(element);

    // Assert
    expect(refCallback).toHaveBeenCalledWith(element);
  });

  it("should handle null or undefined refs gracefully", () => {
    // Arrange
    const ref1 = createRef<HTMLDivElement>();
    const ref2: RefObject<HTMLDivElement | null> = { current: null };

    // Act
    const { result } = renderHook(() => useMergeRefs<HTMLDivElement>());
    const mergedRef = result.current([ref1, null, undefined, ref2]);

    const element = document.createElement("div");
    mergedRef(element);

    // Assert
    expect(ref1.current).toBe(element);
    expect(ref2.current).toBe(element);
  });

  it("should reset refs when called with null", () => {
    // Arrange
    const ref1 = createRef<HTMLDivElement>();
    const ref2: RefObject<HTMLDivElement | null> = { current: null };

    // Act
    const { result } = renderHook(() => useMergeRefs<HTMLDivElement>());
    const mergedRef = result.current([ref1, ref2]);

    const element = document.createElement("div");
    mergedRef(element);
    mergedRef(null);

    // Assert
    expect(ref1.current).toBeNull();
    expect(ref2.current).toBeNull();
  });

  it("should handle mixed ref types (callback and object refs)", () => {
    // Arrange
    const ref1 = createRef<HTMLDivElement>();
    const refCallback = vi.fn();

    // Act
    const { result } = renderHook(() => useMergeRefs<HTMLDivElement>());
    const mergedRef = result.current([ref1, refCallback]);

    const element = document.createElement("div");
    mergedRef(element);

    // Assert
    expect(ref1.current).toBe(element);
    expect(refCallback).toHaveBeenCalledWith(element);
  });
});
