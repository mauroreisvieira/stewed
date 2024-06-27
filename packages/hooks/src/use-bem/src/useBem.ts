import { useCallback } from "react";
import { classNames } from "@stewed/utilities";

// Define type for classNames parameters
type ClassNamesParams = Parameters<typeof classNames>;

interface UseBemProps {
  /** The block name or identifier for the BEM structure. */
  block: string;
  /** A collection of styles where keys are CSS class names and values are corresponding style definitions. */
  styles?: { [key: string]: string };
}

/**
 * Hook for managing BEM (Block Element Modifier) class names.
 *
 * @param block - The base block name for BEM classes.
 * @param styles - Object containing class name mappings.
 * @returns An object containing functions to generate BEM class names.
 */
export function useBem({ block, styles }: UseBemProps) {
  /**
   * Retrieves a CSS class from the styles object.
   *
   * @param value The name of the CSS class to retrieve.
   * @returns The CSS class if found in the styles object, otherwise throws an error.
   */
  const getClass = useCallback(
    (value: string) => {
      if (!styles) {
        return value;
      }

      if (styles?.[value]) {
        return styles[value];
      }

      throw new Error(
        `Oops! The CSS class named '${value}' isn't found in the styles. Please review your styles object to ensure it's properly defined.`,
      );
    },
    [styles],
  );

  /**
   * Generate class names for elements based on BEM conventions.
   *
   * @param elements - Array of element names.
   * @param extraClasses - Additional classes to include.
   * @returns Concatenated class names for elements.
   */
  const getElement = (elements?: ClassNamesParams, extraClasses?: string): string => {
    const elementClasses = elements
      ?.filter(Boolean)
      .map((element) => getClass(`${block}__${element}`))
      .join(" ");
    return classNames(elementClasses, extraClasses);
  };

  /**
   * Generate class names for modifiers based on BEM conventions.
   *
   * @param modifiers - Array of modifier names.
   * @param extraClasses - Additional classes to include.
   * @returns Concatenated class names for modifiers.
   */
  const getModifier = (modifiers?: ClassNamesParams, extraClasses?: string): string => {
    const modifierClasses = modifiers
      ?.filter(Boolean)
      .map((mod) => getClass(`${block}--${mod}`))
      .join(" ");
    return classNames(modifierClasses, extraClasses);
  };

  /**
   * Generate class names for the block based on BEM conventions.
   *
   * @param elements - Array of element names.
   * @param modifiers - Array of modifier names.
   * @param extraClasses - Additional classes to include.
   * @returns Concatenated class names for the block.
   */
  const getBlock = ({
    elements,
    modifiers,
    extraClasses,
  }: {
    elements?: ClassNamesParams;
    modifiers?: ClassNamesParams;
    extraClasses?: string;
  }): string => {
    return classNames(getClass(block), getElement(elements), getModifier(modifiers), extraClasses);
  };

  return {
    getBlock,
    getElement,
    getModifier,
  };
}
