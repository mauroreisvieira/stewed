import React from "react";
import { Theme, Box } from "../../../../packages/react/index";
import { SidePanel } from "./SidePanel";
import { Board } from "./Board";

export function Dashboard(): React.ReactElement {
  return (
    <Theme<"ebay" | "shopify">
      theme="ebay"
      tokens={{
        ebay: {
          radius: {
            full: "10px",
          },
        },
        shopify: {
          radius: {
            full: "10px",
          },
        },
      }}>
      <Box gap="2xl">
        <SidePanel />
        <Board />
      </Box>
    </Theme>
  );
}
