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
      <Card padding="lg">
        <Card.Media>
          <Carousel loop={false}>
            {Array.from({ length: 2 }).map((_, key) => (
              <Box key={key} direction="column" gap="7xl">
                <AspectRatio ratio="1:1">
                  <img src="https://placehold.co/400x600" />
                </AspectRatio>
                <Card border={false}>
                  <Card.Body>
                    <Box direction="column" gap="xl" items="center">
                      <Text as="h1">Purches Quickly</Text>
                      <Text size="xl" skin="neutral">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus, asperiores?
                      </Text>
                    </Box>
                  </Card.Body>
                </Card>
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
