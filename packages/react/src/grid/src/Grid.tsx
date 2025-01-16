import React, { forwardRef } from "react";
// Compound Component
import { GridItem, type GridSize } from "./GridItem";
// Tokens
import { components, type Spacings } from "@stewed/tokens";
// Hooks
import { useBem, useResponsive, type UseResponsiveProps } from "@stewed/hooks";
import { useTheme } from "../../theme";
// Types
import type { CombinedProps } from "../../types";
// Style
import styles from "./styles/index.module.scss";

// Default element type to be used when 'as' prop is not provided.
const defaultElement = "div";

/**
 * Props for the Grid component.
 * Extends the default properties of a specified HTML element (default is "div").
 *
 * @template E - The type of the HTML element that the Grid component will render.
 * This allows flexibility to render the tag as a different element (e.g., "span", "a", etc.).
 */
export type GridProps<E extends React.ElementType = React.ElementType> = CombinedProps<
  {
    /**
     * Specifies the type of element to use as the Grid.
     * @default div
     */
    as?: E;
  } & UseResponsiveProps<{
    /** Aligns stack items along the main axis. */
    justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
    /** Aligns stack items along the cross axis. */
    items?: "start" | "end" | "center" | "baseline" | "stretch";
    /** The number of rows in the grid container. */
    rows?: GridSize;
    /** The number of columns in the grid container. */
    cols?: GridSize;
    /** The flow direction of the grid items. */
    flow?: "row" | "column" | "row-dense" | "column-dense";
    /** Specifies whether the grid container is a subgrid or not. */
    subgrid?: boolean;
    /**
     * The gap between children.
     * @default none
     */
    gap?: Spacings;
    /** Padding options for horizontal and vertical orientation. */
    padding?: {
      /** Adds padding in the block direction (e.g., top and bottom for vertical orientation). */
      block?: Spacings;
      /** Adds padding in the inline direction (e.g., left and right for vertical orientation). */
      inline?: Spacings;
    };
    /** Adds space between elements, affecting adjacent elements. */
    space?: {
      /** Adds space on the horizontal axis (e.g., margin-right) affecting adjacent elements. */
      x?: Spacings;
      /** Adds space on the vertical axis (e.g., margin-top) affecting adjacent elements. */
      y?: Spacings;
    };
  }>,
  E
>;

/**
 * Component that implements CSS Grid.
 *
 * @example
 * ```tsx
 * <Grid cols={4} gap="sm"></Grid>
 * ```
 *
 * @remarks This component is a polymorphic component can be rendered as a different element
 * and support all native props from the element passed on `as` prop.
 *
 * @see {@link GridProps} for more details on the available props.
 *
 * @param props - The props for the Grid component.
 * @returns The rendered Grid component.
 */
const Root = forwardRef(
  (
    {
      as,
      cols,
      justify,
      items,
      rows,
      subgrid,
      flow,
      gap = "none",
      padding,
      space,
      responsive,
      className,
      children,
      ...props
    }: GridProps,
    ref: React.Ref<Element>
  ) => {
    // Component to render based on the 'as' prop
    const Comp = as || defaultElement;

    // Retrieve values from the current theme context
    const { activeToken } = useTheme();

    // Compute responsive props based on current theme and screen sizes
    const computedProps = useResponsive(
      {
        cols,
        justify,
        items,
        rows,
        subgrid,
        flow,
        gap,
        padding,
        space,
        responsive
      },
      activeToken.breakpoints
    );

    // Importing useBem to handle BEM class names
    const { getBlock } = useBem({ block: components.Grid, styles });

    // Generating CSS classes based on component props and styles
    const cssClasses = {
      root: getBlock({
        modifiers: [
          computedProps.subgrid && "subgrid",
          computedProps.justify && `justify-${computedProps.justify}`,
          computedProps.items && `items-${computedProps.items}`,
          computedProps.flow && `flow-${computedProps.flow}`,
          computedProps.cols && `cols-${computedProps.cols}`,
          computedProps.rows && `rows-${computedProps.rows}`,
          computedProps.gap && `gap-${computedProps.gap}`,
          computedProps.padding?.block && `padding-block-${computedProps.padding.block}`,
          computedProps.padding?.inline && `padding-inline-${computedProps.padding.inline}`,
          computedProps.space?.x && `space-x-${computedProps.space.x}`,
          computedProps.space?.y && `space-y-${computedProps.space.y}`
        ],
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
  props: GridProps<E>
) => React.ReactElement;

// Compound component composition
export const Grid = Object.assign(Root, {
  Item: GridItem
});
