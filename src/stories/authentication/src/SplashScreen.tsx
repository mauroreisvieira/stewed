import React from "react";
// UI Components
import {
  Box,
  Text,
  Card,
  Theme,
  Carousel,
  Button,
  AspectRatio,
} from "../../../../packages/react/index";

export function SplashScreen(): React.ReactElement {
  return (
    <Theme>
      <Card padding={{ inline: "md", block: "lg" }}>
        <Card.Media>
          <Carousel loop={false}>
            {Array.from({ length: 2 }).map((_, key) => (
              <Box key={key} direction="column" gap="7xl">
                <AspectRatio ratio="1:1">
                  <img src="https://placehold.co/400x600" />
                </AspectRatio>
                <Box
                  direction="column"
                  gap="xl"
                  items="center"
                  padding={{ block: "2xl", inline: "2xl" }}>
                  <Text as="h1">Purchase Quickly</Text>
                  <Text size="xl" skin="neutral">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus, asperiores?
                  </Text>
                </Box>
              </Box>
            ))}
          </Carousel>
        </Card.Media>
        <Card.Body>
          <Box gap="lg">
            <Button size="lg" appearance="outline" fullWidth>
              Log in
            </Button>
            <Button size="lg" fullWidth>
              Join now
            </Button>
          </Box>
        </Card.Body>
      </Card>
    </Theme>
  );
}
