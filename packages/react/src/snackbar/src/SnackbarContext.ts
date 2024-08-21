import { createContext, useContext } from "react";
// Types
import type { AlertProps } from "../../../";

const definitionError = (): null => {
  throw new Error('Please make sure "SnackbarProvider" component is wrapping your component.');
};

export interface SnackbarNotification
  extends Partial<Pick<AlertProps, "skin" | "size" | "title" | "leftSlot" | "rightSlot">> {
  /**
   * Unique identifier for the notification.
   * @remark This ID is used to manage and remove the notification.
   */
  id: string;
  /** The message content of the notification. */
  message?: React.ReactNode;
  hide?: boolean;
  /**
   * Duration in milliseconds after which the notification will automatically dismiss itself.
   * @remark If not specified, the item will not auto-dismiss.
   */
  dismissDuration?: number;
}

export interface SnackbarContextProps {
  /** List of currently displayed notifications in the Snackbar component. */
  notifications: SnackbarNotification[];
  /**
   * Function to add a new notification to the Snackbar component.
   *
   * @param {SnackbarNotification} notification - The notification to add.
   */
  add: (notification: SnackbarNotification) => void;
  /**
   * Function to remove a notification from the Snackbar component by its ID.
   *
   * @param {string} id - The ID of the notification to remove.
   */
  remove: (id: string) => void;
}

export const SnackbarContext = createContext<SnackbarContextProps>({
  notifications: [],
  add: definitionError,
  remove: definitionError,
});

export const useSnackbar = (): SnackbarContextProps => useContext(SnackbarContext);
