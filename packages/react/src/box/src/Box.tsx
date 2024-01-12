import React from "react";
// Tokens
import { type Spacings, components } from "../../../../tokens/src/index";
// Utilities
import { classNames } from "@stewed/utilities";
import { type DistributiveOmit, fixedForwardRef } from "../../types";
// Style
import styles from "./styles/index.module.scss";

const defaultElement = "div";

export interface BoxProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  /** Specifies the type of element to use as box. */
  as?: T;
  /** The direction of the box container. */
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  /** The gap between box items. Can be a predefined size or a custom value. */
  gap?: Spacings;
  /** Aligns box items along the main axis. */
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  /** Aligns box items along the cross axis. */
  items?: "start" | "end" | "center" | "baseline" | "stretch";
  /** Determines whether box items should wrap to the next line if they exceed the container's width. */
  wrap?: "wrap" | "wrap-reverse" | "nowrap";
  /** Adds space between box items on the horizontal and vertical axes. */
  space?: {
    x?: Spacings;
    y?: Spacings;
  };
  /** Renders the box container as an inline element. */
  inline?: boolean;
  /** Allows the box container to grow to fill available space. */
  grow?: boolean;
}

/**
 * Component that implements the CSS flex box API.
 *
 * @example
 * ```tsx
 * <Box direction="column" gap="sm"></Box>
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
    }: BoxProps<T> &
      DistributiveOmit<
        React.ComponentPropsWithRef<React.ElementType extends T ? typeof defaultElement : T>,
        "as"
      >,
    ref: React.ForwardedRef<unknown>,
  ): React.ReactElement => {
    const Comp = as || defaultElement;
    const rootName = components.Box;
    const cssClasses = {
      root: classNames(
        styles[rootName],
        styles[`${rootName}--${direction}`],
        gap && styles[`${rootName}--gap-${gap}`],
        justify && styles[`${rootName}--justify-${justify}`],
        items && styles[`${rootName}--items-${items}`],
        space?.x && styles[`${rootName}--space-x-${space.x}`],
        space?.y && styles[`${rootName}--space-y-${space.y}`],
        wrap && styles[`${rootName}--${wrap}`],
        inline && styles[`${rootName}--inline`],
        grow && styles[`${rootName}--grow`],
        className,
      ),
    };

    return (
      <Comp ref={ref} className={cssClasses.root} {...props}>
        {children}
      </Comp>
    );
  },
);
