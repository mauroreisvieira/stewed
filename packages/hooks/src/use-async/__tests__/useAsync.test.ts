import { useAsync } from "../index";
// Utilities
import { renderHook, act, waitFor } from "@testing-library/react";

describe("useAsync", () => {
  it("initially sets status to 'idle' and does not call the async function if immediate is false", () => {
    const asyncFunction = vi.fn().mockResolvedValue("Success");
    const { result } = renderHook(() => useAsync({ queryFn: asyncFunction, immediate: false }));

    expect(result.current.status).toBe("idle");
    expect(result.current.value).toBe(null);
    expect(result.current.error).toBe(null);
    expect(asyncFunction).not.toHaveBeenCalled();
  });

  it("immediately calls async function and updates status/value on success when immediate is true", async () => {
    const asyncFunction = vi.fn().mockResolvedValue("Success");
    const { result } = renderHook(() => useAsync({ queryFn: asyncFunction, immediate: true }));

    expect(result.current.status).toBe("pending");

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    expect(result.current.value).toBe("Success");
    expect(result.current.error).toBe(null);
    expect(asyncFunction).toHaveBeenCalledTimes(1);
  });

  it("updates status to 'error' and sets error if async function fails", async () => {
    const error = new Error("it Error");
    const asyncFunction = vi.fn().mockRejectedValue(error);
    const { result } = renderHook(() => useAsync({ queryFn: asyncFunction, immediate: true }));

    expect(result.current.status).toBe("pending");

    await waitFor(() => {
      expect(result.current.status).toBe("error");
    });

    expect(result.current.value).toBe(null);
    expect(result.current.error).toBe(error);
  });

  it("allows manual execution of the async function via execute method", async () => {
    const asyncFunction = vi.fn().mockResolvedValue("Manual Success");
    const { result } = renderHook(() => useAsync({ queryFn: asyncFunction, immediate: false }));

    expect(result.current.status).toBe("idle");

    act(() => {
      result.current.execute();
    });

    expect(result.current.status).toBe("pending");

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    expect(result.current.value).toBe("Manual Success");
    expect(result.current.error).toBe(null);
  });

  it("resets status and value each time execute is called", async () => {
    const asyncFunction = vi
      .fn()
      .mockResolvedValueOnce("First Success")
      .mockResolvedValueOnce("Second Success");
    const { result } = renderHook(() => useAsync({ queryFn: asyncFunction, immediate: false }));

    act(() => {
      result.current.execute();
    });

    expect(result.current.status).toBe("pending");

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    expect(result.current.value).toBe("First Success");

    act(() => {
      result.current.execute();
    });

    expect(result.current.status).toBe("pending");
    expect(result.current.value).toBe(null); // Value should reset

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    expect(result.current.value).toBe("Second Success");
  });
});
