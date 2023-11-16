import React, { useReducer } from 'react';

type NativeChangeEvents = React.ChangeEvent<
    HTMLInputElement & HTMLTextAreaElement
>;

/**
 * Hook for managing forms with ease, it takes one object as optional argument.
 *
 * @param defaultValues - used to populate the entire form values.
 * @param onSubmit?:(data:T) => void - will trigger on the submit event.
 * @param onReset?:(data:T) => void - will restore initial values
 * @return [data, (event:NativeChangeEvents) =>void, (event:React.SyntheticEvent) => void, () => void]}
 *
 * @example
 * const [{ firstName, lastName }, handleChange] = useForm({ firstName: "", lastName: ""});
 *
 * <input name="firstName" value={firstName} onChange={handleChange} />
 * <input name="lastName" value={lastName} onChange={handleChange} />
 */
export function useForm<T>(
    defaultValues: T,
    onSubmit?: (data: T) => void,
    onReset?: (data: T) => void
): [
    T,
    (event: NativeChangeEvents) => void,
    (event: React.SyntheticEvent) => void,
    () => void
] {
    const [formData, setFormData] = useReducer((prev: T, next: Partial<T>) => {
        return { ...prev, ...next };
    }, defaultValues);

    const onHandleChange = (event: NativeChangeEvents) => {
        const { name, value, checked } = event.target;
        if (['checkbox'].includes(event.target.type)) {
            setFormData({ ...formData, [name]: checked });
            return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const onHandleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (onSubmit) onSubmit(formData);
    };

    const onHandleReset = () => {
        setFormData(defaultValues);
        if (onReset) onReset(defaultValues);
    };

    return [formData, onHandleChange, onHandleSubmit, onHandleReset];
}
