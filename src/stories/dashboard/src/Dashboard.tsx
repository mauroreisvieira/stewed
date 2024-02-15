import React from "react";
import { Theme, Box, Separator } from "../../../../packages/react/index";
import { SidePanel } from "./SidePanel";
import { Board } from "./Board";

export function Dashboard(): React.ReactElement {
  return (
    <Theme>
      <Box>
        <SidePanel />
        <Separator orientation="vertical" skin="neutral-border" space={{ inline: "2xl" }} />
        <Board />
      </Box>
    </Theme>
  );
}
