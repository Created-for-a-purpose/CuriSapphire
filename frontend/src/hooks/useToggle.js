import { useState } from "react";

export default function useToggle({ defaultValue }) {
  const [value, setValue] = useState(defaultValue);

  function toggleValue(value) {
    setTimeout(() => {
      setValue((currentValue) =>
        typeof value === "boolean" ? value : !currentValue
      );
    }, 100);
  }

  return [value, toggleValue];
}
