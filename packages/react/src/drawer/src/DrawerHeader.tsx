import React from "react";
// UI Components
import { Button, Icon } from "../../index";
// Context
import { useDrawer } from "./DrawerContext";
// Tokens
import { components } from "@stewed/tokens";
// Hooks
import { useBem } from "@stewed/hooks";
// Styles
import styles from "./styles/index.module.scss";

export type DrawerHeaderProps = React.ComponentPropsWithoutRef<"div">;

export function DrawerHeader({
  className,
  children,
  ...props
}: DrawerHeaderProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: `${components.Drawer}__header`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
    content: getElement(["content"]),
  };

  // Get function to close the drawer from the context
  const { onClose } = useDrawer();

  return (
    <div className={cssClasses.root} {...props}>
      {children && <div className={cssClasses.content}>{children}</div>}

      {onClose && (
        <Button
          onClick={onClose}
          skin="neutral"
          size="sm"
          appearance="ghost"
          iconOnly
          leftSlot={<Icon.Cross size={18} />}
        />
      )}
    </div>
  );
}
