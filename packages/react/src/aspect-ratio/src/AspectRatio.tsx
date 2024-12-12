import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { type Radius, components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface AspectRatioProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Specify the aspect ratio as a string in the format "width:height"
   * @default 1:1
   */
  ratio?: "1:1" | "2:3" | "3:2" | "4:3" | "16:9";
  /**
   * Defines the border-radius of the aspect ratio children, controlling its corner rounding.
   *
   * @remarks Accepts values from `Radius` token.
   */
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
 * @remarks This component props extended from React.ComponentPropsWithoutRef<"div">.
 *
 * @param {AspectRatioProps} props - The props for the AspectRatio component.
 * @returns {React.ReactElement} - The rendered AspectRatio component.
 */
export function AspectRatio({
  ratio = "1:1",
  className,
  radius,
  children,
  ...props
}: AspectRatioProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.AspectRatio, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [ratio.replace(":", "-"), radius && `radius-${radius}`],
      extraClasses: className
    })
  };

  return (
    <div className={cssClasses.root} {...props}>
      {children}
    </div>
  );
}
