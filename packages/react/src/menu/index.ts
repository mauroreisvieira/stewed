import { Menu as Root } from './Menu';
import { MenuItem } from './MenuItem';
import { MenuGroup } from './MenuGroup';

// export type { MenuProps } from './Menu';
// export type { MenuItemProps } from './MenuItem';

export const Menu = Object.assign(Root, {
    Item: MenuItem,
    Group: MenuGroup,
});
