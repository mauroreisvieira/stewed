import React, { useState } from "react";
// UI Components
import { Card, Box, Theme, AspectRatio, Skeleton } from "../../../../packages/react/index";

export function MediaCard(): React.ReactElement {
  return (
    <Theme>
      <Box gap="xl">
        {Array.from({ length: 3 }).map((_, key) => (
          <Card key={key}>
            <AspectRatio ratio="16:9">
              <Skeleton radius="none" size="auto" />
            </AspectRatio>
            <Card.Body>
              <Box direction="column" gap="sm" space={{ y: "lg" }}>
                <Skeleton size="sm" />
                <Skeleton size="sm" />
              </Box>
              <Skeleton size="md" />
            </Card.Body>
          </Card>
        ))}
      </Box>
    </Theme>
  );
}
