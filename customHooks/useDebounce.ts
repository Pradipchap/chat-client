import { useState, useEffect } from "react";

const useDebounce = (value: string, delay: number = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const fn = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(fn);
    };
  }, [value, delay]);
  return debouncedValue;
};

export default useDebounce;
