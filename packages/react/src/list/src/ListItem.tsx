import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface ListItemProps extends React.ComponentPropsWithRef<"li"> {}

export function ListItem({ className, children, ...props }: ListItemProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.List}__item`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      extraClasses: className,
    }),
  };

  return (
    <li className={cssClasses.root} {...props}>
      {children}
    </li>
  );
}
