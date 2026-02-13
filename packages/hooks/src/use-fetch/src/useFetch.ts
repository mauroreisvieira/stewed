import { useEffect, useReducer, useRef } from "react";
import { useNonReactiveCallback } from "../../use-non-reactive-callback";

/** Represents the possible statuses of a fetch operation. */
type Status = "idle" | "loading" | "fetched" | "error";

/**
 * Represents the state of a fetch operation.
 *
 * @template T The type of data being fetched.
 */
export interface UseFetch<T> {
  /** The fetched data, or `null` if no data has been fetched yet or an error occurred. */
  data: T | null;
  /** An error object if the fetch operation failed, or `null` otherwise. */
  error: Error | null;
  /** The current status of the fetch operation. */
  status: Status;
}

/**
 * Represents the possible actions that can be dispatched to update the fetch state.
 *
 * @template T The type of data being fetched.
 */
type FetchAction<T> =
  | {
      /** Action to indicate the fetch operation is in progress. */
      type: "loading";
    }
  | {
      /** Action to update the state with successfully fetched data. */
      type: "fetched";
      /** The data that was fetched. */
      payload: T;
    }
  | {
      /** Action to update the state with an error that occurred during the fetch operation. */
      type: "error";
      /** @property The error that occurred. */
      payload: Error;
    };

/**
 * Represents the reducer function for managing fetch state updates.
 *
 * @template T The type of data being fetched.
 * @param state - The current state of the fetch operation.
 * @param  action - The action to process.
 * @returns The updated fetch state.
 */
type FetchReducer<T> = (state: UseFetch<T>, action: FetchAction<T>) => UseFetch<T>;

/**
 * Custom hook to perform data fetching with caching and state management.
 *
 * @template T The type of the data returned by the fetch.
 *
 * @param url - The URL to fetch data from.
 * @param options - Optional configuration for the fetch request.
 * @returns The state of the fetch operation, including data, error, and status.
 *
 * @example
 * ```ts
 * const { data, error, status } = useFetch<MyDataType>('https://api.example.com/data');
 * ```
 */
export function useFetch<T>(url: string | null, options?: RequestInit): UseFetch<T> {
  const cacheRef = useRef<Record<string, T>>({});

  const useFetchInitialState: UseFetch<T> = {
    data: null,
    error: null,
    status: "idle"
  };

  /**
   * Reducer function to manage the state of a fetch operation.
   *
   * @template T The type of data being fetched.
   * @param state - The current state of the fetch operation.
   * @param action - The action to process and update the state.
   * @returns The updated fetch state based on the action.
   */
  const fetchReducer: FetchReducer<T> = (state, action) => {
    switch (action.type) {
      case "loading":
        return { ...state, status: "loading", error: null };
      case "fetched":
        return {
          ...state,
          status: "fetched",
          data: action.payload,
          error: null
        };
      case "error":
        return { ...state, status: "error", error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, useFetchInitialState);

  const onFetch = useNonReactiveCallback(async (fetchUrl: string) => {
    return fetch(fetchUrl, options);
  });

  useEffect(() => {
    if (typeof url !== "string") return;

    let isCanceled = false;

    /** Fetches a data. */
    const fetchData = async () => {
      const cachedResponse = cacheRef.current[url];

      if (cachedResponse) {
        dispatch({ type: "fetched", payload: cachedResponse });

        return;
      }

      dispatch({ type: "loading" });

      try {
        const res = await onFetch(url);

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const json = (await res.json()) as T;
        cacheRef.current[url] = json;

        if (isCanceled === false) {
          dispatch({ type: "fetched", payload: json });
        }
      } catch (e) {
        if (isCanceled === false) {
          dispatch({ type: "error", payload: e as Error });
        }
      }
    };

    fetchData();

    return () => {
      isCanceled = true;
    };
  }, [url, options, onFetch]);

  return state;
}
