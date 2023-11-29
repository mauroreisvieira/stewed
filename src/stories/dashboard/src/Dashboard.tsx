import React from "react";
import { Box } from "../../../../packages/react/index";
import { SidePanel } from "./SidePanel";
import { Board } from "./Board";

export function Dashboard(): React.ReactElement {
    return (
        <Box gap="2xl">
            <SidePanel />
            <Board />
        </Box>
    )
}
