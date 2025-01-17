import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { type Radius, components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

/**
 * Props for the AspectRatio component, extending the default properties of a `<div>` element.
 *
 * @remarks This interface allows you to specify additional styles and behavior for the AspectRatio component,
 * while also inheriting all standard `<div>` properties.
 */
export interface AspectRatioProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Specify the aspect ratio as a string in the format "width:height"
   * @default 1:1
   */
  ratio?: "1:1" | "2:3" | "3:2" | "4:3" | "16:9" | "21:9";
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
 * @remarks This component props extended from React.ComponentPropsWithoutRef<"div">.
 *
 * @param props - The props for the AspectRatio component.
 * @returns The rendered AspectRatio component.
 *
 * @see {@link AspectRatioProps} for the complete list of props.
 *
 * @example
 * ```tsx
 * <AspectRatio ratio="16:9">
 *   <img src="your-image.jpg" alt="Your Image" />
 * </AspectRatio>
 * ```
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
