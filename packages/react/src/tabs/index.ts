import { Tabs as Root } from './Tabs';
import { TabItem } from './TabItem';

export type { TabsProps } from './Tabs';
export type { TabItemProps } from './TabItem';

export const Tabs = Object.assign(Root, {
    Tabs: Root,
    Item: TabItem,
});
