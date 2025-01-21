import React, { useCallback, useEffect } from "react";
// Hooks
import { useBem, useKeyboardNavigation, type UseKeyboardNavigationProps } from "@stewed/hooks";
// Tokens
import { components, type Spacings } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

/**
 * Interface for the properties of the `Group` component.
 *
 * @extends React.ComponentPropsWithoutRef<"div">
 * @extends Pick<UseKeyboardNavigationProps, "loop">
 */
export interface GroupProps
  extends React.ComponentPropsWithoutRef<"div">,
    Pick<UseKeyboardNavigationProps, "loop"> {
  /**
   * The gap between group children's.
   * @default none
   */
  gap?: Spacings;
  /**
   * The direction of the stack container.
   * @default row
   */
  direction?: "row" | "column";
  /** Determines if should expand to use the full width. */
  fullWidth?: boolean;
  /**
   * When `true`, the element will receive focus when selected, improving keyboard navigation.
   * This ensures that the item is focused automatically when selected, enhancing the accessibility and usability
   * for users navigating with a keyboard.
   *
   * @default false
   */
  focusOnSelected?: boolean;
}

/**
 * Group component arranges its children components in a horizontal group,
 * removing spaces and adjusting the border radius of the middle elements to create a unified appearance.
 *
 * @example
 * ```tsx
 * <Group>
 *   <Button />
 *   <Button />
 * </Group>
 * ```
 *
 * @param {GroupProps} props - The props for the `Group` component.
 * @returns {React.ReactElement} - The rendered `Group` component.
 */
export function Group({
  fullWidth,
  gap = "none",
  direction = "row",
  focusOnSelected = false,
  loop,
  className,
  children,
  onKeyDown,
  ...props
}: GroupProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Group, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [fullWidth && "full-width", direction, gap && `gap-${gap}`],
      extraClasses: className
    })
  };

  // Define a reference to a list element
  const { ref, onNavigate, setFirstElementFocusable } = useKeyboardNavigation<HTMLDivElement>({
    target: "button:not([aria-disabled='true']), input:not([disabled='true'])",
    loop
  });

  const onHandleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      onNavigate(event);
      onKeyDown?.(event);
    },
    [onKeyDown, onNavigate]
  );

  useEffect(() => {
    // Set the first element selected focusable
    if (ref.current && focusOnSelected) {
      requestAnimationFrame(() => {
        setFirstElementFocusable();
      });
    }
  }, [ref, setFirstElementFocusable, focusOnSelected]);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div ref={ref} className={cssClasses.root} role="group" onKeyDown={onHandleKeyDown} {...props}>
      {children}
    </div>
  );
}
