import { useCallback, useState } from "react";

/**
 * Hook that manages a boolean state and provides a function to toggle it.
 *
 * @param initialState - The initial state value. Default is `false`.
 * @returns A tuple containing the current state value and a function to toggle the state.
 *
 * @example
 * ```tsx
 * const [isToggled, onToggle] = useToggle();
 *
 * return (
 *   <div>
 *     <button onClick={toggle}>Toggle</button>
 *     <p>The state is: {isToggled ? 'On' : 'Off'}</p>
 *   </div>
 * );
 *
 * ```
 */
export function useToggle(initialState = false): [boolean, () => void] {
  const [state, setState] = useState<boolean>(initialState);
  const onToggle = useCallback((): void => setState((state) => !state), []);

  return [state, onToggle];
}
