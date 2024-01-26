import { classNames } from "@stewed/utilities";

// TODO: Add validation to check if class exists in stylesheet.

// Define type for classNames parameters
type ClassNamesParams = Parameters<typeof classNames>;

interface UseBemProps {
  block: string;
  styles: { [key: string]: string };
}

/**
 * Custom hook for managing BEM (Block Element Modifier) class names.
 *
 * @param block - The base block name for BEM classes.
 * @param styles - Object containing class name mappings.
 * @returns An object containing functions to generate BEM class names.
 */
export function useBem({ block, styles }: UseBemProps) {
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
      .map((element) => styles[`${block}__${element}`])
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
      .map((mod) => styles[`${block}--${mod}`])
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
    return classNames(styles[block], getElement(elements), getModifier(modifiers), extraClasses);
  };

  return {
    getBlock,
    getElement,
    getModifier,
  };
}
