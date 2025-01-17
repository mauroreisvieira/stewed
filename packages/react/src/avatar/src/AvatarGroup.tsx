import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

/**
 * Props for the AvatarGroup component.
 * Extends the standard div element props to allow for additional customization.
 */
export type AvatarGroupProps = React.ComponentPropsWithoutRef<"div">;

/**
 * AvatarGroup component that renders a group of avatar elements.
 *
 * @param props - The properties for the AvatarGroup component.
 * @returns The rendered AvatarGroup component.
 *
 * @see {@link AvatarGroupProps} for the complete list of props.
 */
export function AvatarGroup({
  className,
  children,
  ...props
}: AvatarGroupProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Avatar}-group`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className })
  };

  return (
    <div className={cssClasses.root} {...props}>
      {children}
    </div>
  );
}
