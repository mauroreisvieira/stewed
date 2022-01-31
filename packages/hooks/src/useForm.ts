import * as React from 'react';

type NativeElement = React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>;

export function useForm<T>(
    initialValues: T,
    onSubmit?: (data: T) => void,
    onCancel?: (data: T) => void,
): [T, (event: NativeElement) => void, (event: React.SyntheticEvent) => void, () => void] {
    const [formData, setFormData] = React.useState<T>(initialValues);

    const handleInputChange = (event: NativeElement) => {
        const { name, value, checked } = event.target;
        if (['checkbox', 'radio'].includes(event.target.type)) {
            setFormData({ ...formData, [name]: checked });
            return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (onSubmit) onSubmit(formData);
    };

    const handleCancel = () => {
        setFormData(initialValues);
        if (onCancel) onCancel(initialValues);
    };

    return [formData, handleInputChange, handleSubmit, handleCancel];
}
