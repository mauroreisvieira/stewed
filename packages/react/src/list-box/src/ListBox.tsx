import React, { useCallback } from "react";
// Compound Component
import { ListBoxGroup } from "./ListBoxGroup";
import { ListBoxItem } from "./ListBoxItem";
// Hooks
import { useBem, useKeyboardNavigation } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export function ListBox({
  className,
  children,
  onKeyDown,
  ...props
}: React.ComponentPropsWithRef<"div">): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.ListBox, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
  };

  // Define a reference to a list element
  const { ref, onNavigate } = useKeyboardNavigation<HTMLDivElement>({
    target: '[role="option"]:not([aria-disabled])',
  });

  const onHandleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      onNavigate?.(event);
      onKeyDown?.(event);
    },
    [onKeyDown, onNavigate],
  );

  return (
    <div
      ref={ref}
      className={cssClasses.root}
      role="listbox"
      onKeyDown={onHandleKeyDown}
      {...props}
    >
      {children}
    </div>
  );
}

// Compound component composition
ListBox.Item = ListBoxItem;
ListBox.Group = ListBoxGroup;
