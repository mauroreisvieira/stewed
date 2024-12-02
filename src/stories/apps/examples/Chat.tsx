import React from "react";
// UI Components
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Hue,
  Stack,
  Text,
  Theme,
  TextArea,
  useTheme,
} from "@stewed/react";
// Hooks
import { useInput, useMediaQuery } from "@stewed/hooks";
// Icons
import { IoAttach, IoImage, IoMailOutline, IoSettingsOutline } from "react-icons/io5";
import { GoArrowRight, GoTasklist } from "react-icons/go";
import { BsBodyText } from "react-icons/bs";

export function ChatAI(): React.ReactElement {
  const { value: text, onChange: onTextChange } = useInput<string>("", {
    validate: (newValue) => {
      if (newValue.length >= 1001) {
        return false;
      }

      return true;
    },
  });

  const { activeToken } = useTheme();

  const isDesktop = useMediaQuery({ query: `(min-width: ${activeToken.breakpoints?.sm})` });

  return (
    <Theme>
      <Box
        skin="neutral-faded"
        padding={{ block: "9xl", inline: "lg" }}
        responsive={{ md: { padding: { block: "9xl", inline: "9xl" } } }}
        fullScreen
        fullWidth
      >
        <Container screen="lg" alignment="center">
          <Box space={{ y: "4xl" }}>
            <Text weight="medium" size="4xl" responsive={{ md: { size: "7xl" } }}>
              Hi there,{" "}
              <Hue skin={{ from: "indigo-500", to: "pink-800" }} clipText>
                <Text skin="transparent" as="span" weight="extra-bold" inherit>
                  Devon Lane
                </Text>
              </Hue>
            </Text>

            <Text
              weight="semi-bold"
              size="3xl"
              responsive={{ md: { size: "5xl" } }}
              space={{ y: "xl" }}
            >
              What would like to know?
            </Text>

            <Text size="xl" skin="neutral">
              Use one of the most common prompts below or use your own to begin
            </Text>
          </Box>

          <Box space={{ y: "9xl" }}>
            <Grid
              cols={2}
              responsive={{
                sm: {
                  cols: 4,
                },
              }}
              gap="lg"
            >
              <Hue skin="transparent">
                <Card>
                  <Card.Body>
                    <Text size="sm" skin="neutral">
                      Write a to-do list for a personal project or task
                    </Text>
                  </Card.Body>
                  <Card.Footer>
                    <Text skin="neutral">
                      <GoTasklist size={18} />
                    </Text>
                  </Card.Footer>
                </Card>
              </Hue>

              <Hue skin="transparent">
                <Card>
                  <Card.Body>
                    <Text size="sm" skin="neutral">
                      Generate an email ro reply to a job offer
                    </Text>
                  </Card.Body>
                  <Card.Footer>
                    <Text skin="neutral">
                      <IoMailOutline size={18} />
                    </Text>
                  </Card.Footer>
                </Card>
              </Hue>

              <Hue skin="transparent">
                <Card>
                  <Card.Body>
                    <Text size="sm" skin="neutral">
                      Summarize this article or text for me in one paragraph
                    </Text>
                  </Card.Body>

                  <Card.Footer>
                    <Text skin="neutral">
                      <BsBodyText size={18} />
                    </Text>
                  </Card.Footer>
                </Card>
              </Hue>

              <Hue skin="transparent">
                <Card>
                  <Card.Body>
                    <Text size="sm" skin="neutral">
                      How does Al work in a technical capacity
                    </Text>
                  </Card.Body>
                  <Card.Footer>
                    <Text skin="neutral">
                      <IoSettingsOutline size={18} />
                    </Text>
                  </Card.Footer>
                </Card>
              </Hue>
            </Grid>
          </Box>

          <Card padding={{ block: "md", inline: "md" }} shadow="md">
            <Card.Body>
              <Stack direction="column" gap="md">
                <TextArea
                  rows={5}
                  autoHeight
                  appearance="ghost"
                  placeholder="Ask whatever you want..."
                  value={text}
                  onChange={onTextChange}
                  resize="none"
                />

                <Stack gap="md" justify="between">
                  <Stack gap="sm">
                    <Button
                      skin="neutral"
                      appearance="ghost"
                      size="sm"
                      iconOnly={!isDesktop}
                      leftSlot={<IoAttach size={16} />}
                    >
                      Add Attachment
                    </Button>
                    <Button
                      skin="neutral"
                      appearance="ghost"
                      size="sm"
                      iconOnly={!isDesktop}
                      leftSlot={<IoImage size={16} />}
                    >
                      Use Image
                    </Button>
                  </Stack>
                  <Stack items="center" gap="sm">
                    <Text size="xs" skin={text.length === 1000 ? "critical" : "neutral"}>
                      {text.length}/1000
                    </Text>
                    <Button skin="primary" size="sm" leftSlot={<GoArrowRight size={16} />} iconOnly>
                      Submit
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Container>
      </Box>
    </Theme>
  );
}
