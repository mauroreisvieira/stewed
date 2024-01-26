import React from "react";
// Hooks
import { useBem } from "../../../../hooks/index";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface ListBoxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export function ListBoxGroup({
  title,
  className,
  children,
}: ListBoxGroupProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: `${components.ListBox}__group`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
    title: getElement(["title"]),
  };

  return (
    <div className={cssClasses.root}>
      {title && <div className={cssClasses.title}>{title}</div>}
      {children}
    </div>
  );
}
