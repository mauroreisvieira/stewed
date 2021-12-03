import { ChangeEvent, SyntheticEvent, useState } from "react";

type NativeElement = ChangeEvent<HTMLInputElement & HTMLTextAreaElement>;

export function useForm<T>(
    initialValues: T,
    onSubmit?: (data: T) => void
): [
    T,
    (event: NativeElement) => void,
    (event: SyntheticEvent) => void
] {
    const [formData, setFormData] = useState<T>(initialValues);

    const handleInputChange = (event: NativeElement) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (onSubmit) onSubmit(formData);
    };

    return [formData, handleInputChange, handleSubmit];
}
