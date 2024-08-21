import React, { useState, useCallback, useEffect } from "react";
// UI Components
import { Backdrop, Motion, Scope, useTheme } from "../..";
// Provider
import { type DrawerProviderProps, DrawerProvider } from "./DrawerProvider";
// Compound Component
import { DrawerBody } from "./DrawerBody";
import { DrawerHeader } from "./DrawerHeader";
import { DrawerFooter } from "./DrawerFooter";
// Hooks
import {
  useBem,
  useClickOutside,
  useResponsive,
  useScrollLock,
  useFocusTrap,
  type UseResponsiveProps,
} from "@stewed/hooks";
// Tokens
import { components, type Spacings } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface DrawerProps
  extends React.ComponentProps<"div">,
    DrawerProviderProps,
    UseResponsiveProps<{
      /**
       * Specifies the margin around the drawer to ensure safe spacing from the viewport edges.
       * @default xl
       */
      safeMargin?: Spacings;
      /**
       * Changes the size of the Drawer, will specify the width of the element.
       * @default md
       */
      size?: "sm" | "md";
    }> {
  /** The controlled open state of the Drawer. */
  open?: boolean;
  /**
   * The preferred placement of the drawer.
   * @default "right"
   */
  placement?: "left" | "right" | "bottom";
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
 * <Drawer placement="left" open>
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
  open,
  size = "md",
  safeMargin = "xl",
  responsive,
  placement = "left",
  className,
  children,
  onClose,
  onEscape,
  onClickOutside,
  ...props
}: DrawerProps): React.ReactElement {
  // State to hold the reference to the root div element
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);

  const [shouldRender, setShouldRender] = useState(open);

  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.Drawer, styles });

  // Lock scrolling when Drawer is open
  useScrollLock({ enabled: !!open });

  // Trap focus within the Drawer when open and rootRef is available
  useFocusTrap({
    root: rootRef,
    enabled: !!open && !!rootRef,
  });

  // Retrieve values from the current theme context
  const { activeToken } = useTheme();

  // Compute responsive props based on current theme and screen sizes
  const computedProps = useResponsive(
    {
      size,
      safeMargin,
      responsive,
    },
    activeToken.breakpoints,
  );

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [
        computedProps.size,
        placement,
        open && "open",
        safeMargin && `safe-margin-${safeMargin}`,
      ],
      extraClasses: className,
    }),
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

  useEffect(() => {
    if (open) {
      setShouldRender(true);
    }
  }, [open]);

  const onHandleAnimationEnd = () => {
    if (!open) {
      setShouldRender(false);
    }
  };

  return (
    <>
      {shouldRender && (
        <Scope elevation="navigation">
          <Backdrop blur />
          <DrawerProvider onClose={onClose}>
            <div className={cssClasses.root} {...props}>
              <Motion
                animation={open ? `slide-in-${placement}` : `slide-out-${placement}`}
                onDone={onHandleAnimationEnd}>
                <div onKeyDown={onHandleKeydown} ref={setRootRef} className={cssClasses.surface}>
                  {children}
                </div>
              </Motion>
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
