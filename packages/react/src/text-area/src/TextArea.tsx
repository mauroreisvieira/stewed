import React from "react";
// Hooks
import { useBem } from "../../../../hooks/index";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Change the visual style of the button.
   * @default default
   */
  skin?: "default" | "error" | "critical";
}

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
        modifiers: [disabled && "disabled", skin !== "default" && skin],
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
