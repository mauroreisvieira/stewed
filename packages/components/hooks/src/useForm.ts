import { useState, ChangeEvent, SyntheticEvent } from 'react';

type NativeElement = ChangeEvent<HTMLInputElement & HTMLTextAreaElement>;

export function useForm<T>(
    initialValues: T,
    onSubmit?: (data: T) => void,
    onCancel?: (data: T) => void
): [
    T,
    (event: NativeElement) => void,
    (event: SyntheticEvent) => void,
    () => void
] {
    const [formData, setFormData] = useState<T>(initialValues);

    const handleInputChange = (event: NativeElement) => {
        const { name, value, checked } = event.target;
        if (['checkbox', 'radio'].includes(event.target.type)) {
            setFormData({ ...formData, [name]: checked });
            return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (onSubmit) onSubmit(formData);
    };

    const handleCancel = () => {
        setFormData(initialValues);
        if (onCancel) onCancel(initialValues);
    };

    return [formData, handleInputChange, handleSubmit, handleCancel];
}
