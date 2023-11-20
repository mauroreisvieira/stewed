import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
import { type DistributiveOmit, fixedForwardRef } from "../../types";
// Style
import styles from "./styles/index.module.scss";

const defaultElement = "div";

type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface FlexProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  /** Specifies the type of element to use as flex. */
  as?: T;
  /** The direction of the flex container. */
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  /** The gap between flex items. Can be a predefined size or a custom value. */
  gap?: Sizes;
  /** Aligns flex items along the main axis. */
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  /** Aligns flex items along the cross axis. */
  items?: "start" | "end" | "center" | "baseline" | "stretch";
  /** Determines whether flex items should wrap to the next line if they exceed the container's width. */
  wrap?: "wrap" | "wrap-reverse" | "nowrap";
  /** Adds space between flex items on the horizontal and vertical axes. */
  space?: {
    x?: Sizes;
    y?: Sizes;
  };
  /** Renders the flex container as an inline element. */
  inline?: boolean;
  /** Allows the flex container to grow to fill available space. */
  grow?: boolean;
}

/**
 * This component displays an flex component.
 * Component that implements the CSS flex box API.
 *
 * @example
 * ```tsx
 * <Flex direction="column" gap="sm"></Flex>
 * ```
 *
 * @remarks This component is a polymorphic component can be rendered as a different element
 * and support all native props from the element passed on `as` prop.
 *
 * @param {FlexProps} props - The props for the Flex component.
 * @returns {React.ReactElement} - The rendered Flex component.
 */
export const Flex = fixedForwardRef(function UnwrappedFlex<T extends React.ElementType>(
  {
    as,
    direction = "row",
    gap,
    justify,
    items,
    wrap,
    space,
    inline,
    grow,
    className,
    children,
    ...props
  }: FlexProps<T> &
    DistributiveOmit<
      React.ComponentPropsWithRef<React.ElementType extends T ? typeof defaultElement : T>,
      "as"
    >,
  ref: React.ForwardedRef<unknown>,
): React.ReactElement {
  const Comp = as || defaultElement;
  const rootClassName = "flex";
  const cssClasses = {
    root: classNames(
      styles[rootClassName],
      styles[`${rootClassName}--${direction}`],
      gap && styles[`${rootClassName}--gap-${gap}`],
      justify && styles[`${rootClassName}--justify-${justify}`],
      items && styles[`${rootClassName}--items-${items}`],
      space?.x && styles[`${rootClassName}--space-x-${space.x}`],
      space?.y && styles[`${rootClassName}--space-y-${space.y}`],
      wrap && styles[`${rootClassName}--${wrap}`],
      inline && styles[`${rootClassName}--inline`],
      grow && styles[`${rootClassName}--grow`],
      className,
    ),
  };

  return (
    <Comp ref={ref} className={cssClasses.root} {...props}>
      {children}
    </Comp>
  );
});
