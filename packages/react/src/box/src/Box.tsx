import React from "react";
// Tokens
import { type Spacings, type Radius, components } from "@stewed/tokens";
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
   * Determines the color scheme of the component.
   *
   * @default "default"
   */
  skin?: "default" | "neutral" | "neutral-faded" | "primary" | "primary-faded" | "white";
  /**
   * Defines the border-radius of the aspect ratio children, controlling the rounding of corners.
   *
   * @remarks
   * Accepts values from the `Radius` token to apply consistent corner rounding.
   */
  radius?: Radius;
  /** Defines the border style of the component. */
  borderStyle?: "solid" | "dashed";
  /** Defines the thickness of the border, accepts values ranging from 1 to 10. */
  borderWidth?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  /** Defines the color of the border. */
  borderColor?:
    | "primary"
    | "primary-faded"
    | "secondary"
    | "secondary-faded"
    | "neutral"
    | "neutral-faded"
    | "critical"
    | "critical-faded"
    | "success"
    | "success-faded"
    | "info"
    | "info-faded"
    | "warning"
    | "warning-faded";
  /** Determines if should expand to use the full width. */
  fullWidth?: boolean;
  /** Determines if should expand to use the full width and height. */
  fullScreen?: boolean;
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
export const Box = fixedForwardRef(function Box<T extends React.ElementType>(
  {
    as,
    skin,
    padding,
    space,
    hidden,
    responsive,
    radius,
    borderColor,
    borderWidth,
    borderStyle,
    fullWidth,
    fullScreen,
    className,
    children,
    ...props
  }: BoxProps<T> &
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
        radius && `radius-${radius}`,
        borderColor && `border-color-${borderColor}`,
        borderWidth && `border-width-${borderWidth}`,
        borderStyle && `border-style-${borderStyle}`,
        computedProps.padding?.block && `padding-block-${computedProps.padding.block}`,
        computedProps.padding?.inline && `padding-inline-${computedProps.padding.inline}`,
        computedProps.space?.x && `space-x-${computedProps.space.x}`,
        computedProps.space?.y && `space-y-${computedProps.space.y}`,
        hidden && "hidden",
        fullWidth && "full-width",
        fullScreen && "full-screen",
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
