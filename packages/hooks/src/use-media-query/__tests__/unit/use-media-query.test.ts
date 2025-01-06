// Hook
import { useMediaQuery } from "../../index";
// Utilities
import { renderHook, act } from "@testing-library/react";
import { type Mock } from "vitest";

describe("useMediaQuery", () => {
  let mockMatchMedia: Mock;

  beforeEach(() => {
    mockMatchMedia = vi.fn((query) => ({
      matches: query.includes("min-width: 1024px"),
      media: query,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    }));

    window.matchMedia = mockMatchMedia;
  });

  it("returns the defaultValue when provided", () => {
    const { result } = renderHook(() =>
      useMediaQuery({ query: "(min-width: 1024px)", defaultValue: true })
    );

    expect(result.current).toBe(true);
  });

  it("responds to a matching media query", () => {
    const { result } = renderHook(() => useMediaQuery({ query: "(min-width: 1024px)" }));

    expect(result.current).toBe(true); // Match because of mockMatchMedia
  });

  it("responds to a non-matching media query", () => {
    const { result } = renderHook(() => useMediaQuery({ query: "(max-width: 1023px)" }));

    expect(result.current).toBe(false); // No match because of mockMatchMedia
  });

  it("handles multiple queries and matches any", () => {
    const { result } = renderHook(() =>
      useMediaQuery({
        query: ["(min-width: 1024px)", "(max-width: 1023px)"]
      })
    );

    expect(result.current).toBe(true); // One query matches
  });

  it("updates when the media query changes", () => {
    const mockAddEventListener = vi.fn();
    const mockRemoveEventListener = vi.fn();

    mockMatchMedia.mockImplementation((query) => ({
      matches: query.includes("min-width: 1024px"),
      media: query,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener
    }));

    const { result, rerender } = renderHook(({ query }) => useMediaQuery({ query }), {
      initialProps: { query: "(min-width: 1024px)" }
    });

    expect(result.current).toBe(true);

    act(() => {
      mockMatchMedia.mockImplementationOnce((query) => ({
        matches: false,
        media: query,
        addEventListener: mockAddEventListener,
        removeEventListener: mockRemoveEventListener
      }));

      rerender({ query: "(max-width: 1023px)" });
    });

    expect(result.current).toBe(false);
  });
});
