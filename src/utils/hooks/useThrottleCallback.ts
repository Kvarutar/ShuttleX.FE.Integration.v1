import { useRef } from 'react';

/**
 * Please use this hook only in edge cases!
 *
 * Ensures that the callback will be executed no more often than the delayInMs.
 */
export const useThrottleCallback = <T extends (...args: any[]) => void>(
  callback: T,
  delayInMs: number,
): ((...args: Parameters<T>) => void) => {
  const lastExecutionTime = useRef(0);

  const throttledFunc = (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastExecutionTime.current > delayInMs) {
      callback(...args);
      lastExecutionTime.current = now;
    }
  };

  return throttledFunc;
};
