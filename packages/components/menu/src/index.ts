import { Menu as Root } from './Menu';
import { MenuItem } from './MenuItem';
import { MenuSeparator } from './MenuSeparator';
export type { MenuProps } from './Menu';
export type { MenuItemProps } from './MenuItem';

export const Menu = Object.assign(Root, {
    Item: MenuItem,
    Separator: MenuSeparator,
});
