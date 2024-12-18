import React, { useCallback } from "react";
// Hooks
import { useBem, useKeyboardNavigation } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export type TabsListProps = React.ComponentPropsWithoutRef<"div">;

export function TabsList({
  className,
  children,
  onKeyDown,
  ...props
}: TabsListProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Tabs}__list`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className })
  };

  // Define a reference to a tab list element
  const { ref, onNavigate } = useKeyboardNavigation<HTMLDivElement>({
    target: '[role="tab"]:not([aria-disabled])'
  });

  const onHandleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      onNavigate(event);
      onKeyDown?.(event);
    },
    [onKeyDown, onNavigate]
  );

  return (
    <div
      ref={ref}
      className={cssClasses.root}
      role="tablist"
      tabIndex={-1}
      onKeyDown={onHandleKeyDown}
      {...props}
    >
      {children}
    </div>
  );
}
