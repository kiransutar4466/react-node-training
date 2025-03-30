import { useEffect, useState } from "react";

const useDebounce = (value: string, delay = 500) => {
  const [debounceValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
