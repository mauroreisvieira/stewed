import React from "react";
// Hooks
import { useBem, useResponsive, type UseResponsiveProps } from "@stewed/hooks";
import { useTheme } from "../../theme";
// Types
import { type DistributiveOmit, fixedForwardRef } from "../../types";
import {
  type Spacings,
  type FontSize,
  type FontWeight,
  type FontFamily,
  type Color,
  components,
} from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

// Default HTML element type for the this component
const defaultElement = "p";

// Mapping of predefined sizes to HTML element types
const SizeMap = {
  "display-1": "h1",
  "display-2": "h2",
  "display-3": "h3",
  "display-4": "h4",
  "display-5": "h5",
  "display-6": "h6",
  "link": "a",
  "label": "label",
  "base": defaultElement,
} as const;

// Possible variations for text styling
type TextVariation =
  | "italic"
  | "normal"
  | "uppercase"
  | "lowercase"
  | "capitalize"
  | "line-through"
  | "overline"
  | "underline";

export interface TextProps<T>
  extends React.ComponentProps<typeof defaultElement>,
    UseResponsiveProps<{
      /**
       * Changes the size of the text, giving it more or less font size.
       * @default text
       */
      size?: FontSize;
      /** Changes the weight of the text, giving it more or less weight. */
      weight?: FontWeight;
      /** Changes the font styles and transforming text. */
      variation?: TextVariation | TextVariation[];
      /** Clamping text to a specific number of lines */
      lineClamp?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
      /** Adjust horizontal alignment of text. */
      alignment?: "start" | "center" | "end" | "justify";
      /** Changes the white space of the text. */
      whiteSpace?: "normal" | "nowrap";
      /** Adds space between text or elements, affecting adjacent elements. */
      space?: {
        /** Adds space on the horizontal axis (e.g., margin-right) affecting adjacent elements. */
        x?: Spacings;
        /** Adds space on the vertical axis (e.g., margin-top) affecting adjacent elements. */
        y?: Spacings;
      };
    }> {
  /**
   * Specifies the type of element to be used.
   * @default p
   */
  as?: T;
  /** Changes the family of the text, giving it more or less font size. */
  family?: FontFamily;
  /**
   * Change the visual style of the text.
   * @default text
   */
  skin?:
    | "inherit"
    | Extract<
        Color,
        | "text-base"
        | "white"
        | "black"
        | "primary"
        | "secondary"
        | "neutral"
        | "critical"
        | "success"
        | "info"
        | "warning"
      >;
}

/**
 * Text is the used to render headings and paragraphs within an interface.
 *
 * @example
 * ```tsx
 * <Text as="h1">Heading 1</Text>
 * ```
 *
 * @remarks This component is a polymorphic component can be rendered as a different element
 * and support all native props from the element passed on `as` prop.
 *
 * @param {TextProps} props - The props for the Text component.
 * @returns {React.ReactElement} - The rendered Text component.
 */
export const Text = fixedForwardRef(
  <T extends React.ElementType>(
    {
      as,
      size,
      family,
      weight,
      skin = "text-base",
      variation,
      lineClamp,
      alignment,
      whiteSpace,
      space,
      responsive,
      className,
      children,
      ...props
    }: TextProps<T> &
      DistributiveOmit<
        React.ComponentPropsWithRef<React.ElementType extends T ? typeof defaultElement : T>,
        "as"
      >,
    ref: React.ForwardedRef<unknown>,
  ): React.ReactElement => {
    // Determine the component type based on 'as' prop or use the default element
    const Comp = as || defaultElement;

    // Retrieve values from the current theme context
    const { activeToken } = useTheme();

    // Compute responsive props based on current theme and screen sizes
    const computedProps = useResponsive(
      {
        size,
        weight,
        alignment,
        lineClamp,
        space,
        variation,
        whiteSpace,
        responsive,
      },
      activeToken.breakpoints,
    );

    // Ensure variation is an array
    const computedVariation = Array.isArray(computedProps.variation)
      ? computedProps.variation
      : [computedProps.variation];

    // Determine the size based on the provided 'as' prop or use the default element
    const computedSize = ((Object.keys(SizeMap) as Array<keyof typeof SizeMap>).find(
      (key) => SizeMap[key] === (as || defaultElement),
    ) ?? "base") as keyof typeof SizeMap;

    // Importing useBem to handle BEM class names
    const { getBlock } = useBem({ block: components.Typography, styles });

    // Generating CSS classes based on component props and styles
    const cssClasses = {
      root: getBlock({
        modifiers: [
          computedSize,
          family,
          skin,
          computedProps.size,
          computedProps.weight,
          computedProps.lineClamp && `line-clamp-${computedProps.lineClamp}`,
          computedProps.alignment && `alignment-${computedProps.alignment}`,
          computedProps.whiteSpace && `white-space-${computedProps.whiteSpace}`,
          computedProps.space?.x && `space-x-${computedProps.space.x}`,
          computedProps.space?.y && `space-y-${computedProps.space.y}`,
          ...computedVariation.map((i) => i),
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
