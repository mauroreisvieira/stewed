import { useMounted } from "../../index";
// Utilities
import { renderHook, act } from "@testing-library/react";

describe("useMounted", () => {
  it("should return true when the component is mounted", () => {
    const { result } = renderHook(() => useMounted());

    // The hook should return true right after mounting
    expect(result.current()).toBe(true);
  });

  it("should return false after the component is unmounted", () => {
    const { result, unmount } = renderHook(() => useMounted());

    // Unmount the component
    act(() => {
      unmount();
    });

    // The hook should return false after unmounting
    expect(result.current()).toBe(false);
  });

  it("should return true initially and then false after unmounting", () => {
    const { result, unmount } = renderHook(() => useMounted());

    // The hook should return true right after mounting
    expect(result.current()).toBe(true);

    // Unmount the component
    act(() => {
      unmount();
    });

    // The hook should return false after unmounting
    expect(result.current()).toBe(false);
  });
});
