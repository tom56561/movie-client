import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {

  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      console.log("useLocalStorageState useEffect", value, key);
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
