import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: "1:1" | "2:3" | "3:2" | "4:3" | "16:9";
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
  className,
  children,
  ...otherProps
}: AspectRatioProps): React.ReactElement {
  const rootClassName = "aspect-ratio";
  const cssClasses = {
    root: classNames(
      styles[rootClassName],
      styles[`${rootClassName}--${ratio.replace(":", "-")}`],
      className,
    ),
    img: styles[`${rootClassName}__img`],
  };

  return (
    <div className={cssClasses.root} {...otherProps}>
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
