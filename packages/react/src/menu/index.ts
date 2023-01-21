import { Menu as Root } from './Menu';
import { MenuItem } from './MenuItem';
import { MenuSection } from './MenuSection';

export type { MenuProps } from './Menu';
export type { MenuItemProps } from './MenuItem';

export const Menu = Object.assign(Root, {
    Item: MenuItem,
    Section: MenuSection,
});
