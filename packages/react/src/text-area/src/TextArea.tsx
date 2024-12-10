import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface TextAreaProps extends React.ComponentPropsWithRef<"textarea"> {
  /**
   * Change the visual appearance of the text area.
   * @default outline
   */
  appearance?: "ghost" | "outline" | "soft";
  /**
   * Change the visual style of the text area.
   * @default "neutral"
   */
  skin?: "neutral" | "critical" | "success";
  /**
   * Sets the text area to use the full width of its container.
   * If true, the text area will stretch to fill the container's width.
   * @default true
   */
  fullWidth?: boolean;
  /**
   * Automatically adjusts the height of the text area based on its content.
   * When set to `true`, the text area will expand or contract vertically as the user types.
   * @default false
   */
  autoHeight?: boolean;
  /**
   * Controls the resizable behavior of the text area.
   * @default both
   */
  resize?: "both" | "horizontal" | "vertical" | "none";
}

/**
 * A component that renders a text area for entering and editing multi-line text.
 *
 * @example
 * ```tsx
 * <TextArea>Type something...</TextArea>
 * ```
 *
 * @remarks This component support all native props from the `HTMLTextAreaElement`.
 *
 * @param {TextAreaProps} props - The props for the TextArea component.
 * @returns {React.ReactElement} - The rendered TextArea component.
 */
export function TextArea({
  skin = "neutral",
  appearance = "outline",
  className,
  disabled,
  fullWidth = true,
  resize = "both",
  autoHeight,
  children,
  ...props
}: TextAreaProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.TextArea, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [
        disabled && "disabled",
        fullWidth && "full-width",
        autoHeight && "auto-height",
        resize && `resize-${resize}`,
        appearance,
        skin,
      ],
      extraClasses: className,
    }),
  };

  return (
    <textarea className={cssClasses.root} disabled={disabled} {...props}>
      {children}
    </textarea>
  );
}
