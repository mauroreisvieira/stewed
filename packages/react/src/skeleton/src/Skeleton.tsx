import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { type Radius, components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "auto";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Skeleton shape. */
  shape?: "line" | "circle";
  /** Skeleton size for `line` & `circle` shape. */
  size?: Size;
  /** Skeleton border radius. */
  radius?: Radius;
}

/**
 * Skeleton is a animated placeholder, should be used to render content placeholders
 * before the real data is available.
 *
 * @example
 * ```tsx
 * <Skeleton shape="line" rounded="l" />
 * ```
 *
 */
export function Skeleton({
  shape = "line",
  size = "sm",
  radius = "md",
  className,
  ...nativeProps
}: SkeletonProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Skeleton, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [shape, size, shape !== "circle" && `radius-${radius}`],
      extraClasses: className,
    }),
  };

  return <div {...nativeProps} className={cssClasses.root} />;
}
