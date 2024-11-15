import { useMergeRefs } from "../../index";
// Utilities
import { renderHook } from "@testing-library/react";

describe("useMergeRefs", () => {
  it("should return null if no refs are provided", () => {
    const { result } = renderHook(() => useMergeRefs([]));
    expect(result.current).toBeNull();
  });

  it("should correctly assign a single ref", () => {
    const ref1 = { current: null } as React.MutableRefObject<HTMLDivElement | null>;
    const { result } = renderHook(() => useMergeRefs([ref1]));

    const div = document.createElement("div");
    if (result.current) result.current(div);

    expect(ref1.current).toBe(div);
  });

  it("should correctly assign multiple refs", () => {
    const ref1 = { current: null } as React.MutableRefObject<HTMLDivElement | null>;
    const ref2 = { current: null } as React.MutableRefObject<HTMLDivElement | null>;
    const { result } = renderHook(() => useMergeRefs([ref1, ref2]));

    const div = document.createElement("div");
    if (result.current) result.current(div);

    expect(ref1.current).toBe(div);
    expect(ref2.current).toBe(div);
  });

  it("should call function refs with the correct value", () => {
    const funcRef1 = jest.fn();
    const funcRef2 = jest.fn();
    const { result } = renderHook(() => useMergeRefs([funcRef1, funcRef2]));

    const div = document.createElement("div");
    if (result.current) result.current(div);

    expect(funcRef1).toHaveBeenCalledWith(div);
    expect(funcRef2).toHaveBeenCalledWith(div);
  });

  it("should handle a mix of function refs and object refs", () => {
    const funcRef = jest.fn();
    const objectRef = { current: null } as React.MutableRefObject<HTMLDivElement | null>;
    const { result } = renderHook(() => useMergeRefs([funcRef, objectRef]));

    const div = document.createElement("div");
    if (result.current) result.current(div);

    expect(funcRef).toHaveBeenCalledWith(div);
    expect(objectRef.current).toBe(div);
  });

  it("should handle null or undefined refs gracefully", () => {
    const ref1 = { current: null } as React.MutableRefObject<HTMLDivElement | null>;
    const { result } = renderHook(() => useMergeRefs([ref1, null, undefined]));

    const div = document.createElement("div");
    if (result.current) result.current(div);

    expect(ref1.current).toBe(div);
  });
});
