import React, { forwardRef } from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Types
import type { CombinedProps } from "../../types";
// Styles
import styles from "./styles/index.module.scss";

// Default element type to be used when 'as' prop is not provided.
const defaultElement = "td";

/**
 * Props for the Table Cell component.
 * Extends the default properties of a specified HTML element (default is "td").
 *
 * @template E - The type of the HTML element that the Table Cell component will render.
 * This allows flexibility to render the tag as a different element (e.g., "th").
 */
export type TableCellProps<E extends React.ElementType = React.ElementType> = CombinedProps<
  {
    /**
     * Specifies the type of element to use as the td.
     * @default td
     */
    as?: E;
    /** Adjust horizontal alignment of text. */
    alignment?: "start" | "center" | "end";
  },
  E
>;

export const TableCell = forwardRef(
  (
    { as, alignment = "start", className, children, ...props }: TableCellProps,
    ref: React.Ref<Element>
  ) => {
    // Determine the component type based on 'as' prop or use the default element
    const Comp = as || defaultElement;

    // Importing useBem to handle BEM class names
    const { getBlock } = useBem({ block: `${components.Table}__cell`, styles });

    // Generating CSS classes based on component props and styles
    const cssClasses = {
      root: getBlock({
        modifiers: [alignment, props?.onClick && "sortable"],
        extraClasses: className
      })
    };

    return (
      <Comp ref={ref} className={cssClasses.root} {...props}>
        {children}
      </Comp>
    );
  }
) as <E extends React.ElementType = typeof defaultElement>(
  props: TableCellProps<E>
) => React.ReactElement;
