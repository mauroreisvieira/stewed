import { useEffect, useLayoutEffect } from "react";
import { isBrowser } from "@stewed/utilities";

export const useIsomorphicLayoutEffect = isBrowser() ? useLayoutEffect : useEffect;
