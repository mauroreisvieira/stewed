import React from "react";
// Hooks
import { useBem } from "../../../../hooks/index";
// Types
import { type DistributiveOmit, fixedForwardRef } from "../../types";
import { type FontSize, type FontWeight, type FontFamily, components } from "@stewed/tokens";
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

export interface TextProps<T> extends React.ComponentProps<typeof defaultElement> {
  /**
   * Specifies the type of element to be used.
   * @default "p"
   */
  as?: T;
  /** Changes the size of the text, giving it more or less font size. */
  size?: FontSize;
  /** Changes the family of the text, giving it more or less font size. */
  family?: FontFamily;
  /** Changes the weight of the text, giving it more or less weight. */
  weight?: FontWeight;
  /** Changes the font styles and transforming text. */
  variation?: TextVariation | TextVariation[];
  /** Change the visual style of the text. */
  skin?: "default" | "primary" | "neutral" | "critical";
  /** Adjust horizontal alignment of text. */
  alignment?: "start" | "center" | "end" | "justify";
  /** Changes the white space of the text. */
  whiteSpace?: "normal" | "nowrap";
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
      skin,
      variation,
      alignment,
      whiteSpace,
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

    // Ensure variation is an array
    const computedVariation = Array.isArray(variation) ? variation : [variation];

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
          skin,
          size,
          family,
          weight,
          alignment && `alignment-${alignment}`,
          whiteSpace && `white-space-${whiteSpace}`,
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
