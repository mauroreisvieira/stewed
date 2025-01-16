import React, { forwardRef } from "react";
// Tokens
import { type Spacings, type Screens, components } from "@stewed/tokens";
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
 * Props for a generic container component that accepts a dynamic type for its content.
 *
 * @template E - The type parameter allows the container to hold content of any type, providing flexibility
 * for various use cases like handling different data types or components inside the container.
 */
export type ContainerProps<E extends React.ElementType = React.ElementType> = CombinedProps<
  {
    /**
     * Allow possibility to change alignment of container.
     * @default center
     */
    alignment?: "default" | "center";
    /**
     * Specifies the screen size for the container.
     * @default full
     */
    screen?: Screens;
    /**
     * Specifies the type of element to use as the container.
     * @default div
     */
    as?: E;
  } & UseResponsiveProps<{
    /** Padding options for horizontal and vertical orientation. */
    padding?: {
      /** Adds padding in the block direction (e.g., top and bottom for vertical orientation). */
      block?: Spacings;
      /** Adds padding in the inline direction (e.g., left and right for vertical orientation). */
      inline?: Spacings;
    };
  }>,
  E
>;

/**
 * Container component provides a flexible layout container for organizing and structuring content.
 *
 * @example
 * ```tsx
 * <Container screen="sm"></Container>
 * ```
 *
 * @remarks This component is a polymorphic component can be rendered as a different element
 * and support all native props from the element passed on `as` prop.
 *
 * @see {@link ContainerProps} for more details on the available props.
 *
 * @param props - The props for the Container component.
 * @returns The rendered Container component.
 */
export const Container = forwardRef(
  (
    {
      as,
      screen = "full",
      alignment = "default",
      padding,
      className,
      children,
      ...props
    }: ContainerProps,
    ref: React.Ref<Element>
  ) => {
    // Component to render based on the 'as' prop
    const Comp = as || defaultElement;

    // Retrieve values from the current theme context
    const { activeToken } = useTheme();

    // Compute responsive props based on current theme and screen sizes
    const computedProps = useResponsive(
      {
        padding
      },
      activeToken.breakpoints
    );

    // Importing useBem to handle BEM class names
    const { getBlock } = useBem({ block: components.Container, styles });

    // Generating CSS classes based on component props and styles
    const cssClasses = {
      root: getBlock({
        modifiers: [
          alignment !== "default" && alignment,
          computedProps.padding?.block && `padding-block-${computedProps.padding.block}`,
          computedProps.padding?.inline && `padding-inline-${computedProps.padding.inline}`,
          screen && `screen-${screen}`
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
  props: ContainerProps<E>
) => React.ReactElement;
