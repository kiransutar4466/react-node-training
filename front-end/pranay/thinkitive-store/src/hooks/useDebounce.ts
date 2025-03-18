import { useEffect, useState } from "react";

const useDebounce = ({
  value,
  delay = 2000,
}: {
  value: string;
  delay?: number;
}) => {

  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);

    return () => {
      clearTimeout(timeout);
    };
  });

  return debounceValue;
};

export default useDebounce;
