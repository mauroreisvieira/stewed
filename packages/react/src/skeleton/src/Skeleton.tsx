import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
import type { Radius } from "../../tokens";
// Styles
import styles from "./styles/index.module.scss";

type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

interface SkeletonBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Skeleton shape. */
  shape: "line" | "circle" | "rectangle";
}

interface SkeletonLineProps extends SkeletonBaseProps {
  shape: "line";
  /** Skeleton size for `line` & `circle` shape. */
  size: Size;
  /** Skeleton ratio for `rectangle` shape. */
  ratio?: never;
  /** Skeleton border radius. */
  radius?: Radius;
}

interface SkeletonCircleProps extends SkeletonBaseProps {
  shape: "circle";
  /** Skeleton size for `line` & `circle` shape. */
  size: Size;
  /** Skeleton ratio for `rectangle` shape. */
  ratio?: never;
  /** Skeleton border radius. */
  radius?: never;
}

interface SkeletonRectangleProps extends SkeletonBaseProps {
  shape: "rectangle";
  /** Skeleton ratio for `rectangle` shape. */
  ratio?: "1:1" | "2:3" | "3:2" | "4:3" | "16:9";
  /** Skeleton size for `line` & `circle` shape. */
  size?: never;
  /** Skeleton border radius. */
  radius?: Radius;
}

export type SkeletonProps = SkeletonLineProps | SkeletonCircleProps | SkeletonRectangleProps;

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
  shape = "circle",
  ratio = "1:1",
  size = "md",
  radius = "md",
  className,
  style,
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

  const computedStyles = {
    ["--skeleton-size-ratio"]: ratio?.replace(":", "/"),
    ...style,
  };

  return <div {...nativeProps} className={cssClasses.root} style={computedStyles} />;
}
