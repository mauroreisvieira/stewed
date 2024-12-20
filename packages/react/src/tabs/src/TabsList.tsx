import React, { useCallback } from "react";
// Hooks
import { useBem, useKeyboardNavigation } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";
import { useTabs } from "./TabsContext";

/**
 * Props for the TabsList component.
 * This type extends the default props for a `<div>` element,
 * allowing standard HTML div attributes to be used.
 */
export type TabsListProps = React.ComponentPropsWithoutRef<"div">;

/**
 * The TabsList component serves as a container for tab items.
 * It accepts all standard `<div>` properties and additional styling or behavior as needed.
 *
 * @param props - The properties for the TabsList component.
 * @returns A element rendering a styled container for tabs.
 */
export function TabsList({
  className,
  children,
  onKeyDown,
  ...props
}: TabsListProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Tabs}__list`, styles });

  // Get tab context value and functions.
  const { direction } = useTabs();

  // Determine the orientation based on the direction.
  // If the direction is "row", set orientation to "vertical"; otherwise, set it to "horizontal".
  const orientation = direction === "row" ? "vertical" : "horizontal";

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className })
  };

  // Define a reference to a tab list element
  const { ref, onNavigate } = useKeyboardNavigation<HTMLDivElement>({
    target: '[role="tab"]:not([aria-disabled])'
  });

  const onHandleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      onNavigate(event);
      onKeyDown?.(event);
    },
    [onKeyDown, onNavigate]
  );

  return (
    <div
      ref={ref}
      className={cssClasses.root}
      role="tablist"
      aria-orientation={orientation}
      tabIndex={-1}
      onKeyDown={onHandleKeyDown}
      {...props}
    >
      {children}
    </div>
  );
}
