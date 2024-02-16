import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { type Color, components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface TextAreaProps extends React.ComponentPropsWithRef<"textarea"> {
  /**
   * Change the visual style of the text area.
   * @default default
   */
  skin?: "default" | Extract<Color, "critical" | "success">;
}

/**
 * A component that renders a text area for entering and editing multi-line text.
 *
 * @example
 * ```tsx
 * <TextArea>Type something...</TextArea>
 * ```
 *
 * @param {TextAreaProps} props - The props for the TextArea component.
 * @returns {React.ReactElement} - The rendered TextArea component.
 */
export const TextArea = React.forwardRef(
  (
    { skin = "default", className, disabled, children, ...props }: TextAreaProps,
    ref: React.Ref<HTMLTextAreaElement>,
  ): React.ReactElement => {
    // Importing useBem to handle BEM class names
    const { getBlock } = useBem({ block: components.TextArea, styles });

    // Generating CSS classes based on component props and styles
    const cssClasses = {
      root: getBlock({
        modifiers: [disabled && "disabled", skin],
        extraClasses: className,
      }),
    };

    return (
      <textarea ref={ref} className={cssClasses.root} disabled={disabled} {...props}>
        {children}
      </textarea>
    );
  },
);
