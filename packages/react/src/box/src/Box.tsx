import React, { forwardRef } from "react";
// Tokens
import { components, type Spacings, type Radius } from "@stewed/tokens";
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
 * Props for the Box component.
 * Extends the default properties of a specified HTML element (default is "div").
 *
 * @template E - The type of the HTML element that the Box component will render.
 * This allows flexibility to render the tag as a different element (e.g., "span", "a", etc.).
 */
export type BoxProps<E extends React.ElementType = React.ElementType> = CombinedProps<
  {
    /**
     * Specifies the type of element to use as the box.
     * @default div
     */
    as?: E;
    /** Change the visual style of the component. */
    skin?:
      | "default"
      | "primary-faded"
      | "secondary-faded"
      | "neutral-faded"
      | "critical-faded"
      | "success-faded"
      | "warning-faded"
      | "info-faded"
      | "white";
    /**
     * Defines the border-radius of the aspect ratio children, controlling the rounding of corners.
     * @default none
     * @remarks Accepts values from the `Radius` token to apply consistent corner rounding.
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
    /** Determines if should expand to use the full height. */
    fullHeight?: boolean;
    /** Determines if should expand to use the full screen */
    fullScreen?: boolean;
  } & UseResponsiveProps<{
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
  }>,
  E
>;

/**
 * The Box component serves as a fundamental container for grouping and structuring other components.
 * It functions similarly to a `<div>`, but with additional built-in features that enhance layout flexibility and styling options
 *
 * @example
 * ```tsx
 * <Box skin="neutral-faded">Box</Box>
 * ```
 *
 * @remarks This component is a polymorphic component can be rendered as a different element
 * and support all native props from the element passed on `as` prop.
 *
 * @see {@link BoxProps} for more details on the available props.
 *
 * @param props - The props for the Box component.
 * @returns The rendered Box component.
 */
export const Box = forwardRef(
  (
    {
      as,
      skin,
      padding,
      space,
      hidden,
      responsive,
      radius = "none",
      borderColor,
      borderWidth,
      borderStyle,
      fullWidth,
      fullHeight,
      fullScreen,
      className,
      children,
      ...props
    }: BoxProps,
    ref: React.Ref<Element>
  ) => {
    // Component to render based on the 'as' prop
    const Comp = as || defaultElement;

    // Retrieve values from the current theme context
    const { activeToken } = useTheme();

    // Compute responsive props based on current theme and screen sizes
    const computedProps = useResponsive(
      {
        padding,
        space,
        responsive
      },
      activeToken.breakpoints
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
          fullHeight && "full-height",
          fullWidth && "full-width",
          fullScreen && "full-screen"
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
  props: BoxProps<E>
) => React.ReactElement;
