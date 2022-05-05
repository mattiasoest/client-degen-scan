import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initValue;

    const item = window.localStorage.getItem(key);

    if (item) {
      try {
        return JSON.parse(item);
      } catch (err) {
        console.log("Failed to parse");
      }
    }

    if (initValue instanceof Function) {
      return initValue();
    }

    return initValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}
