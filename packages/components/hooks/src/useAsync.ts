import { useState, useCallback, useEffect } from 'react';

type Status = "idle" | "pending" | "success" | "error";

export function useAsync<T>(asyncFunction: () => Promise<T>, immediate = true) {
    const [status, setStatus] = useState<Status>('idle');
    const [value, setValue] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const execute = useCallback(() => {
        setStatus('pending');
        setValue(null);
        setError(null);

        return asyncFunction()
            .then((response: T) => {
                setValue(response);
                setStatus('success');
            })
            .catch((error: Error) => {
                setError(error);
                setStatus('error');
            });
    }, [asyncFunction]);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return { execute, status, value, error };
};
