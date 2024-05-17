import { useState, useEffect, useRef } from "react";

/**
 * A utility type to allow a string literal type or any other string.
 */
type LooseAutoComplete<T extends string> = T | Omit<string, T>;

/**
 * Represents the status of the fetch operation.
 * Can be "loading", "loaded", "aborted", or any other string.
 */
type Status = LooseAutoComplete<"loading" | "loaded" | "aborted">;


interface Response<T> {
  /** The current status of the fetch operation. */
  status: Status;
  /** The data returned by the fetch operation, if any. */
  data?: T;
}

interface FetchOptions extends RequestInit {
  /** Whether the fetch request should be aborted. */
  aborted?: boolean;
}

/**
 * Hook to fetch data from a given URL.
 *
 * @template T - The type of the data expected to be returned by the fetch.
 *
 * @param url - The resource that you want to fetch.
 * @param options - The options to configure the fetch request.
 * @returns An object containing the status of the fetch operation and the fetched data.
 */
export function useFetch<T>(url: RequestInfo, options: FetchOptions = {}): Response<T> {
  const { aborted, ...init } = options;
  const [data, setData] = useState<T>();
  const [status, setStatus] = useState<Status>("");
  const controller = useRef<AbortController>();

  useEffect(() => {
    controller.current = new AbortController();
    if (!controller.current) return;

    const { signal, abort } = controller.current;
    async function fetchData() {
      fetch(url, {
        signal,
        ...init,
      })
        .then((response) => response.json())
        .then((results) => {
          setStatus("loaded");
          setData(results);
          return true;
        });
    }

    if (url) setStatus("loading");

    fetchData().catch((error) => setStatus(error.name === "AbortError" ? "aborted" : error));

    return () => {
      abort();
    };
  }, [init, url]);

  useEffect(() => {
    if (!controller.current) return;

    const { abort } = controller.current;
    setStatus("aborted");
    if (aborted) abort();
  }, [aborted]);

  return {
    data,
    status,
  };
}
