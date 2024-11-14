import { useKey } from "../index";
// Utilities
import { renderHook } from "@testing-library/react";

describe("useKey", () => {
  let callback: jest.Mock;

  beforeEach(() => {
    callback = jest.fn();
  });

  it("should not call the callback when disabled", () => {
    renderHook(() =>
      useKey({
        keys: ["Enter", "Escape"],
        enabled: false,
        callback,
      }),
    );

    // Simulate keydown event for "Enter" and "Escape"
    document.dispatchEvent(new KeyboardEvent("keydown", { code: "Enter" }));
    document.dispatchEvent(new KeyboardEvent("keydown", { code: "Escape" }));

    // Callback should not be called
    expect(callback).not.toHaveBeenCalled();
  });

  it("should call the callback when enabled and specified key is pressed", () => {
    renderHook(() =>
      useKey({
        keys: ["Enter"],
        enabled: true,
        callback,
      }),
    );

    // Simulate keydown event for "Enter"
    document.dispatchEvent(new KeyboardEvent("keydown", { code: "Enter" }));

    // Callback should be called once
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not call the callback for keys not in the list", () => {
    renderHook(() =>
      useKey({
        keys: ["Enter"],
        enabled: true,
        callback,
      }),
    );

    // Simulate keydown event for "Escape" which is not in the specified keys list
    document.dispatchEvent(new KeyboardEvent("keydown", { code: "Escape" }));

    // Callback should not be called
    expect(callback).not.toHaveBeenCalled();
  });

  it("should call the callback for multiple specified keys", () => {
    renderHook(() =>
      useKey({
        keys: ["Enter", "Escape"],
        enabled: true,
        callback,
      }),
    );

    // Simulate keydown events for "Enter" and "Escape"
    document.dispatchEvent(new KeyboardEvent("keydown", { code: "Enter" }));
    document.dispatchEvent(new KeyboardEvent("keydown", { code: "Escape" }));

    // Callback should be called twice (once for each specified key)
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("should stop calling the callback after being disabled", () => {
    const { rerender } = renderHook(
      ({ enabled }) =>
        useKey({
          keys: ["Enter"],
          enabled,
          callback,
        }),
      {
        initialProps: { enabled: true },
      },
    );

    // Initially enabled, simulate keydown for "Enter"
    document.dispatchEvent(new KeyboardEvent("keydown", { code: "Enter" }));
    expect(callback).toHaveBeenCalledTimes(1);

    // Rerender with enabled set to false
    rerender({ enabled: false });

    // Simulate keydown for "Enter" again
    document.dispatchEvent(new KeyboardEvent("keydown", { code: "Enter" }));

    // Callback should not be called again as hook is disabled
    expect(callback).toHaveBeenCalledTimes(1);
  });
});