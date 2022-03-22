import { useState, useEffect } from 'react';

interface Response<T> {
    loading: boolean;
    error?: string;
    data: T[];
}

export function useFetch<T>(url: RequestInfo,  options?: RequestInit, aborted: boolean): Response<T> {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () =>
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            signal,
            ...options,
        })
            .then((response) => response.json())
            .then(({ data }) => {
                setData(data);
                setLoading(false);
                return true;
            });

    useEffect(() => {
        fetchData().catch((error) => setError(error.name === 'AbortError' ? 'Aborted' : error));

        return () => controller.abort();
    }, [controller, options, signal, url]);

    useEffect(() => {
        if (aborted) controller.abort();
    }, [aborted]);

    return {
        data,
        error,
        loading,
    };
};
