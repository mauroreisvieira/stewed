import React from "react";
import { SegmentedContext, type SegmentedContextProps } from "./SegmentedContext";

export interface SegmentedProviderProps<T extends string> extends SegmentedContextProps<T> {
  /** Slot for children components to be wrapped by the provider */
  children?: React.ReactNode;
}

export function SegmentedProvider<T extends string>({
  children,
  ...props
}: SegmentedProviderProps<T>): React.ReactElement {
  return (
    <SegmentedContext.Provider value={props as unknown as SegmentedContextProps<string>}>
      {children}
    </SegmentedContext.Provider>
  );
}
