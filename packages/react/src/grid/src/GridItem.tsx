import React from "react";
// Tokens
import { components } from "@stewed/tokens";
// Hooks
import { useBem, useResponsive, type UseResponsiveProps } from "@stewed/hooks";
// Hooks
import { useTheme } from "../../";
// Types
import { type DistributiveOmit, fixedForwardRef } from "../../types";
// Style
import styles from "./styles/index.module.scss";

const defaultElement = "div";

export type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface GridProps<T>
  extends Omit<React.ComponentProps<typeof defaultElement>, "hidden">,
    UseResponsiveProps<{
      /** Controlling the order of grid items. */
      order?: GridSize;
      /** The number of rows that the element should span. */
      rowSpan?: GridSize;
      /** The row at which the element should start. */
      rowStart?: GridSize;
      /** The row at which the element should end. */
      rowEnd?: GridSize;
      /** The number of columns that the element should span. */
      colSpan?: GridSize;
      /** The column at which the element should start. */
      colStart?: GridSize;
      /** The column at which the element should end. */
      colEnd?: GridSize;
      /** Boolean indicating if the element should be hidden. */
      hidden?: boolean;
    }> {
  /**
   * Specifies the type of element to use as the Grid.
   * @default div
   */
  as?: T;
}

export const GridItem = fixedForwardRef(function GridItem<T extends React.ElementType>(
  {
    as,
    order,
    colSpan,
    colStart,
    colEnd,
    rowSpan,
    rowStart,
    rowEnd,
    hidden,
    responsive,
    className,
    children,
    ...props
  }: GridProps<T> &
    DistributiveOmit<
      React.ComponentPropsWithRef<React.ElementType extends T ? typeof defaultElement : T>,
      "as"
    >,
  ref: React.ForwardedRef<unknown>,
): React.ReactElement {
  // Component to render based on the 'as' prop
  const Comp = as || defaultElement;

  // Retrieve values from the current theme context
  const { activeToken } = useTheme();

  // Compute responsive props based on current theme and screen sizes
  const computedProps = useResponsive(
    {
      order,
      colSpan,
      colStart,
      colEnd,
      rowSpan,
      rowStart,
      rowEnd,
      hidden,
      responsive,
    },
    activeToken.breakpoints,
  );

  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Grid}__item`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [
        computedProps.order && `order-${computedProps.order}`,
        computedProps.colSpan && `col-span-${computedProps.colSpan}`,
        computedProps.colStart && `col-start-${computedProps.colStart}`,
        computedProps.colEnd && `col-end-${computedProps.colEnd}`,
        computedProps.rowSpan && `row-span-${computedProps.rowSpan}`,
        computedProps.rowStart && `row-start-${computedProps.rowStart}`,
        computedProps.rowStart && `row-end-${computedProps.rowStart}`,
        computedProps.hidden && "hidden",
      ],
      extraClasses: className,
    }),
  };

  return (
    <Comp ref={ref} className={cssClasses.root} {...props}>
      {children}
    </Comp>
  );
});
