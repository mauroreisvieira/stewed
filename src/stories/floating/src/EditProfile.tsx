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
  Dropdown,
  ListBox,
} from "../../../../packages/react/index";
// Icons
import { TbDotsVertical } from "react-icons/tb";

export function EditProfile(): React.ReactElement {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
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
              <Box justify="between" gap="md">
                <Button
                  ref={ref}
                  appearance="ghost"
                  leftSlot={<TbDotsVertical />}
                  size="sm"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  iconOnly>
                  Settings
                </Button>
                <Dropdown placement="bottom-start" reference={ref.current} open={dropdownOpen}>
                  <ListBox>
                    <ListBox.Group>
                      <ListBox.Item>Edit</ListBox.Item>
                      <ListBox.Item>Send message</ListBox.Item>
                    </ListBox.Group>
                  </ListBox>
                </Dropdown>
                <Box justify="end" gap="md">
                  <Button appearance="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </Box>
              </Box>
            </Dialog.Footer>
          </Dialog>
        </Card.Body>
      </Card>
    </Theme>
  );
}
