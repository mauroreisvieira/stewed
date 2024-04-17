import { useEffect } from "react";

export type ResizeObserverCallback = (
  entries: ResizeObserverEntry[],
  observer: ResizeObserver,
) => void;

interface ResizeObserverProps<T> {
  element: T;
  enabled: boolean;
  callback: ResizeObserverCallback | null;
}

export const useResizeObserver = <T extends HTMLElement>({
  element,
  enabled,
  callback,
}: ResizeObserverProps<T>) => {
  useEffect(() => {
    if (!element || !enabled || callback === null) return;

    const cb = (entries: ResizeObserverEntry[], observer: ResizeObserver) => {
      callback(entries, observer);
    };

    const resizeObserver = new ResizeObserver(cb);
    resizeObserver.observe(element);

    // eslint-disable-next-line consistent-return
    return () => resizeObserver.disconnect();
  }, [element, callback, enabled]);
};
