import React, { useRef, useState } from "react";
// UI Components
import {
  Container,
  Avatar,
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
  TextArea,
} from "@stewed/react";
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

export const EditProfile = {
  render: function Example() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);

    return (
      <Container screen="md" alignment="center" padding={{ block: "7xl" }}>
        <Card>
          <Card.Body>
            <Box justify="between" gap="2xl" wrap="wrap" items="center">
              <Box gap="md" items="center">
                <Avatar size="lg" name="Lourenço Vieira" />
                <Box direction="column">
                  <Text size="lg" weight="medium">
                    Lourenço Vieira
                  </Text>
                </Box>
              </Box>
              <Button
                size="md"
                skin="neutral"
                appearance="ghost"
                iconOnly
                leftSlot={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    />
                  </svg>
                }
                onClick={() => setDialogOpen((prev) => !prev)}
              >
                Edit Profile
              </Button>
            </Box>
            <Dialog
              open={dialogOpen}
              onEscape={() => setDialogOpen(false)}
              onClickOutside={() => setDialogOpen(false)}
              onClose={() => setDialogOpen(false)}
            >
              <Dialog.Header>
                <Text as="h4">Edit Profile</Text>
                <Text size="sm" skin="neutral">
                  Update your personal information and save it.
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
                    <FormField.Label htmlFor="email">Email</FormField.Label>
                    <FormField.Control>
                      <TextField id="email" type="email" placeholder="Enter your email" />
                    </FormField.Control>
                  </FormField>
                  <FormField>
                    <FormField.Label htmlFor="address">Address</FormField.Label>
                    <FormField.Control>
                      <TextArea id="address" />
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
