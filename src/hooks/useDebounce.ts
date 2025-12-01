import { useEffect, useState } from 'react';

/**
 * Custom hook that debounces a value update
 *
 * Useful for expensive operations like API calls that shouldn't
 * happen on every keystroke. The value will only update after
 * the user stops typing for the specified delay period.
 *
 * @param value - The value to debounce (e.g., search query)
 * @param delay - Delay in milliseconds before updating (e.g., 300)
 * @returns The debounced value
 *
 * @example
 * const searchQuery = 'laptop';
 * const debouncedQuery = useDebounce(searchQuery, 300);
 * // debouncedQuery updates 300ms after user stops typing
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancel the timer if value changes before delay expires
    // This prevents stale updates and ensures only the latest value is used
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
