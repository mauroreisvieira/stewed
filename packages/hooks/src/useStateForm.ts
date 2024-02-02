import React, { useMemo, useReducer, SyntheticEvent } from "react";
// Utilities
import { objectKeys } from "@stewed/utilities";

type NativeChangeEvents = React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>;

type FormValidators<T> = {
  [key in keyof T]?: {
    /** Regular expression used for validation. */
    exp: RegExp;
    /** Description of the validation criteria. */
    description: string;
  };
};

interface UseStateFormProps<T> {
  /** Initial values for the form fields. */
  initialValues: T;
  /**
   * Callback function triggered when the form is submitted.
   * @param data - The current form data.
   */
  onSubmit?: (data: T) => void;
  /**
   * Callback function triggered when the form is reset.
   * @param data - The initial form data.
   */
  onReset?: (data: T) => void;
  /** Validators for the form fields. */
  validators?: FormValidators<T>;
}

interface UseStateForm<T> {
  /** Represents the current state of the form. */
  formData: { [key in keyof T]: { value: T[keyof T]; valid: boolean; error?: string } };
  /** Function to update the form data state */
  setFormData: React.Dispatch<Partial<T>>;
  /** Event handler for form field changes. */
  onFormChange: (event: NativeChangeEvents) => void;
  /** Event handler for form submission. */
  onFormSubmit: (event: SyntheticEvent) => void;
  /** Event handler for form reset. */
  onFormReset: () => void;
}

/**
 * Hook for managing forms with ease, it takes one object as optional argument.
 *
 * @param {UseStateFormProps<T>} options - Options object containing form initial values, validators, submit and reset callbacks.
 * @returns {UseStateForm<T>} - Returns an object containing form state and handlers.
 *
 * @example
 * const { data: { firstName, lastName }, onFormChange } = useStateForm({ initialValues: { firstName: "", lastName: ""}});
 *
 * <input name="firstName" value={firstName} onChange={onFormChange} />
 * <input name="lastName" value={lastName} onChange={onFormChange} />
 */
export function useStateForm<T>({
  initialValues,
  validators,
  onSubmit,
  onReset,
}: UseStateFormProps<T>): UseStateForm<T> {
  const [formData, setFormData] = useReducer((prev: T, next: Partial<T>) => {
    return { ...prev, ...next };
  }, initialValues);

  // Handle form input change
  const onHandleChange = (event: NativeChangeEvents) => {
    const { name, value, checked } = event.target;
    if (["checkbox"].includes(event.target.type)) {
      setFormData({ ...formData, [name]: checked });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const onHandleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  // Handle form reset
  const onHandleReset = () => {
    setFormData(initialValues);
    if (onReset) onReset(initialValues);
  };

  // Memoize form data to optimize performance
  const data = useMemo(
    () =>
      objectKeys(formData).reduce(
        (acc, key) => {
          acc[key] = {
            value: formData[key],
            valid: formData[key]
              ? validators?.[key]?.exp.exec(formData[key] as string) !== null
              : true,
            error: validators?.[key]?.description,
          };
          return acc;
        },
        {} as UseStateForm<T>["formData"],
      ),
    [formData, validators],
  );

  return {
    formData: data,
    setFormData,
    onFormChange: onHandleChange,
    onFormSubmit: onHandleSubmit,
    onFormReset: onHandleReset,
  };
}