import { useEffect, useState } from "react";
import { isIOS } from "@stewed/utils";

type Measure = {
  readonly height: number;
  readonly offsetLeft: number;
  readonly offsetTop: number;
  readonly pageLeft: number;
  readonly pageTop: number;
  readonly scale: number;
  readonly width: number;
};

declare const window: Window & {
  visualViewport: VisualViewport;
};

export const useVisualViewport = ({
  enabled,
}: {
  enabled: boolean;
}): Measure | undefined => {
  const [value, setValue] = useState<Measure>();
  useEffect(() => {
    if (!enabled || !isIOS()) return;

    const { visualViewport } = window;

    const onResize = (): void => {
      const { height, offsetLeft, offsetTop, pageLeft, pageTop, scale, width } =
        visualViewport;

      setValue({
        offsetLeft,
        offsetTop,
        pageLeft,
        pageTop,
        scale,
        width,
        height,
      });
    };

    // detect resize and orientation change or when keyboard appears
    visualViewport.addEventListener("resize", onResize);

    // eslint-disable-next-line consistent-return
    return (): void => visualViewport.removeEventListener("resize", onResize);
  }, [enabled]);

  return value;
};
