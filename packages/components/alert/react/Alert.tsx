import * as React from 'react';
import { classNames } from '../../../utils/src/classNames';

export interface AlertProps {
    skin: 'primary' | 'success' | 'warning' | 'danger';
    className?: string;
}

export const Alert: React.FC<AlertProps> = ({
    skin = 'primary',
    className,
    children,
}: AlertProps & React.PropsWithChildren<AlertProps>): React.ReactElement => {
    const rootClassName = 'alert';
    const computedClasses = classNames(
        rootClassName,
        className,
        `${rootClassName}--${skin}`
    );
    return (
        <div className={computedClasses}>
            { children }
        </div>
    );
};
