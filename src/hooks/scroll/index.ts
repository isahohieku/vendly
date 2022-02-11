import type { RefObject } from 'react';
import { useState, useEffect } from 'react';

type HookReturn = [boolean, boolean, boolean, () => void, () => void, () => void, () => void];

const useScroll = (ref: RefObject<HTMLDivElement>): HookReturn => {
  const distance = 50;
  const scrollSpeed = 100;

  const [canScroll, setCanScroll] = useState<boolean>(false);
  const [atStart, setAtStart] = useState<boolean>(true);
  const [atEnd, setAtEnd] = useState<boolean>(false);
  const [interval, setIntervalRef] = useState<NodeJS.Timer | null>(null);

  useEffect(() => {
    const { current } = ref;
    if (!current) return;

    // console.log('current.scrollHeight', current.scrollHeight);

    if (current.scrollHeight <= current.clientHeight) {
      setAtEnd(true);
      setAtStart(true);
      setCanScroll(false);
    } else {
      setCanScroll(true);
    }

    return () => {
      clearInterval(interval as NodeJS.Timer);
    };
  }, [ref.current]);

  const scroll = (distance: number): void => {
    ref.current?.scrollTo({ behavior: 'smooth', left: distance });
  };

  const scrollUp = () => {
    const _scrollUp = ref.current?.scrollTop || 0;
    scroll(_scrollUp - distance);
  };

  const scrollDown = () => {
    const _scrollUp = ref.current?.scrollTop || 0;
    scroll(_scrollUp + distance);
  };

  const up = (): void => {
    const newInterval = setInterval(() => {
      scrollUp();
    }, scrollSpeed);
    setIntervalRef(newInterval);
  };

  const down = (): void => {
    const newInterval = setInterval(() => {
      scrollDown();
    }, scrollSpeed);
    setIntervalRef(newInterval);
  };

  return [canScroll, atStart, atEnd, scrollUp, scrollDown, up, down];
};

export { useScroll };
