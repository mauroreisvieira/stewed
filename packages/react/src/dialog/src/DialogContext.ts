import { createContext, useContext } from "react";

const definitionError = (): null => {
  throw new Error('Please make sure "DialogProvider" component is wrapping your component.');
};

export interface DialogContextProps {
  onClose?: () => void;
}

export const DialogContext = createContext<DialogContextProps>({
  onClose: definitionError,
});

export const useDialog = (): DialogContextProps => useContext(DialogContext);
