import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Types
import { type DistributiveOmit, fixedForwardRef } from "../../types";
// Styles
import styles from "./styles/index.module.scss";

// Default HTML element type for the this component
const defaultElement = "td";

export interface TableCellProps<T> extends React.ComponentProps<typeof defaultElement> {
  /**
   * Specifies the type of element to use as the td.
   * @default td
   */
  as?: T;
  /** Adjust horizontal alignment of text. */
  alignment?: "start" | "center" | "end";
}

export const TableCell = fixedForwardRef(
  <T extends "td" | "th">(
    {
      as,
      alignment = "start",
      className,
      children,
      ...props
    }: TableCellProps<T> &
      DistributiveOmit<
        React.ComponentPropsWithRef<React.ElementType extends T ? typeof defaultElement : T>,
        "as"
      >,
    ref: React.ForwardedRef<unknown>,
  ): React.ReactElement => {
    // Determine the component type based on 'as' prop or use the default element
    const Comp = as || defaultElement;

    // Importing useBem to handle BEM class names
    const { getBlock } = useBem({ block: `${components.Table}__cell`, styles });

    // Generating CSS classes based on component props and styles
    const cssClasses = {
      root: getBlock({ modifiers: [alignment], extraClasses: className }),
    };

    return (
      <Comp ref={ref} className={cssClasses.root} {...props}>
        {children}
      </Comp>
    );
  },
);
