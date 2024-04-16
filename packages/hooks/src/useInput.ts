import React, { useState, useEffect, useCallback } from "react";

type InputValue = React.HTMLAttributes<HTMLInputElement>["defaultValue"];

type InputHandler<T> = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: T;
};

interface UseInputOptions<T> {
  validate?: (newValue: T, currentValue: T) => boolean;
}

export function useInput<T extends InputValue>(
  initialValue: T,
  { validate }: UseInputOptions<T> = {},
): InputHandler<T> {
  const [value, setValue] = useState<T>(initialValue);

  const onHandleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value as T;
      let shouldUpdate = true;

      if (validate) {
        shouldUpdate = validate(newValue, value);
      }

      if (shouldUpdate) setValue(newValue);
    },
    [validate, value],
  );

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return {
    onChange: onHandleChange,
    value,
  };
}
