import { useCallback, useState, useEffect, Dispatch, SetStateAction } from "react";

/**
 * Hook to manage state synced with localStorage.
 *
 * @template T - The type of the state value.
 * @param {string} key - The key under which the value is stored in localStorage.
 * @param {T | (() => T)} initialValue - The initial value or a function that returns the initial value.
 * @returns {[T, Dispatch<SetStateAction<T>>, () => void]} - The current value, a setter function, and a remove function.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
): [T, Dispatch<SetStateAction<T>>, () => void] {
  return useStorage(key, initialValue, window.localStorage);
}

/**
 * Hook to manage state synced with sessionStorage.
 *
 * @template T - The type of the state value.
 * @param {string} key - The key under which the value is stored in sessionStorage.
 * @param {T | (() => T)} initialValue - The initial value or a function that returns the initial value.
 * @returns {[T, Dispatch<SetStateAction<T>>, () => void]} - The current value, a setter function, and a remove function.
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T | (() => T)
): [T, Dispatch<SetStateAction<T>>, () => void] {
  return useStorage(key, initialValue, window.sessionStorage);
}

/**
 * Hook to manage state synced with a given storage object (localStorage or sessionStorage).
 *
 * @template T - The type of the state value.
 *
 * @param {string} key - The key under which the value is stored.
 * @param {T | (() => T)} initialValue - The initial value or a function that returns the initial value.
 * @param {Storage} storageObject - The storage object to use (localStorage or sessionStorage).
 * @returns {[T, Dispatch<SetStateAction<T>>, () => void]} - The current value, a setter function, and a remove function.
 */
function useStorage<T>(
  key: string,
  initialValue: T | (() => T),
  storageObject: Storage
): [T, Dispatch<SetStateAction<T>>, () => void] {
  const [value, setValue] = useState<T>(() => {
    // Attempt to retrieve stored value
    const jsonValue = storageObject.getItem(key);

    if (jsonValue) {
      return JSON.parse(jsonValue) as T;
    }

    // If no stored value, use the default value
    return typeof initialValue === "function" ? (initialValue as () => T)() : initialValue;
  });

  useEffect(() => {
    // When either `key`, `value`, or `storageObject` changes, this effect runs.
    if (!value) {
      // If `value` is falsy (e.g., null, undefined, empty string), remove the item from storage.
      storageObject.removeItem(key);
    } else {
      // If `value` is truthy, save the item to storage as a JSON string.
      storageObject.setItem(key, JSON.stringify(value));
    }
  }, [key, value, storageObject]);

  const removeValue = useCallback(() => {
    // Clears the value by setting it to `undefined` (cast as type `T`).
    setValue(undefined as unknown as T);
  }, []);

  return [value, setValue, removeValue];
}
