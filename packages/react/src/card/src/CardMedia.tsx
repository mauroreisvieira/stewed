import React from "react";
// Tokens
import { components } from "@stewed/tokens";
// Hooks
import { useBem } from "@stewed/hooks";
// Styles
import styles from "./styles/index.module.scss";

export type CardMediaProps = React.HTMLAttributes<HTMLDivElement>;

export function CardMedia({ className, children, ...props }: CardMediaProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Card}__media`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
  };
  return (
    <div className={cssClasses.root} {...props}>
      {children}
    </div>
  );
}
