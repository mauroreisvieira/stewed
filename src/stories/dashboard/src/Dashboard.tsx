import React from "react";
import { Flex } from "../../../../packages/react/index";
import { SidePanel } from "./SidePanel";
import { Board } from "./Board";

export function Dashboard(): React.ReactElement {
    return (
        <Flex gap="2xl">
            <SidePanel />
            <Board />
        </Flex>
    )
}
