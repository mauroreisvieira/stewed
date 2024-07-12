import React, { useState, useCallback } from "react";
// UI Components
import { Backdrop, Scope } from "../..";
// Provider
import { type DrawerProviderProps, DrawerProvider } from "./DrawerProvider";
// Compound Component
import { DrawerBody } from "./DrawerBody";
import { DrawerHeader } from "./DrawerHeader";
import { DrawerFooter } from "./DrawerFooter";
// Hooks
import { useBem, useClickOutside, useScrollLock } from "@stewed/hooks";
import { useFocusTrap } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface DrawerProps extends React.ComponentProps<"div">, DrawerProviderProps {
  /** The controlled open state of the Drawer. */
  open?: boolean;
  /**
   * Changes the size of the Drawer, will specify the width of the element.
   * @default md
   */
  size?: "sm" | "md";
  /** Callback function invoked when the escape key is pressed. */
  onEscape?: () => void;
  /** Callback function invoked when the Drawer is clicked outside. */
  onClickOutside?: () => void;
}

/**
 * The `Drawer` component displays a modal Drawer.
 * Drawers appear in front of the main content to provide critical information or an actionable piece of content.
 *
 * @example
 * ```tsx
 * <Drawer open>
 *   <Drawer.Body>
 *     <p>This action cannot be undone...</p>
 *   </Drawer.Body>
 * </Drawer>
 * ```
 *
 * @remarks
 * This component extends `ReactDrawerHTMLAttributes<HTMLDivElement>`.
 *
 * @param {DrawerProps} props - The props for the Drawer component.
 * @returns {React.ReactElement} - The rendered Drawer component.
 */
export function Drawer({
  size = "md",
  open,
  className,
  children,
  onClose,
  onEscape,
  onClickOutside,
  ...props
}: DrawerProps): React.ReactElement {
  // State to hold the reference to the root div element
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);

  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.Drawer, styles });

  // Lock scrolling when Drawer is open
  useScrollLock({ enabled: !!open });

  // Trap focus within the Drawer when open and rootRef is available
  useFocusTrap({
    root: rootRef,
    enabled: !!open && !!rootRef,
  });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ modifiers: [size, open && "open"], extraClasses: className }),
    surface: getElement([`surface`]),
  };

  const onHandleKeydown: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event): void => {
      if (event.key === "Escape") {
        if (onEscape) onEscape();
        event.stopPropagation();
      }
    },
    [onEscape],
  );

  // Hook to handle clicks outside the floating element.
  useClickOutside({
    enabled: open,
    ignoredElements: rootRef ? [rootRef] : undefined,
    onClickOutside: () => onClickOutside?.(),
  });

  return (
    <>
      {open && (
        <Scope elevation="navigation">
          <Backdrop blur />
          <DrawerProvider onClose={onClose}>
            <div className={cssClasses.root} {...props}>
              <div onKeyDown={onHandleKeydown} ref={setRootRef} className={cssClasses.surface}>
                {children}
              </div>
            </div>
          </DrawerProvider>
        </Scope>
      )}
    </>
  );
}

// Compound component composition
Drawer.Body = DrawerBody;
Drawer.Header = DrawerHeader;
Drawer.Footer = DrawerFooter;
