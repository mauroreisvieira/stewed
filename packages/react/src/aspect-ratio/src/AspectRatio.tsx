import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Specify the aspect ratio as a string in the format "width:height"
   * @default 1:1
   */
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
  ...props
}: AspectRatioProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.AspectRatio, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ modifiers: [ratio.replace(":", "-")], extraClasses: className }),
    img: getElement(["img"]),
  };

  return (
    <div className={cssClasses.root} {...props}>
      {children}
    </div>
  );
}
