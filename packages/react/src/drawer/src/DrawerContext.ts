import { createContext, use } from "react";

const definitionError = (): null => {
  throw new Error('Please make sure "<Drawer>" component is wrapping your component.');
};

export interface DrawerContextProps {
  /**
   * Callback function invoked when the Drawer should be closed.
   * If defined, a close button will be displayed on the Drawer header.
   */
  onClose?: () => void;
}

export const DrawerContext = createContext<DrawerContextProps>({
  onClose: definitionError,
});

export const useDrawer = (): DrawerContextProps => use(DrawerContext);
