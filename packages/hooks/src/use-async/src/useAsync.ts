import { useState, useCallback, useEffect } from "react";

type Status = "idle" | "pending" | "success" | "error";

interface UseAsync<T> {
  /**
   * Function to execute the asynchronous operation.
   * @returns A promise that resolves when the operation is complete.
   */
  execute: () => Promise<void>;
  /**
   * The current status of the async operation.
   * - "idle": Initial state, no operation in progress.
   * - "pending": The operation is currently being executed.
   * - "success": The operation completed successfully.
   * - "error": The operation failed with an error.
   */
  status: Status;
  /**  The result of the asynchronous operation, or null if it hasn't completed or failed. */
  value: T | null;
  /** The error encountered during the asynchronous operation, or null if there was no error. */
  error: Error | null;
}

/**
 * Hook to manage asynchronous operations with state handling.
 *
 * @template T The type of the result returned by the async function.
 * @param asyncFunction A function that returns a promise to be executed asynchronously.
 * @param immediate Optional parameter that determines if the asyncFunction should be executed immediately after the hook is mounted. Defaults to true.
 * @returns An object containing the execute function, current status, result value, and any encountered error.
 */
export function useAsync<T>(asyncFunction: () => Promise<T>, immediate = true): UseAsync<T> {
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
