// Hook
import { useKey } from "../../index";
// Utilities
import { renderHook } from "@testing-library/react";
import { type Mock } from "vitest";

describe("useKey", () => {
  let handler: Mock;

  beforeEach(() => {
    handler = vi.fn();
  });

  it("should not call the callback when disabled", () => {
    renderHook(() =>
      useKey({
        keys: ["Enter", "Escape"],
        enabled: false,
        handler
      })
    );

    // Simulate keydown event for "Enter" and "Escape"
    document.dispatchEvent(new KeyboardEvent("keydown", { code: "Enter" }));
    document.dispatchEvent(new KeyboardEvent("keydown", { code: "Escape" }));

    // Callback should not be called
    expect(handler).not.toHaveBeenCalled();
  });

  it("should call the callback when enabled and specified key is pressed", () => {
    renderHook(() =>
      useKey({
        keys: ["Enter"],
        enabled: true,
        handler
      })
    );

    // Simulate keydown event for "Enter"
    document.dispatchEvent(new KeyboardEvent("keydown", { code: "Enter" }));

    // Callback should be called once
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("should not call the callback for keys not in the list", () => {
    renderHook(() =>
      useKey({
        keys: ["Enter"],
        enabled: true,
        handler
      })
    );

    // Simulate keydown event for "Escape" which is not in the specified keys list
    document.dispatchEvent(new KeyboardEvent("keydown", { code: "Escape" }));

    // Callback should not be called
    expect(handler).not.toHaveBeenCalled();
  });

  it("should call the callback for multiple specified keys", () => {
    renderHook(() =>
      useKey({
        keys: ["Enter", "Escape"],
        enabled: true,
        handler
      })
    );

    // Simulate keydown events for "Enter" and "Escape"
    document.dispatchEvent(new KeyboardEvent("keydown", { code: "Enter" }));
    document.dispatchEvent(new KeyboardEvent("keydown", { code: "Escape" }));

    // Callback should be called twice (once for each specified key)
    expect(handler).toHaveBeenCalledTimes(2);
  });

  it("should stop calling the callback after being disabled", () => {
    const { rerender } = renderHook(
      ({ enabled }) =>
        useKey({
          keys: ["Enter"],
          enabled,
          handler
        }),
      {
        initialProps: { enabled: true }
      }
    );

    // Initially enabled, simulate keydown for "Enter"
    document.dispatchEvent(new KeyboardEvent("keydown", { code: "Enter" }));
    expect(handler).toHaveBeenCalledTimes(1);

    // Rerender with enabled set to false
    rerender({ enabled: false });

    // Simulate keydown for "Enter" again
    document.dispatchEvent(new KeyboardEvent("keydown", { code: "Enter" }));

    // Callback should not be called again as hook is disabled
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
