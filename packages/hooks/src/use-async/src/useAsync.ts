import { useState, useCallback, useEffect } from "react";

type Status = "idle" | "pending" | "success" | "error";

/**
 * Hook to handle asynchronous operations.
 *
 * @template T The type of the result returned by the async function.
 * @param asyncFunction The asynchronous function to be executed.
 * @param immediate If true, the asyncFunction is executed immediately after the hook is mounted. Default is true.
 * @returns An object containing:
 * - `execute`: A function to manually trigger the async function.
 * - `status`: The current status of the async operation ('idle', 'pending', 'success', 'error').
 * - `value`: The result of the async operation (if successful).
 * - `error`: The error object (if the async operation fails).
 */
export function useAsync<T>(asyncFunction: () => Promise<T>, immediate = true) {
  const [status, setStatus] = useState<Status>("idle");
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setStatus("pending");
    setValue(null);
    setError(null);

    return asyncFunction()
      .then((response: T) => {
        setValue(response);
        setStatus("success");
      })
      .catch((error: Error) => {
        setError(error);
        setStatus("error");
      });
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
}
