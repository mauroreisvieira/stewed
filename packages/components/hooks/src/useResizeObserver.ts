import * as React from 'react';

export type ResizeObserverCallback = (
    entry: ResizeObserverEntry[],
    observer: ResizeObserver,
) => void;

export const useResizeObserver = <T extends HTMLElement>(
    element: T,
    callback: ResizeObserverCallback,
) => {
    const storedCallback = React.useRef(callback);
    React.useEffect(() => {
        storedCallback.current = callback;
    }, [callback]);

    React.useEffect(() => {
        const cb = (entry: ResizeObserverEntry[], observer: ResizeObserver) =>
            storedCallback.current(entry, observer);

        const resizeObserver = new ResizeObserver(cb);
        resizeObserver.observe(element);

        return () => resizeObserver.disconnect();
    }, [element, storedCallback]);
};
