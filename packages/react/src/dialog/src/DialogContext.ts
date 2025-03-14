import { createContext, use } from "react";

const definitionError = (): null => {
  throw new Error('Please make sure "<Dialog>" component is wrapping your component.');
};

export interface DialogContextProps {
  /**
   * Callback function invoked when the dialog should be closed.
   * If defined, a close button will be displayed on the dialog header.
   */
  onClose?: () => void;
}

export const DialogContext = createContext<DialogContextProps>({
  onClose: definitionError
});

export const useDialog = (): DialogContextProps => use(DialogContext);
