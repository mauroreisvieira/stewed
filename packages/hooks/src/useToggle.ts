import { useReducer, Reducer } from 'react';

export function useToggle<T>(
    initialValue: T = false as unknown as T,
    fn: (currentValue: T, action?: unknown) => T = (value: T) =>
        !value as unknown as T
) {
    return useReducer<Reducer<T, unknown>>(fn, initialValue);
}
