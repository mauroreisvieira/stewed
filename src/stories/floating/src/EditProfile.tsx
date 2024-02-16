import React, { useRef, useState } from "react";
// UI Components
import {
  Text,
  Box,
  Card,
  Theme,
  TextField,
  Button,
  Dialog,
  Separator,
} from "../../../../packages/react/index";

export function EditProfile(): React.ReactElement {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Theme>
      <Card>
        <Card.Body>
          <Button onClick={() => setDialogOpen((prev) => !prev)}>Edit Profile</Button>
          <Dialog
            open={dialogOpen}
            onEscape={() => setDialogOpen(false)}
            onClickOutside={() => setDialogOpen(false)}
            onClose={() => setDialogOpen(false)}>
            <Dialog.Header>
              <Text as="h4">Edit Profile</Text>
              <Text size="sm" skin="neutral">
                Update your personal infomation and save it
              </Text>
            </Dialog.Header>
            <Separator />
            <Dialog.Body>
              <Box direction="column" gap="xl">
                <div>
                  <Text as="label" size="sm" htmlFor="name">
                    Name
                  </Text>
                  <TextField id="name" type="text" placeholder="Enter your name" />
                </div>
                <div>
                  <Text as="label" size="sm" htmlFor="email">
                    Email address
                  </Text>
                  <TextField id="email" type="email" placeholder="Enter your email" />
                </div>
              </Box>
            </Dialog.Body>
            <Separator />
            <Dialog.Footer>
              <Box justify="end" gap="md">
                <Button appearance="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </Box>
            </Dialog.Footer>
          </Dialog>
        </Card.Body>
      </Card>
    </Theme>
  );
}
