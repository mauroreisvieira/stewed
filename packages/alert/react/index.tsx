import classNames from 'classnames';
import * as React from 'react';

interface AlertProps {
    skin: 'primary' | 'success';
    className?: string;
}

export const Alert: React.FC<AlertProps> = ({
    skin = 'primary',
    className,
    children,
}: AlertProps & React.PropsWithChildren<AlertProps>): React.ReactElement => {
    const rootClassName = 'alert';
    const computedClasses = classNames(rootClassName, className, {
        [`${rootClassName}--${skin}`]: skin,
    });
    return (
        <div className={computedClasses}>
            { children }
        </div>
    );
};
