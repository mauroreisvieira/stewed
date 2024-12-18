import React from "react";
// UI Components
import { Stack, Separator, Text } from "@stewed/react";
// Partials
import { ListenNow } from "./ListenNow";
import { Playlists } from "./Playlists";
import { MadeForYou } from "./MadeForYou";

export function Home(): React.ReactElement {
  return (
    <>
      <Playlists />

      <Stack direction="column">
        <Text as="h4" space={{ y: "xs" }}>
          Listen Now
        </Text>
        <Text size="sm" skin="neutral">
          Top picks for you. Updated daily.
        </Text>
        <Separator space={{ block: "lg" }} />
        <ListenNow />
      </Stack>

      <Stack direction="column">
        <Text as="h4" space={{ y: "xs" }}>
          Made for You
        </Text>
        <Text size="sm" skin="neutral">
          Your personal playlists. Updated daily.
        </Text>
        <Separator space={{ block: "lg" }} />
        <MadeForYou />
      </Stack>
    </>
  );
}
