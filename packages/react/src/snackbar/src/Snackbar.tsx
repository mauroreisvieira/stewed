import React, { useCallback, useRef, useState } from "react";
// Provider
import { SnackbarProvider, type SnackbarContextProps, type SnackbarNotification } from "./context";
// UI Components
import { Scope, Alert } from "../..";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components, type Screens } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface SnackbarProps extends React.ComponentPropsWithRef<"div"> {
  /**
   * The placement of the notifications on the screen.
   * Possible values include "top", "top-start", "top-end", "bottom", "bottom-start", and "bottom-end".
   * @default "top-end"
   */
  placement?: "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end";
  /**
   * Maximum number of notification that can be displayed at once.
   * Older items are removed when the limit is reached.
   * @default 5
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
 * @remarks
 * This component extends `React.ComponentPropsWithRef<"div">`.
 *
 * @param {SnackbarProps} props - The props for the Snackbar component.
 * @returns {React.ReactElement} - The rendered Snackbar component.
 */
export function Snackbar({
  placement = "top-end",
  screen = "sm",
  max = 5,
  className,
  children,
}: SnackbarProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.Snackbar, styles });

  // A map to store timeouts for each notification, allowing for auto-dismissal
  const timeoutMap = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // State to hold the list of currently displayed snackbar notifications.
  // This state array will be updated to add or remove snackbar notifications as needed.
  const [notifications, setNotifications] = useState<SnackbarNotification[]>([]);

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [placement, screen && `screen-${screen}`],
      extraClasses: className,
    }),
    content: getElement(["content"]),
    notification: getElement(["notification"]),
  };

  /**
   * Removes a notification by its ID and clears its associated timeout.
   *
   * @param {string} id - The ID of the notification to remove.
   */
  const remove = useCallback<SnackbarContextProps["remove"]>((id) => {
    clearTimeout(timeoutMap.current[id]);
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  /**
   * Adds a new notifications to the list.
   * If the maximum number of notifications is reached, the oldest notifications is removed.
   * Sets up auto-dismissal for the new notifications if specified.
   *
   * @param {SnackbarNotification} notifications - The notifications to add.
   */
  const add = useCallback<SnackbarContextProps["add"]>(
    (notification) => {
      setNotifications((prev) => {
        // Remove the oldest notifications if the max limit is reached
        if (max && prev.length >= max) {
          const [oldest, ...rest] = prev;
          if (oldest) {
            clearTimeout(timeoutMap.current[oldest.id]);
          }
          return [...rest, notification];
        }
        return [...prev, notification];
      });

      // Set up auto-dismissal for the notifications if specified
      if (notification?.dismissDuration) {
        timeoutMap.current[notification.id] = setTimeout(() => {
          remove(notification.id);
        }, notification.dismissDuration);
      }
    },
    [max, remove],
  );

  return (
    <SnackbarProvider add={add} remove={remove} notifications={notifications}>
      {notifications.length > 0 && (
        <Scope elevation="notification" className={cssClasses.root} role="presentation">
          <div className={cssClasses.content}>
            {notifications.map(({ id, message, ...rest }) => (
              <div key={id} className={cssClasses.notification}>
                <Alert shadow="xl" {...rest}>
                  {message}
                </Alert>
              </div>
            ))}
          </div>
        </Scope>
      )}
      {children}
    </SnackbarProvider>
  );
}