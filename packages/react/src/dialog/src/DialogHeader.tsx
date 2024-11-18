import React from "react";
// UI Components
import { Button, Icon } from "../../index";
// Context
import { useDialog } from "./DialogContext";
// Tokens
import { components } from "@stewed/tokens";
// Hooks
import { useBem } from "@stewed/hooks";
// Styles
import styles from "./styles/index.module.scss";

interface DialogHeaderProps extends React.ComponentPropsWithoutRef<"div"> {}

export function DialogHeader({
  className,
  children,
  ...props
}: DialogHeaderProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: `${components.Dialog}__header`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
    content: getElement(["content"]),
  };

  const { onClose } = useDialog();

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
