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

export interface BoxProps<T>
  extends Omit<React.ComponentProps<typeof defaultElement>, "hidden">,
    UseResponsiveProps<{
      /** Padding options for horizontal and vertical orientation. */
      padding?: {
        /** Adds padding in the block direction (e.g., top and bottom for vertical orientation). */
        block?: Spacings;
        /** Adds padding in the inline direction (e.g., left and right for vertical orientation). */
        inline?: Spacings;
      };
      /** Adds space between box or elements, affecting adjacent elements. */
      space?: {
        /** Adds space on the horizontal axis (e.g., margin-right) affecting adjacent elements. */
        x?: Spacings;
        /** Adds space on the vertical axis (e.g., margin-top) affecting adjacent elements. */
        y?: Spacings;
      };
      /** Boolean indicating whether the element should be hidden. */
      hidden?: boolean;
    }> {
  /**
   * Specifies the type of element to use as the box.
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
  /** Sets the box to use the full width of its container. */
  fullWidth?: boolean;
}

/**
 * Box is the most primitive layout component.
 *
 * @example
 * ```tsx
 * <Box gap="sm"></Box>
 * ```
 *
 * @remarks This component is a polymorphic component can be rendered as a different element
 * and support all native props from the element passed on `as` prop.
 *
 * @param {BoxProps} props - The props for the Box component.
 * @returns {React.ReactElement} - The rendered Box component.
 */
export const Box = fixedForwardRef(
  <T extends React.ElementType>(
    {
      as,
      skin,
      screen,
      padding,
      space,
      hidden,
      responsive,
      fullWidth,
      className,
      children,
      ...props
    }: BoxProps<T> &
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
        padding,
        space,
        responsive,
      },
      activeToken.breakpoints,
    );

    // Importing useBem to handle BEM class names
    const { getBlock } = useBem({ block: components.Box, styles });

    // Generating CSS classes based on component props and styles
    const cssClasses = {
      root: getBlock({
        modifiers: [
          skin,
          screen && `screen-${screen}`,
          computedProps.padding?.block && `padding-block-${computedProps.padding.block}`,
          computedProps.padding?.inline && `padding-inline-${computedProps.padding.inline}`,
          computedProps.space?.x && `space-x-${computedProps.space.x}`,
          computedProps.space?.y && `space-y-${computedProps.space.y}`,
          hidden && "hidden",
          fullWidth && "full-width",
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
