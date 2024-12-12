import React from "react";
// Compound Component
import { ListBoxGroup } from "./ListBoxGroup";
import { ListBoxItem } from "./ListBoxItem";
import { ListBoxSeparator } from "./ListBoxSeparator";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export type ListBoxProps = React.ComponentPropsWithoutRef<"div">;

export function ListBox({ className, children, ...props }: ListBoxProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.ListBox, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className })
  };

  return (
    <div className={cssClasses.root} role="listbox" {...props}>
      {children}
    </div>
  );
}

// Compound component composition
ListBox.Item = ListBoxItem;
ListBox.Separator = ListBoxSeparator;
ListBox.Group = ListBoxGroup;
