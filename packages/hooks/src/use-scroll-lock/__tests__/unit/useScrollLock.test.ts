import { useScrollLock } from "../../index";
// Utilities
import { renderHook } from "@testing-library/react";

describe("useScrollLock", () => {
  const originalOverflow = document.body.style.overflow;

  afterEach(() => {
    // Reset the body style to its original state after each test
    document.body.style.overflow = originalOverflow;
  });

  it("should set body overflow to 'hidden' when enabled is true", () => {
    renderHook(() => useScrollLock({ enabled: true }));

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("should not change body overflow when enabled is false", () => {
    renderHook(() => useScrollLock({ enabled: false }));

    expect(document.body.style.overflow).toBe(originalOverflow);
  });

  it("should restore body overflow style on cleanup when enabled is true", () => {
    const { unmount } = renderHook(() => useScrollLock({ enabled: true }));

    expect(document.body.style.overflow).toBe("hidden");

    // Unmount the hook and check if the overflow style is restored
    unmount();
    expect(document.body.style.overflow).toBe(originalOverflow);
  });

  it("should update overflow style when enabled changes", () => {
    const { rerender } = renderHook((props) => useScrollLock(props), {
      initialProps: { enabled: true }
    });

    // Initially, overflow should be "hidden"
    expect(document.body.style.overflow).toBe("hidden");

    // Change enabled to false and rerender
    rerender({ enabled: false });
    expect(document.body.style.overflow).toBe(originalOverflow);

    // Change enabled back to true and rerender
    rerender({ enabled: true });
    expect(document.body.style.overflow).toBe("hidden");
  });
});
