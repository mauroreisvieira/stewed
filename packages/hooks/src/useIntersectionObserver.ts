import { RefObject, useState, useEffect } from "react";

export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = "0%",
    freezeOnceVisible = false,
  }: { freezeOnceVisible?: boolean } & IntersectionObserverInit
): IntersectionObserverEntry | undefined {
  const [observerEntry, setObserverEntry] =
    useState<IntersectionObserverEntry>();
  const frozen = observerEntry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setObserverEntry(observerEntry);
  };

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, frozen]);

  return observerEntry;
}
