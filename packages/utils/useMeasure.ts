import * as React from 'react';

export type DOMRectType = {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
};

export const useMeasure = (
    ref: React.MutableRefObject<HTMLDivElement | undefined | null>
): DOMRectType => {
    const [rect, setRect] = React.useState<DOMRectType>({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    });

    React.useEffect(() => {
        if (!ref.current) return;
        const myRef = ref.current;

        const ro = new ResizeObserver(() => {
            setRect(myRef.getBoundingClientRect());
        });
        ro.observe(myRef);

        return (): void => {
            ro?.unobserve(myRef);
        };
    }, [ref]);

    return rect;
};
