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
    <div style={{ maxWidth: 420 }}>
      <Theme>
        <Card padding={{ inline: "3xl", block: "3xl" }}>
          <Carousel
            loop={false}
            showNavigation={false}
            responsive={{
              sm: {
                showNavigation: true,
                loop: true,
              },
            }}>
            {Array.from({ length: 2 }).map((_, key) => (
              <Box key={key} direction="column">
                <AspectRatio ratio="1:1">
                  <img src="https://placehold.co/400x600" />
                </AspectRatio>
                <Box
                  direction="column"
                  gap="xl"
                  items="center"
                  responsive={{
                    sm: {
                      padding: {
                        block: "3xl",
                        inline: "2xl",
                      },
                    },
                  }}
                  padding={{ block: "2xl", inline: "md" }}>
                  <Text
                    as="h3"
                    size="2xl"
                    alignment="center"
                    responsive={{
                      sm: {
                        size: "4xl",
                      },
                    }}>
                    Purchase Quickly
                  </Text>
                  <Text size="lg" skin="neutral" alignment="center" variation="italic">
                    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus, asperiores?"
                  </Text>
                </Box>
              </Box>
            ))}
          </Carousel>

          <Card.Body>
            <Box gap="lg">
              <Button appearance="outline" fullWidth>
                Log in
              </Button>
              <Button fullWidth>Join now</Button>
            </Box>
          </Card.Body>
        </Card>
      </Theme>
    </div>
  );
}
