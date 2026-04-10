// hooks/useInfiniteScroll.js
import { useRef, useEffect } from 'react';

export function useInfiniteScroll(onIntersect, { enabled = true } = {}) {
    const sentinelRef = useRef(null);

    useEffect(() => {
        if (!enabled) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    onIntersect();
                }
            },
            { threshold: 0.1 }
        );

        const el = sentinelRef.current;
        if (el) observer.observe(el);

        return () => {
            if (el) observer.unobserve(el);
        };
    }, [onIntersect, enabled]);

    return sentinelRef;
}