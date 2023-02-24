import { Tabs as Root } from './Tabs';
import { TabsItem } from './TabsItem';

export type { TabsProps } from './Tabs';
export type { TabsItemProps } from './TabsItem';

export const Tabs = Object.assign(Root, {
    Tabs: Root,
    Item: TabsItem,
});
