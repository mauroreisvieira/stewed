import { useCallback, useSyncExternalStore } from 'react';

export function createState<T>(initialValue: T): {
    listeners: [() => void] | undefined;
    state: T;
} {
    return {
        listeners: undefined,
        state: initialValue,
    };
}

export function useGlobalState<T>(config: ReturnType<typeof createState<T>>) {
    const setState = useCallback((stateOrSetter: T) => {
        let next = stateOrSetter;
        if (typeof stateOrSetter === 'function') {
            next = stateOrSetter(config.state);
        }
        config.state = next;
        config.listeners?.forEach((l) => l());
    }, []);

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
