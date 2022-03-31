import { useState, useEffect } from 'react';

type Response<T> = {
    loading: boolean;
    error?: string;
    data: T | undefined;
}

type FetchOptions = RequestInit & {
    aborted?: boolean;
};

export function useFetch<T>(url: RequestInfo, options: FetchOptions = {}): Response<T> {
    const { aborted, ...rest } = options;
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () =>
        fetch(url, rest)
            .then((response) => response.json())
            .then((results) => {
                setData(results);
                setLoading(false);
                return true;
            });

    useEffect(() => {
        fetchData().catch((error) => setError(error.name === 'AbortError' ? 'Aborted' : error));

        return () => controller.abort();
    }, [controller, rest, signal, url]);

    useEffect(() => {
        if (aborted) controller.abort();
    }, [aborted]);

    return {
        data,
        error,
        loading,
    };
};
