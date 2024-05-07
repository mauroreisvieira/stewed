import React, { useRef, useState } from "react";
// UI Components
import {
  Container,
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
  FormField,
} from "../../../packages/react/index";
// Icons
import { TbDotsVertical } from "react-icons/tb";

const meta = {
  title: "Examples/Floating",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Login = {
  render: function Example() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);

    return (
      <Container screen="md" alignment="center" padding={{ block: "7xl" }}>
        <Card>
          <Card.Body>
            <Button onClick={() => setDialogOpen((prev) => !prev)}>Edit Profile</Button>
            <Dialog
              open={dialogOpen}
              onEscape={() => setDialogOpen(false)}
              onClickOutside={() => setDialogOpen(false)}
              onClose={() => setDialogOpen(false)}
            >
              <Dialog.Header>
                <Text as="h4">Edit Profile</Text>
                <Text size="sm" skin="neutral">
                  Update your personal infomation and save it
                </Text>
              </Dialog.Header>
              <Separator />
              <Dialog.Body>
                <Box direction="column" gap="xl">
                  <FormField>
                    <FormField.Label htmlFor="name">Name</FormField.Label>
                    <FormField.Control>
                      <TextField id="name" type="text" placeholder="Enter your name" />
                    </FormField.Control>
                  </FormField>
                  <FormField>
                    <FormField.Label htmlFor="email">Email address</FormField.Label>
                    <FormField.Control>
                      <TextField id="email" type="email" placeholder="Enter your email" />
                    </FormField.Control>
                  </FormField>
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
                    iconOnly
                  >
                    Settings
                  </Button>
                  <Dropdown
                    placement="bottom-start"
                    reference={ref.current}
                    open={dropdownOpen}
                    onClickOutside={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <ListBox>
                      <ListBox.Group>
                        <ListBox.Item>Option 1</ListBox.Item>
                        <ListBox.Item>Option 2</ListBox.Item>
                        <ListBox.Item>Option 3</ListBox.Item>
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
      </Container>
    );
  },
};
