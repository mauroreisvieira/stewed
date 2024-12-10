import React, { useCallback } from "react";
// UI Components
import {
  Grid,
  Hoverable,
  Card,
  Box,
  Stack,
  Button,
  Separator,
  Carousel,
  Text,
  useSnackbar,
} from "@stewed/react";
// Hooks
import { useFetch } from "@stewed/hooks";
// Icons
import { FaPlay } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export function Home(): React.ReactElement {
  // API key for accessing Unsplash API
  const accessKey = "5c037b46041a86b80e941bc0ff3eb418c572d7bcb5def98f309e77c1ef6d576b";

  // Fetching images from Unsplash API with a search query for "music", limited to 8 results
  const { data: images } = useFetch<{
    results: {
      alt_description: string;
      urls: {
        raw: string;
      };
    }[];
  }>(`https://api.unsplash.com/search/photos?query="music"&client_id=${accessKey}&per_page=8`);

  // Hook to display notifications
  const { add } = useSnackbar();

  // Callback function triggered when an item is clicked, showing an error message
  const onHandleClick = useCallback(
    (index: number) => {
      add({
        id: new Date().getTime().toString(), // Unique identifier generated using the current timestamp
        title: "Unexpected error happened",
        content: (
          <Text size="xs" skin="neutral">
            We have encountered an error when trying to reproduce{" "}
            <strong>Daily Mix {index + 1}</strong>.
          </Text>
        ),
        skin: "critical"
      });
    },
    [add],
  );

  return (
    <>
      <Grid cols={1} responsive={{ sm: { cols: 2 }, md: { cols: 4 } }} gap="md">
        {images?.results?.map((image, index) => (
          <Grid.Item key={index}>
            <Hoverable>
              {({ isHovering, isTouch }) => (
                <Card shadow="none">
                  <Box>
                    <Stack direction="row" items="center" justify="between" grow>
                      <Stack items="center" gap="md">
                        <img
                          src={`${image.urls.raw}&w=80&h=80&fit=crop`}
                          alt={image.alt_description}
                        />
                        <Text weight="medium">Daily Mix {index + 1}</Text>
                      </Stack>
                      {(isHovering || isTouch) && (
                        <Box padding={{ inline: "md" }}>
                          <Stack items="center">
                            <Button
                              leftSlot={<FaPlay />}
                              onClick={() => onHandleClick(index)}
                              iconOnly
                            >
                              Play
                            </Button>
                          </Stack>
                        </Box>
                      )}
                    </Stack>
                  </Box>
                </Card>
              )}
            </Hoverable>
          </Grid.Item>
        ))}
      </Grid>

      <Stack direction="column">
        <Text as="h4" space={{ y: "xs" }}>
          Listen Now
        </Text>
        <Text size="sm" skin="neutral">
          Top picks for you. Updated daily.
        </Text>

        <Separator space={{ block: "lg" }} />

        <Carousel
          responsive={{
            xs: {
              perView: 2,
            },
            md: { perView: 4 },
          }}
          navigation={{
            renderPrev: (props) => (
              <Button skin="secondary" leftSlot={<FiChevronLeft />} {...props} iconOnly>
                Prev
              </Button>
            ),
            renderNext: (props) => (
              <Button skin="secondary" leftSlot={<FiChevronRight />} {...props} iconOnly>
                Next
              </Button>
            ),
          }}
          loop={false}
        >
          {images?.results?.map((image, index) => (
            <Card key={index} shadow="none" padding={{ block: "lg", inline: "md" }}>
              <Card.Media
                src={`${image.urls.raw}&w=300&h=500&fit=crop`}
                alt={image.alt_description}
              />
              <Card.Body>
                <Text size="sm" weight="medium">
                  React Rendezvous
                </Text>
                <Text size="sm" skin="neutral">
                  Ethan Byte
                </Text>
              </Card.Body>
            </Card>
          ))}
        </Carousel>
      </Stack>

      <Stack direction="column">
        <Text as="h4" space={{ y: "xs" }}>
          Made for You
        </Text>
        <Text size="sm" skin="neutral">
          Your personal playlists. Updated daily.
        </Text>
        <Separator space={{ block: "lg" }} />
        <Grid cols={2} responsive={{ sm: { cols: 4 }, md: { cols: 8 } }} gap="md">
          {images?.results?.map((image, index) => (
            <Card key={index} padding={{ block: "lg", inline: "md" }}>
              <Card.Media
                src={`${image.urls.raw}&w=200&h=200&fit=crop`}
                alt={image.alt_description}
              />

              <Card.Body>
                <Text size="sm" weight="medium">
                  React Rendezvous
                </Text>
                <Text size="xs" skin="neutral">
                  Ethan Byte
                </Text>
              </Card.Body>
            </Card>
          ))}
        </Grid>
      </Stack>
    </>
  );
}
