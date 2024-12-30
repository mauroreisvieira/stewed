import { useCallback, useSyncExternalStore } from "react";

/**
 * Creates a state object with an initial value and optional listeners.
 *
 * This function initializes a state object that holds the provided `initialValue`.
 * The state object includes a `listeners` array, which can be populated with
 * functions to notify when the state changes (though it is undefined by default).
 *
 * @template T - The type of the state value.
 *
 * @param initialValue - The initial value of the state.
 */
export function createState<T>(initialValue: T): {
  /** An optional array of listener functions that can be triggered when the state changes (initially `undefined`). */
  listeners: Array<() => void> | undefined;
  /** The current state value. */
  state: T;
} {
  return {
    listeners: undefined,
    state: initialValue
  };
}

/**
 * A custom hook that stores data (Subject) and a list of listeners (Observers) in global variables.
 *
 * This hook registers a new listener every time it is called, allowing multiple components
 * or parts of the application to observe and react to changes in the global state.
 *
 * The hook uses the provided `config`, which contains the initial state and optional listeners.
 * The listeners will be notified whenever the state changes.
 *
 * @template T - The type of the state data.
 * @param config - The initial configuration, including the initial state and any existing listeners.
 */
export function useGlobalState<T>(config: ReturnType<typeof createState<T>>) {
  const setState = useCallback(
    (stateOrSetter: T) => {
      let next = stateOrSetter;
      if (typeof stateOrSetter === "function") {
        next = stateOrSetter(config.state);
      }

      // eslint-disable-next-line react-compiler/react-compiler
      config.state = next;
      config.listeners?.forEach((l) => l());
    },
    [config]
  );

  const state = useSyncExternalStore(
    (listener) => {
      // register the observer
      config.listeners?.push(listener);

      // cleanup when unmount
      return () => config.listeners?.filter((l) => l !== listener);
    },
    () => config.state
  );

  return [state, setState];
}
