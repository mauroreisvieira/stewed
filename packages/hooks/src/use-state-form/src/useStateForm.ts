import React, { useMemo, useReducer, SyntheticEvent } from "react";
// Utilities
import { objectKeys } from "@stewed/utilities";

/** Represents native change events for common form elements. */
type NativeChangeEvents = React.ChangeEvent<
  HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement
>;

/**
 * Represents a collection of validation functions for each field in a form.
 *
 * @template T - The type of the form's data object, where each key represents a field name.
 */
type FormValidators<T> = {
  /** Defines a validator for a specific form field. */
  [key in keyof T]?: {
    /** Description of the condition criteria. */
    description?: string;
    /** A function defining the condition for the validator. */
    condition?: () => boolean;
  };
};

/**  Interface for UseStateForm hook  */
interface UseStateFormProps<T> {
  /** Initial values for the form fields. */
  initialValues: T;
  /**
   * Callback function triggered when the form is submitted.
   *
   * @param {T} data - The current form data.
   */
  onSubmit?: (data: T) => void;
  /**
   * Callback function triggered when a form change event occurs.
   *
   * @param {NativeChangeEvents} event - The change event object.
   */
  onChange?: (event: NativeChangeEvents) => void;
  /**
   * Callback function triggered when the form is reset.
   *
   * @param {T} prev - The previous form values.
   * @param {T} current - The current form values.
   */
  onReset?: (prev: T, current: T) => void;
  /**
   * Validators for the form fields.
   *
   * @param {Partial<T>} data - The data of type T for which validators are applied.
   * @returns {FormValidators<T>} The form validator object that will be defined for each element defined by `T`.
   */
  validators?: (data: Partial<T>) => FormValidators<T>;
}

/**
 * Represents the state of a single form field.
 *
 * @template T - The type of the form's data object, where each key represents a field name.
 */
interface FormData<T> {
  /** The current value of the form field. */
  value: T[keyof T];
  /**
   * Indicates whether the field is valid.
   * Can be `true` for valid, `false` for invalid, or `undefined` if not yet validated.
   */
  valid: boolean | undefined;
  /**
   * An optional error message associated with the field.
   * This is typically populated when the field fails validation.
   */
  error?: string;
}

/**
 * Represents the state and operations for managing a form.
 *
 * @template T - The type of the form's data object, where each key represents a field name.
 */
interface UseStateForm<T> {
  /** Represents the current state of the form. */
  formData: { [key in keyof T]: FormData<T> };
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
 * ```tsx
 * const { data: { firstName, lastName }, onFormChange } = useStateForm({ initialValues: { firstName: "", lastName: ""}});
 *
 * <input name="firstName" value={firstName} onChange={onFormChange} />
 * <input name="lastName" value={lastName} onChange={onFormChange} />
 * ```
 */
export function useStateForm<T>({
  initialValues,
  validators,
  onSubmit,
  onReset,
  onChange
}: UseStateFormProps<T>): UseStateForm<T> {
  const [formData, setFormData] = useReducer((prev: T, next: Partial<T>) => {
    return { ...prev, ...next };
  }, initialValues);

  /** Handle form input change */
  const onHandleChange = (event: NativeChangeEvents) => {
    const { name, value, checked } = event.target;

    if (["checkbox", "radio"].includes(event.target.type)) {
      setFormData({ ...formData, [name]: checked });

      return;
    }

    setFormData({ ...formData, [name]: value });
    onChange?.(event);
  };

  /** Handle form submission */
  const onHandleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  /** Handle form reset */
  const onHandleReset = () => {
    setFormData(initialValues);
    onReset?.(formData, initialValues);
  };

  // Memoize form data to optimize performance
  const data = useMemo(
    () =>
      objectKeys(formData).reduce(
        (acc, key) => {
          acc[key] = {
            value: formData[key],
            valid: validators?.(formData)[key]?.condition
              ? validators?.(formData)[key]?.condition?.()
              : true,
            error: validators?.(formData)[key]?.description
          };

          return acc;
        },
        {} as UseStateForm<T>["formData"]
      ),
    [formData, validators]
  );

  return {
    formData: data,
    setFormData,
    onFormChange: onHandleChange,
    onFormSubmit: onHandleSubmit,
    onFormReset: onHandleReset
  };
}
