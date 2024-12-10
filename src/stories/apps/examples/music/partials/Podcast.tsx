import React from "react";
// UI Components
import { Stack, Separator, Box, Button, Dialog, FormField, TextField, Text } from "@stewed/react";
// Hooks
import { useToggle } from "@stewed/hooks";
// Icons
import { MdOutlinePodcasts } from "react-icons/md";

export function Podcast(): React.ReactElement {
  // State to manage the visibility of the podcast dialog (a toggle state)
  const [podcastDialogState, onHandlePodcastDialog] = useToggle(false);

  return (
    <>
      <Stack direction="column">
        <Text as="h4" space={{ y: "xs" }}>
          New Episodes
        </Text>
        <Text size="sm" skin="neutral">
          Your favorite podcasts. Updated daily.
        </Text>

        <Separator space={{ block: "lg" }} />

        <Box
          padding={{ block: "9xl", inline: "9xl" }}
          radius="md"
          borderWidth={1}
          borderStyle="dashed"
          borderColor="neutral-faded"
        >
          <Stack direction="column" justify="center" items="center" gap="lg">
            <Text size="6xl" skin="neutral">
              <MdOutlinePodcasts />
            </Text>
            <Text size="xl" weight="medium">
              No episodes added
            </Text>
            <Text skin="neutral" size="sm">
              You have not added any podcasts. Add one below.
            </Text>
            <Button size="md" skin="secondary" onClick={onHandlePodcastDialog}>
              Add Podcast
            </Button>
          </Stack>
        </Box>
      </Stack>

      <Dialog
        size="md"
        onClose={onHandlePodcastDialog}
        onClickOutside={onHandlePodcastDialog}
        open={podcastDialogState}
      >
        <Dialog.Header>
          <Text as="h5">Add Podcast</Text>
          <Text size="sm" skin="secondary">
            Copy and paste the podcast feed URL to import.
          </Text>
        </Dialog.Header>
        <Dialog.Body>
          <Stack direction="column" gap="xl">
            <FormField>
              <FormField.Label htmlFor="url">Podcast URL</FormField.Label>
              <FormField.Control>
                <TextField
                  id="url"
                  size="lg"
                  placeholder="https://example.com/feed.xml"
                  fullWidth
                />
              </FormField.Control>
            </FormField>
          </Stack>
        </Dialog.Body>
        <Dialog.Footer>
          <Stack justify="end">
            <Button size="lg">Import podcast</Button>
          </Stack>
        </Dialog.Footer>
      </Dialog>
    </>
  );
}
