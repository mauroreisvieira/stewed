import { useCallback, useState } from 'react';

type SelectHandler<T> = {
    index: number;
    item: T | undefined;
    setIndex: (newIndex: number) => void;
    setItem: (newItem: T) => void;
};

export function useSelect<T>(list: T[], initialIndex = 0): SelectHandler<T> {
    const [selectedIndex, setSelectedIndex] = useState(initialIndex);

    const setItem = useCallback(
        (item: T) => {
            setSelectedIndex(list.indexOf(item));
        },
        [list]
    );

    return {
        index: selectedIndex,
        item: list[selectedIndex],
        setIndex: setSelectedIndex,
        setItem,
    };
}
