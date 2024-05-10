import React from "react";
// Tokens
import { type Spacings, type Viewport, type Palette, components } from "@stewed/tokens";
// Hooks
import { useBem } from "@stewed/hooks";
// Types
import { type DistributiveOmit, fixedForwardRef } from "../../types";
// Style
import styles from "./styles/index.module.scss";

const defaultElement = "section";

export interface SectionProps<T> extends React.ComponentProps<typeof defaultElement> {
  /**
   * Specifies the type of element to use as the Section.
   * @default div
   */
  as?: T;
  /**
   * Change the visual style of the Section.
   * @default light
   */
  skin?: Palette;
  /** Padding options for horizontal and vertical orientation. */
  padding?: {
    /** Adds padding in the block direction (e.g., top and bottom for vertical orientation). */
    block?: Spacings;
    /** Adds padding in the inline direction (e.g., left and right for vertical orientation). */
    inline?: Spacings;
  };

  /** Adds space between adjacent elements. */
  space?: {
    /** Adds space on the horizontal axis (e.g., margin-right) affecting adjacent elements. */
    x?: Spacings;
    /** Adds space on the vertical axis (e.g., margin-top) affecting adjacent elements. */
    y?: Spacings;
  };
  /** Sizing options for the section. */
  sizing?: {
    /** The width sizing option for the section. */
    width?: Extract<Viewport, "vw" | "svw" | "lvw" | "dvw"> | "auto" | "full";
    /** The height sizing option for the section. */
    height?: Extract<Viewport, "vh" | "svh" | "lvh" | "dvh"> | "auto" | "full";
  };
}

/**
 * Section component act as versatile building blocks, allowing developers to segment content,
 * establish visual hierarchy, and organize information effectively.
 *
 * @example
 * ```tsx
 * <Section>Section</Section>
 * ```
 *
 * @remarks This component is a polymorphic component can be rendered as a different element
 * and support all native props from the element passed on `as` prop.
 *
 * @param {SectionProps} props - The props for the Section component.
 * @returns {React.ReactElement} - The rendered Section component.
 */
export const Section = fixedForwardRef(
  <T extends React.ElementType>(
    {
      as,
      skin = "light",
      padding,
      space,
      sizing,
      className,
      children,
      ...props
    }: SectionProps<T> &
      DistributiveOmit<
        React.ComponentPropsWithRef<React.ElementType extends T ? typeof defaultElement : T>,
        "as"
      >,
    ref: React.ForwardedRef<unknown>,
  ): React.ReactElement => {
    // Component to render based on the 'as' prop
    const Comp = as || defaultElement;

    // Importing useBem to handle BEM class names
    const { getBlock } = useBem({ block: components.Section, styles });

    // Generating CSS classes based on component props and styles
    const cssClasses = {
      root: getBlock({
        modifiers: [
          skin,
          sizing?.width && `sizing-width-${sizing.width}`,
          sizing?.height && `sizing-height-${sizing.height}`,
          space?.x && `space-x-${space.x}`,
          space?.y && `space-y-${space.y}`,
          padding?.block && `padding-block-${padding.block}`,
          padding?.inline && `padding-inline-${padding.inline}`,
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
