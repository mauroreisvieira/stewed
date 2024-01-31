import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export type TabsListProps = React.HTMLAttributes<HTMLElement>;

export function TabsList({
  className,
  children,
  ...props
}: TabsListProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Tabs}__list`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
  };

  return (
    <div className={cssClasses.root} role="tablist" {...props}>
      {children}
    </div>
  );
}
