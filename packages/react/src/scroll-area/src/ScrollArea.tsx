import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export type ScrollAreaProps = React.ComponentPropsWithoutRef<"div">;

export function ScrollArea({ className, children, ...props }: ScrollAreaProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.ScrollArea, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      extraClasses: className,
    }),
  };

  return (
    <div className={cssClasses.root} {...props}>
      {children}
    </div>
  );
}
