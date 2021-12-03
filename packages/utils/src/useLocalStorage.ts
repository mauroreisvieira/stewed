import { useState, useEffect, useRef } from 'react';

export function useLocalStorage(
        key: string,
        initialValue: string,
        {
            serialize = JSON.stringify,
            deserialize = JSON.parse,
        } = {}
    ) {
    const [state, setState] = useState(() => {
        const valueInLocalStorage = window.localStorage.getItem(key);

        if (valueInLocalStorage) return deserialize(valueInLocalStorage);
        return initialValue;
    });

    const prevKeyRef = useRef(key);

    useEffect(() => {
        const prevKey = prevKeyRef.current;
        if (prevKey !== key) window.localStorage.removeItem(prevKey);
        prevKeyRef.current = key;
        window.localStorage.setItem(key, serialize(state));
    }, [key, serialize, state]);

    return [state, setState];
}
