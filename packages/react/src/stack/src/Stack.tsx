import React from "react";
// Tokens
import { type Spacings, type Viewport, type Screens, components } from "@stewed/tokens";
// Hooks
import { useBem, useResponsive, type UseResponsiveProps } from "@stewed/hooks";
import { useTheme } from "../../theme";
// Types
import { type DistributiveOmit, fixedForwardRef } from "../../types";
// Style
import styles from "./styles/index.module.scss";

const defaultElement = "div";

export interface StackProps<T>
  extends React.ComponentProps<typeof defaultElement>,
    UseResponsiveProps<{
      /**
       * The direction of the stack container.
       * @default row
       */
      direction?: "row" | "column" | "row-reverse" | "column-reverse";
      /** The gap between stack children's. */
      gap?: Spacings;
      /** Specifies the size of the element. */
      size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
      /** Boolean indicating if the element should be hidden. */
      hidden?: boolean;
      /** Aligns stack items along the main axis. */
      justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
      /** Aligns stack items along the cross axis. */
      items?: "start" | "end" | "center" | "baseline" | "stretch";
      /** Determines whether stack items should wrap to the next line if they exceed the container's width. */
      wrap?: "wrap" | "wrap-reverse" | "nowrap";
      /** Renders the stack container as an inline element. */
      inline?: boolean;
      /**
       * Allows the stack container to grow and fill the available space.
       * If true, the container will expand to occupy the remaining space in its parent.
       * @default true
       */
      grow?: boolean;
    }> {
  /**
   * Specifies the type of element to use as the stack.
   * @default div
   */
  as?: T;
  /**
   * Change the visual style of the Section.
   * @default default
   */
  skin?: "default" | "neutral" | "neutral-faded" | "primary" | "primary-faded";
  /**
   * Identifies a styling option specifically for the screen size.
   *
   * @remarks This property can be used to set the height to fill the entire screen.
   */
  screen?: Extract<Viewport, "vh"> | Extract<Screens, "full">;
}

/**
 * Component that implements the CSS flex box.
 *
 * @example
 * ```tsx
 * <Stack direction="column" gap="sm"></Stack>
 * ```
 *
 * @remarks This component is a polymorphic component can be rendered as a different element
 * and support all native props from the element passed on `as` prop.
 *
 * @param {StackProps} props - The props for the Stack component.
 * @returns {React.ReactElement} - The rendered Stack component.
 */
export const Stack = fixedForwardRef(
  <T extends React.ElementType>(
    {
      as,
      direction = "row",
      gap,
      size,
      hidden,
      justify,
      items,
      wrap,
      inline,
      grow = true,
      responsive,
      className,
      children,
      ...props
    }: StackProps<T> &
      DistributiveOmit<
        React.ComponentPropsWithRef<React.ElementType extends T ? typeof defaultElement : T>,
        "as"
      >,
    ref: React.ForwardedRef<unknown>,
  ): React.ReactElement => {
    // Component to render based on the 'as' prop
    const Comp = as || defaultElement;

    // Retrieve values from the current theme context
    const { activeToken } = useTheme();

    // Compute responsive props based on current theme and screen sizes
    const computedProps = useResponsive(
      {
        direction,
        gap,
        size,
        hidden,
        justify,
        items,
        wrap,
        inline,
        grow,
        responsive,
      },
      activeToken.breakpoints,
    );

    // Importing useBem to handle BEM class names
    const { getBlock } = useBem({ block: components.Stack, styles });

    // Generating CSS classes based on component props and styles
    const cssClasses = {
      root: getBlock({
        modifiers: [
          computedProps.direction !== "row" && computedProps.direction,
          computedProps.gap && `gap-${computedProps.gap}`,
          computedProps.size && `size-${computedProps.size}`,
          computedProps.justify && `justify-${computedProps.justify}`,
          computedProps.items && `items-${computedProps.items}`,
          computedProps.wrap,
          computedProps.inline && "inline",
          computedProps.hidden && "hidden",
          computedProps.grow && "grow",
        ],
        extraClasses: className,
      }),
    };

    return (
      <Comp ref={ref} className={cssClasses.root} {...props}>
        {children}
      </Comp>
    );
  },
);
