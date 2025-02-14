import { useEffect, useRef, useState } from 'react';

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Please use this hook only in edge cases!
 *
 * Ensures that the callback will be executed when the time from last callback execution more than delayInMs
 */
export const useDebounceCallback = <T extends (...args: any[]) => void>(
  callback: T,
  delayInMs: number,
): ((...args: Parameters<T>) => void) => {
  const lastExecutionTryTime = useRef(0);

  const throttledFunc = (...args: Parameters<T>) => {
    const timeoutId = setTimeout(() => {
      callback(...args);
    }, delayInMs);

    const now = Date.now();
    if (now - lastExecutionTryTime.current < delayInMs) {
      clearTimeout(timeoutId);
    }
    lastExecutionTryTime.current = now;
  };

  return throttledFunc;
};
