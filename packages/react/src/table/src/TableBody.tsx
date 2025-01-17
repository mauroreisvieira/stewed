import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

/**
 * Props for the TableBody component.
 * Extends the standard `tbody` element props to allow for additional customization.
 */
export type TableBodyProps = React.ComponentPropsWithoutRef<"tbody">;

/**
 * TableBody component that renders a tbody element for a table.
 *
 * @param props - The properties for the TableBody component.
 * @returns The rendered TableBody component.
 *
 * @see {@link TableBodyProps} for the complete list of props.
 */
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
