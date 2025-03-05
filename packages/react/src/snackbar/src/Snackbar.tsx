import React, { useCallback, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
// Context
import {
  SnackbarContext,
  type SnackbarContextProps,
  type SnackbarNotification
} from "./SnackbarContext";
// UI Components
import { Scope, Alert, Motion } from "../..";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components, type Screens } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

/** Represents the properties for the `Snackbar` component. */
export interface SnackbarProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * The placement of the notifications on the screen.
   * Possible values include "top", "top-start", "top-end", "bottom", "bottom-start", and "bottom-end".
   * @default "top-end"
   */
  placement?: "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end";
  /**
   * Maximum number of notification that can be displayed at once.
   * Older items are removed when the limit is reached.
   * @default 8
   */
  max?: number;
  /**
   * Specifies the screen size for the notification area.
   * @default sm
   */
  screen?: Screens;
}

/**
 * The Snackbar component displays temporarily and floats above the UI to provide users list of notifications on the screen.
 *
 * @example
 * ```tsx
 * <Snackbar placement="bottom-end" max={3}>
 *   <YourComponent />
 * </Snackbar>
 * ```
 *
 * @remarks This component extends `React.ComponentPropsWithoutRef<"div">`, inheriting all standard div attributes.
 *
 * @see {@link SnackbarProps} for more details on the available props.
 *
 * @param props - The props for the Snackbar component.
 * @returns The rendered Snackbar component.
 */
export function Snackbar({
  placement = "top-end",
  screen = "sm",
  max = 8,
  className,
  children,
  ...props
}: SnackbarProps): React.ReactElement {
  // Import BEM utilities to generate class names based on block and element styles
  const { getBlock, getElement } = useBem({ block: components.Snackbar, styles });

  // Map to store timeout references for notifications, enabling auto-dismiss functionality
  const timeoutMap = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // State to hold currently displayed notifications
  const [notifications, setNotifications] = useState<SnackbarNotification[]>([]);

  // CSS classes for the Snackbar components
  const cssClasses = {
    root: getBlock({
      modifiers: [placement, screen && `screen-${screen}`],
      extraClasses: className
    }),
    content: getElement(["content"]),
    notification: getElement(["notification"])
  };

  /**
   * Removes a notification by its ID, triggering an exit animation.
   *
   * @param {string} id - The ID of the notification to remove.
   */
  const remove = useCallback<SnackbarContextProps["remove"]>((id) => {
    document.startViewTransition(() => {
      flushSync(() => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
        clearTimeout(timeoutMap.current[id]);
      });
    });
  }, []);

  /**
   * Adds a new notification to the list. Removes the oldest notification if max limit is reached.
   *
   * @param {SnackbarNotification} notification - The notification to add.
   */
  const add = useCallback<SnackbarContextProps["add"]>(
    (notification) => {
      setNotifications((prev) => {
        if (prev.length >= max) {
          const [oldest, ...rest] = prev;

          if (oldest) {
            remove(oldest.id);
          }

          return [...rest, notification];
        }

        return [...prev, notification];
      });

      // set up auto-dismiss if specified
      if (notification.autoDismiss) {
        timeoutMap.current[notification.id] = setTimeout(() => {
          remove(notification.id);
        }, notification.autoDismiss);
      }
    },
    [max, remove] // `notifications` isn't needed in deps since it's handled inside `setNotifications`
  );

  // Determine the animation type based on placement for entry
  const entryAnimation = useMemo(() => {
    return placement.startsWith("bottom") ? "slide-in-bottom" : "slide-in-top";
  }, [placement]);

  return (
    <SnackbarContext value={{ add, remove, notifications }}>
      {notifications.length > 0 && (
        <Scope elevation="notification" className={cssClasses.root} role="region">
          <div className={cssClasses.content} {...props}>
            {notifications.map(({ id, content, leftSlot, rightSlot, size, skin, title }) => (
              <Motion
                key={id}
                animation={entryAnimation}
                transitionName={`notification-${id}`}
                asChild
              >
                <Alert
                  shadow="xl"
                  className={cssClasses.notification}
                  {...{ leftSlot, rightSlot, size, skin, title }}
                >
                  {content}
                </Alert>
              </Motion>
            ))}
          </div>
        </Scope>
      )}
      {children}
    </SnackbarContext>
  );
}
