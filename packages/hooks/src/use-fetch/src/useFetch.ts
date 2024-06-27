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
  /** The data returned by the fetch operation, if any. */
  data?: T;
  error: Error | undefined;
}

interface FetchOptions extends RequestInit {
  /** Whether the fetch request should be aborted. */
  aborted?: boolean;
}

/**
 * Custom React hook to perform a fetch request.
 *
 * @template T The type of the data expected from the response.
 * @param url The resource that you wish to fetch.
 * @param options Optional configuration object for the fetch request.
 * @returns An object containing:
 * - `data`: The fetched data, if available.
 * - `status`: The current status of the fetch request ('loading', 'loaded', 'error', 'aborted').
 * - `error`: The error object, if the fetch request fails.
 */
export function useFetch<T>(url: RequestInfo, options: FetchOptions = {}): FetchResponse<T> {
  const [data, setData] = useState<T>();
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<Error>();
  const controller = useRef<AbortController>(new AbortController());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          signal: controller.current.signal,
          ...options,
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = (await response.json()) as T;
        setData(result);
        setStatus("loaded");
      } catch (err: unknown) {
        if ((err as Error).name === "AbortError") {
          setStatus("aborted");
        } else {
          setError(err as Error);
          setStatus("error");
        }
      }
    };

    fetchData();

    return () => {
      controller.current.abort();
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

