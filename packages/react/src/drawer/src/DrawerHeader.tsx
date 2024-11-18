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

export function DrawerHeader({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Drawer}__header`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
  };

  // Get function to close the drawer from the context
  const { onClose } = useDrawer();

  return (
    <div className={cssClasses.root} {...props}>
      {children}

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
