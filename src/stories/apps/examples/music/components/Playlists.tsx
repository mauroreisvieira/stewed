import React, { useCallback } from "react";
// UI Components
import {
  useSnackbar,
  Grid,
  Hoverable,
  Card,
  Box,
  Stack,
  Button,
  Text,
  AspectRatio,
  Skeleton
} from "@stewed/react";
// API
import { useGetImages } from "../../../../../api/useGetImages";
// Icons
import { FaPlay } from "react-icons/fa";

const NUMBER_OF_PLAYLISTS = 12;

export function Playlists(): React.ReactElement {
  // Get images
  const { data, isLoading } = useGetImages({ query: "disco", perPage: NUMBER_OF_PLAYLISTS });

  // Hook to display notifications
  const { add } = useSnackbar();

  // Callback function triggered when an item is clicked, showing an error message
  const onHandleClick = useCallback(
    (name: string) => {
      add({
        id: new Date().getTime().toString(), // Unique identifier generated using the current timestamp
        title: "Unexpected error happened",
        content: (
          <Text size="xs" skin="neutral">
            We have encountered an error when trying to reproduce <strong>{name}</strong>.
          </Text>
        ),
        skin: "critical",
        autoDismiss: 3000
      });
    },
    [add]
  );

  return (
    <Grid cols={1} responsive={{ sm: { cols: 2 }, md: { cols: 4 } }} gap="md">
      {isLoading ? (
        <>
          {Array.from({ length: NUMBER_OF_PLAYLISTS }).map((_, key) => (
            <AspectRatio key={key} ratio="21:9" radius="md">
              <Skeleton radius="none" size="auto" />
            </AspectRatio>
          ))}
        </>
      ) : (
        <>
          {data?.results?.map(({ urls, alt_description, user }, index) => (
            <Grid.Item key={index}>
              <Hoverable>
                {({ isHovering, isTouch }) => (
                  <Card shadow="none">
                    <Box>
                      <Stack direction="row" items="center" justify="between" grow>
                        <Stack items="center" gap="md">
                          <img src={urls.thumb} width={80} height={80} alt={alt_description} />
                          <Text weight="medium">{user.name}</Text>
                        </Stack>
                        {(isHovering || isTouch) && (
                          <Box padding={{ inline: "md" }}>
                            <Stack items="center">
                              <Button
                                leftSlot={<FaPlay />}
                                onClick={() => onHandleClick(user.name)}
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
        </>
      )}
    </Grid>
  );
}
