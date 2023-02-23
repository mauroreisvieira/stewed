import { Avatar as Root } from './Avatar';
import { AvatarGroup } from './AvatarGroup';

export type { AvatarProps } from './Avatar';

export const Avatar = Object.assign(Root, {
    Avatar: Root,
    Group: AvatarGroup,
});
