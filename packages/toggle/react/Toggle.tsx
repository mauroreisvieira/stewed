import classNames from 'classnames';
import * as React from 'react';

import { Button, ButtonProps } from '../../button/react';
import { ToggleContext } from './ToggleContext';

interface ToggleProps extends Omit<ButtonProps, 'rounded'> {
    value: string;
}

export const Toggle: React.FC<ToggleProps> = ({
    value,
    children,
    ...otherProps
}: ToggleProps & React.PropsWithChildren<ToggleProps>): React.ReactElement => {
    const { className, disabled } = otherProps;

    const rootClassName = 'toggle';
    const computedClasses = classNames(rootClassName, className);
    const context = React.useContext(ToggleContext);

    const computedProps = {
        ...otherProps,
        className: computedClasses,
        disabled: (context && context.selectedValue === value) || disabled,
        onClick: (): void => {
            if (!disabled && context) context.onGroupChange(value);
        }
    };

    return (
        <Button {...computedProps}>
            { children }
        </Button>
    );
};
