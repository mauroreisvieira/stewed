import React from "react";
// Context
import { useTabs } from "./TabsContext";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface TabsPanelProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Sets or retrieves the value of a tab panel. */
  value: string;
}

export function TabsPanel({
  value,
  className,
  children,
  ...props
}: TabsPanelProps): React.ReactElement {
  // Get tab context value and functions.
  const { value: selectedValue } = useTabs();

  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Tabs}__panel`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      extraClasses: className
    })
  };

  return (
    <div role="tabpanel" className={cssClasses.root} {...props} hidden={value !== selectedValue}>
      {children}
    </div>
  );
}
