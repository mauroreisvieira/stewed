import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { type Radius, type Spacings, components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

/**
 * Represents the size options for the Skeleton component.
 * It can be a predefined spacing value or "auto".
 */
type Size = Spacings | "auto";

/**
 * Props for the Skeleton component.
 * Extends the standard div element props to allow for additional customization.
 */
interface SkeletonProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Defines the shape of the skeleton placeholder.
   *
   * @default "line"
   */
  shape?: "line" | "circle";
  /**
   * Defines the size of the skeleton placeholder.
   *
   * @remarks Can be any value from `Spacings` tokens, also allow the `auto` to automatically adjust its size based on its container.
   * @default "md"
   */
  size?: Size;
  /**
   * Defines the border-radius of the skeleton placeholder, controlling its corner rounding.
   *
   * @remarks Accepts values from `Radius` token.
   * @default "sm"
   */
  radius?: Radius;
}

/**
 * This component displays an skeleton component.
 * Animated placeholder component used to render content placeholders before the actual data or content is available.
 * It helps improve the user experience by indicating that content is loading.
 *
 * @example
 * ```tsx
 * <Skeleton shape="line" radius="md" />
 * ```
 *
 * @param {SkeletonProps} props - The properties used to configure the `Skeleton` component.
 * @returns {React.ReactElement} A React element representing the skeleton placeholder.
 */
export function Skeleton({
  shape = "line",
  size = "md",
  radius = "sm",
  className,
  ...nativeProps
}: SkeletonProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Skeleton, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [shape, size, shape !== "circle" && `radius-${radius}`],
      extraClasses: className
    })
  };

  return <div {...nativeProps} className={cssClasses.root} />;
}
