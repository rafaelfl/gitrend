import { useLayoutEffect, useState, useCallback, RefObject } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export const useResizeObserver = (
    ref: RefObject<HTMLElement>,
    callback?: (entry: Partial<DOMRectReadOnly>) => void,
) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const handleResize = useCallback(
        (entries: ResizeObserverEntry[]) => {
            // fix the ResizeObserver loop limit exceeded error
            window.requestAnimationFrame(() => {
                if (!Array.isArray(entries) || !entries.length) {
                    return;
                }

                // I am only using the first entry
                const entry = entries?.[0];
                setWidth(entry?.contentRect?.width ?? 0);
                setHeight(entry?.contentRect?.height ?? 0);

                if (callback) {
                    callback(entry.contentRect);
                }
            });
        },
        [callback],
    );

    useLayoutEffect(() => {
        if (!ref.current) {
            return;
        }

        const RO: ResizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => handleResize(entries));
        RO.observe(ref.current);

        return () => {
            RO.disconnect();
        };
    }, [ref.current]);

    return [width, height];
};
