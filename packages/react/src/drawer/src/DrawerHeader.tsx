import React from "react";
// UI Components
import { Button } from "../../button";
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
}: React.ComponentPropsWithRef<"div">): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Drawer}__header`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
  };

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
          leftSlot={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              width={16}
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          }
        />
      )}
    </div>
  );
}
