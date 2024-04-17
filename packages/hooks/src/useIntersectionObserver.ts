import { RefObject, useState, useEffect, useCallback } from "react";

export const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = "0%",
    freezeOnceVisible = false,
  }: { freezeOnceVisible?: boolean } & IntersectionObserverInit,
): IntersectionObserverEntry | undefined => {
  const [observerEntry, setObserverEntry] = useState<IntersectionObserverEntry>();
  const frozen = observerEntry?.isIntersecting && freezeOnceVisible;

  const updateEntry = useCallback((): void => {
    setObserverEntry(observerEntry);
  }, [observerEntry]);

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, frozen, root, rootMargin, threshold, updateEntry]);

  return observerEntry;
};
