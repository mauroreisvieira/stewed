import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
import type { Radius } from "../../tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Specify the aspect ratio as a string in the format "width:height"
   * @default 1:1
  */
  ratio?: "1:1" | "2:3" | "3:2" | "4:3" | "16:9";
  radius?: Radius;
}

/**
 * A React component that enforces a specific aspect ratio for its children.
 *
 * @example
 * ```tsx
 * <AspectRatio ratio="16:9">
 *   <img src="your-image.jpg" alt="Your Image" />
 * </AspectRatio>
 * ```
 *
 * @param {AspectRatioProps} props - The props for the AspectRatio component.
 * @returns {React.ReactElement} - The rendered AspectRatio component.
 */
export function AspectRatio({
  ratio = "1:1",
  radius = "md",
  className,
  children,
  ...props
}: AspectRatioProps): React.ReactElement {
  const rootName = "aspect-ratio";
  const cssClasses = {
    root: classNames(
      styles[rootName],
      radius && styles[`${rootName}--${radius}`],
      styles[`${rootName}--${ratio.replace(":", "-")}`],
      className,
    ),
    img: styles[`${rootName}__img`],
  };

  return (
    <div className={cssClasses.root} {...props}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement, {
              className: classNames(cssClasses.img, child.props.className),
            })
          : child,
      )}
    </div>
  );
}
