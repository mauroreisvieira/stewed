import { useMemo, useState, type Dispatch, type SetStateAction } from "react";

/**
 * Interface for managing a boolean toggle state.
 */
interface IUseToggle {
  /** The current state of the toggle. */
  isOn: boolean;
  /** Sets the toggle state to a specific value. */
  set: Dispatch<SetStateAction<boolean>>;
  /** Turns the toggle on (`true`). */
  on: () => void;
  /** Turns the toggle off (`false`). */
  off: () => void;
  /** Toggles the state between `true` and `false`. */
  toggle: () => void;
  /** Resets the toggle to its initial state. */
  reset: () => void;
}

/**
 * Hook that manages a boolean state with utility functions to modify it.
 *
 * @param defaultState - The initial state value.
 * @returns An object containing the current state and functions to manipulate it.
 *
 * @example
 * ```tsx
 * const { isOn, toggle } = useToggle();
 *
 * return (
 *   <div>
 *     <button onClick={toggle}>Toggle</button>
 *     <p>The state is: {isOn ? 'On' : 'Off'}</p>
 *   </div>
 * );
 * ```
 */
export function useToggle(defaultState = false): IUseToggle {
  // initialize the initial state from the provided default value
  const [initState] = useState(defaultState);

  // create a state variable to track the toggle's current state
  const [isOn, setOn] = useState(initState);

  return useMemo(
    () => ({
      /** current state of the toggle */
      isOn,
      /** function to manually set the toggle state */
      set: setOn,
      /** sets the toggle state to `true` */
      on: (): void => setOn(true),
      /** sets the toggle state to `false` */
      off: (): void => setOn(false),
      /** toggles the state between `true` and `false` */
      toggle: (): void => setOn((prevIsOn) => !prevIsOn),
      /** resets the toggle to its initial state */
      reset: (): void => setOn(initState)
    }),
    [initState, isOn]
  );
}
