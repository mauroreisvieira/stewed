import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export type TableBodyProps = React.ComponentPropsWithoutRef<"tbody">;

export function TableBody({ className, children, ...props }: TableBodyProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Table}__body`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className })
  };

  return (
    <tbody className={cssClasses.root} {...props}>
      {children}
    </tbody>
  );
}
