import { useState, useEffect, useRef } from "react";

/**
 * A utility type to allow a string literal type or any other string.
 */
type LooseAutoComplete<T extends string> = T | Omit<string, T>;

/**
 * Represents the status of the fetch operation.
 * Can be "loading", "error", loaded", "aborted", or any other string.
 */
type Status = LooseAutoComplete<"loading" | "error" | "loaded" | "aborted" | "unmounted">;

interface FetchResponse<T> {
  /** The current status of the fetch operation. */
  status: Status;
  /** The data returned by the fetch operation. */
  data?: T | null;
  /** The error returned by the fetch operation. */
  error: Error | undefined | null;
}

interface FetchOptions extends RequestInit {
  /** Whether the fetch request should be aborted. */
  aborted?: boolean;
}

/**
 * Custom React hook to perform a fetch request.
 *
 * @template T The type of the data expected from the response.
 * @params url The resource that you wish to fetch.
 * @params options Optional configuration object for the fetch request.
 * @returns An object containing:
 * - `data`: The fetched data, if available.
 * - `status`: The current status of the fetch request ('loading', 'loaded', 'error', 'aborted').
 * - `error`: The error object, if the fetch request fails.
 */
export function useFetch<T>(url: RequestInfo, options: FetchOptions = {}): FetchResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<Error | null>(null);
  const controller = useRef<AbortController>(new AbortController());

  useEffect(() => {
    let isCanceled = false;

    const abortController = controller.current;

    /** Fetches a data. */
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          signal: abortController.signal,
          ...options
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const json = (await response.json()) as T;
        if (!isCanceled) {
          setData(json);
          setStatus("loaded");
        }
      } catch (err: unknown) {
        if (!isCanceled) {
          if ((err as Error).name === "AbortError") {
            setStatus("aborted");
          } else {
            setError(err as Error);
            setStatus("error");
          }
        }
      }
    };

    fetchData();

    return () => {
      isCanceled = true;
      abortController.abort();
      setStatus("unmounted");
    };
  }, [url, options]);

  useEffect(() => {
    if (options.aborted) {
      controller.current.abort();
    }
  }, [options.aborted]);

  return { data, status, error };
}
