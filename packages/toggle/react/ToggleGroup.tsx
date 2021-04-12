import classNames from 'classnames';
import * as React from 'react';
import { useMeasure } from '../../utils/useMeasure';
import { ToggleContext } from './ToggleContext';

interface ToggleGroupProps {
    selectedValue: string;
    onGroupChange: (value: string) => void;
    className?: string;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
    selectedValue,
    onGroupChange,
    className,
    children,
}: ToggleGroupProps &
React.PropsWithChildren<ToggleGroupProps>): React.ReactElement => {
    const groupRef = React.useRef<HTMLDivElement>(null);
    const groupContentRef = React.useRef<HTMLDivElement>(null);

    const groupMeasure = useMeasure(groupRef);
    const groupContentMeasure = useMeasure(groupContentRef);
    const isVertical = groupContentMeasure.width > groupMeasure.width;

    const rootClassName = 'toggle-group';
    const computedClasses = classNames(rootClassName, className, {
        'is-vertical': isVertical,
    });

    return (
        <div ref={groupRef} className={computedClasses}>
            <div className={`${rootClassName}__scroll`}>
                { isVertical && (
                    <div className={`${rootClassName}__content is-vertical`}>
                        { children }
                    </div>
                ) }
                <div ref={groupContentRef} className={`${rootClassName}__content`}>
                    <ToggleContext.Provider
                        value={{
                            selectedValue,
                            onGroupChange,
                        }}>
                        { children }
                    </ToggleContext.Provider>
                </div>
            </div>
        </div>
    );
};
