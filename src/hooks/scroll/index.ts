import { useState, useMemo, useEffect, RefObject } from 'react';

type HookReturn = [boolean, boolean, () => void, () => void, (e: React.UIEvent<HTMLDivElement>) => void];

const useScroll = (ref: RefObject<HTMLDivElement>): HookReturn => {
    const distance = 50;

    const [atStart, setAtStart] = useState<boolean>(true);
    const [atEnd, setAtEnd] = useState<boolean>(false);
    const [scrollEvent, setScrollEvent] = useState<React.UIEvent<HTMLElement> | null>(null);
    const [interval, setIntervalRef] = useState<NodeJS.Timer | null>(null);

    useEffect(() => {
        const { current } = ref;

        if (!current) return;

        if (current.scrollHeight <= current.clientHeight) {
            setAtEnd(true);
            setAtStart(true);
        }

        if (current.scrollTop === 0) {
            setAtStart(true);
        } else { setAtStart(false); }

        if (current.scrollTop >= current.scrollHeight - current.clientHeight - 1) {
            setAtEnd(true);
        } else { setAtEnd(false) }

        return () => {
            clearInterval(interval as NodeJS.Timer);
        };

    }, [ref, scrollEvent]);

    // useEffect(() => {
    //     const { current } = ref;

    //     if (current) {
    //         scroll(current.scrollHeight);
    //     }
    // }, [ref]);

    const handleOnScroll = (e: React.UIEvent<HTMLDivElement>) => {
        setScrollEvent(e);
    }

    const scroll = (distance: number): void => {
        ref.current?.scrollTo({ behavior: 'smooth', top: distance });
    };

    const scrollUp = () => {
        const _scrollUp = ref.current?.scrollTop || 0;
        scroll(_scrollUp - distance);
    };

    const scrollDown = () => {
        const _scrollUp = ref.current?.scrollTop || 0;
        scroll(_scrollUp + distance);
    };

    // const up = (): void => {
    //     const newInterval = setInterval(() => {
    //         scrollUp();
    //     }, scrollSpeed);
    //     setIntervalRef(newInterval);
    // };

    // const down = (): void => {
    //     const newInterval = setInterval(() => {
    //         scrollDown();
    //     }, scrollSpeed);
    //     setIntervalRef(newInterval);
    // };

    return [ atStart, atEnd, scrollUp, scrollDown, handleOnScroll];
};

export { useScroll };
