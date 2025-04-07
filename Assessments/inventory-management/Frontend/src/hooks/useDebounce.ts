import { useEffect, useState } from "react";

const useDebounce = ({
  value,
  delay = 1000,
}: {
  value: string;
  delay: number;
}) => {
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return debounceValue;
};

export default useDebounce;
