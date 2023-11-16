import { useState, useEffect } from 'react';

type LooseAutoComplete<T extends string> = T | Omit<string, T>;

type Status = LooseAutoComplete<'loading' | 'loaded' | 'aborted'>;

type Response<T> = {
    status: Status;
    data?: T;
}

type FetchOptions = RequestInit & {
    aborted?: boolean;
};

export function useFetch<T>(url: RequestInfo, options: FetchOptions = {}): Response<T> {
    const { aborted, ...init } = options;
    const [data, setData] = useState<T>();
    const [status, setStatus] = useState<Status>('');

    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () =>
        fetch(url, {
            signal,
            ...init
        })
            .then((response) => response.json())
            .then((results) => {
                setStatus('loaded');
                setData(results);
                return true;
            });

    useEffect(() => {
        if (url) setStatus('loading');
        fetchData().catch((error) => setStatus(error.name === 'AbortError' ? 'aborted' : error));

        return () => controller.abort();
    }, [url]);

    useEffect(() => {
        setStatus('aborted');
        if (aborted) controller.abort();
    }, [aborted]);

    return {
        data,
        status,
    };
};
