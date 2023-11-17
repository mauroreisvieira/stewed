import { useState, useEffect, useRef } from 'react';

type LooseAutoComplete<T extends string> = T | Omit<string, T>;

type Status = LooseAutoComplete<'loading' | 'loaded' | 'aborted'>;

type Response<T> = {
    status: Status;
    data?: T;
};

type FetchOptions = RequestInit & {
    aborted?: boolean;
};

export function useFetch<T>(
    url: RequestInfo,
    options: FetchOptions = {}
): Response<T> {
    const { aborted, ...init } = options;
    const [data, setData] = useState<T>();
    const [status, setStatus] = useState<Status>('');
    const controller = useRef<AbortController>();

    // const controller = new AbortController();
    useEffect(() => {
        controller.current = new AbortController();
        if (!controller.current) return;

        const { signal, abort } = controller.current;
        async function fetchData() {
            fetch(url, {
                signal,
                ...init,
            })
                .then((response) => response.json())
                .then((results) => {
                    setStatus('loaded');
                    setData(results);
                    return true;
                });
        }

        if (url) setStatus('loading');

        fetchData().catch((error) =>
            setStatus(error.name === 'AbortError' ? 'aborted' : error)
        );

        return () => {
            abort();
        };
    }, [init, url]);

    useEffect(() => {
        if (!controller.current) return;

        const { abort } = controller.current;
        setStatus('aborted');
        if (aborted) abort();
    }, [aborted]);

    return {
        data,
        status,
    };
}
