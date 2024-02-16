import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export type AvatarGroupProps = React.ComponentPropsWithRef<"div">;

export function AvatarGroup({
  className,
  children,
  ...props
}: AvatarGroupProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Avatar}-group`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
  };

  return (
    <div className={cssClasses.root} {...props}>
      {children}
    </div>
  );
}
