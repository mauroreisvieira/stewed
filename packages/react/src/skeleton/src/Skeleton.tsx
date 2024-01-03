import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
import type { Radius } from "../../tokens";
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
  const rootName = "skeleton";

  const cssClasses = {
    root: classNames(
      styles[rootName],
      styles[`${rootName}--${shape}`],
      styles[`${rootName}--${size}`],
      shape !== "circle" && styles[`${rootName}--radius-${radius}`],
      className,
    ),
  };


  return <div {...nativeProps} className={cssClasses.root} />;
}
