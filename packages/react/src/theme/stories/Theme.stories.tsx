import React, { useState } from "react";
// Storybook
import type { Meta, StoryObj } from "@storybook/react";
// Packages
import {
  Text,
  Box,
  Card,
  Theme,
  useTheme,
  TextField,
  Button,
  Tabs,
  Switch,
  Separator,
  FormField,
  Dialog,
  Select,
  Container,
  Table,
  Stack,
} from "../../index";
// Hooks
import { useStateForm } from "@stewed/hooks";
// Tokens
import {
  color,
  breakpoints,
  screens,
  elevation,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  spacings,
  viewport,
  radius,
  shadow,
  duration,
  timing,
} from "@stewed/tokens";

type Story = StoryObj<typeof Theme>;

const meta: Meta<typeof Theme> = {
  title: "Components/Theme",
  component: Theme,
  decorators: [(Story) => <Story />],
};

export default meta;

export const Palette: Story = {
  render: (): React.ReactElement => {
    return (
      <Theme>
        {["primary", "secondary", "neutral", "critical", "success", "info", "warning"].map(
          (color) => (
            <Stack key={color} direction="column" gap="xs">
              <Box space={{ y: "xl" }}>
                <Text variation={"capitalize"} weight="medium">
                  {color}
                </Text>
                <Stack items="baseline">
                  {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((tone) => (
                    <Stack
                      key={tone}
                      justify="center"
                      grow
                      style={{
                        backgroundColor:
                          tone === 500 ? `var(--color-${color})` : `var(--color-${color}-${tone})`,
                      }}>
                      <Box padding={{ block: tone === 500 ? "5xl" : "3xl", inline: "2xl" }}>
                        <Text size="xs" skin={tone > 400 ? "white" : "black"}>
                          {tone}
                        </Text>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Stack>
          ),
        )}
      </Theme>
    );
  },
};

export const Colors: Story = {
  render: (): React.ReactElement => {
    return (
      <Theme>
        <Table appearance={["border-rows", "border-columns", "striped-rows"]}>
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th">Name</Table.Cell>
              <Table.Cell as="th">Value</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {Object.entries(color).map(([key, val]) => (
              <Table.Row key={key}>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{val}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Theme>
    );
  },
};

export const Screens: Story = {
  render: (): React.ReactElement => {
    return (
      <Theme>
        <Table appearance={["border-rows", "border-columns", "striped-rows"]}>
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th">Name</Table.Cell>
              <Table.Cell as="th">Value</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {Object.entries(screens).map(([key, val]) => (
              <Table.Row key={key}>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{val}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Theme>
    );
  },
};

export const Viewport: Story = {
  render: (): React.ReactElement => {
    return (
      <Theme>
        <Table appearance={["border-rows", "border-columns", "striped-rows"]}>
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th">Name</Table.Cell>
              <Table.Cell as="th">Value</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {Object.entries(viewport).map(([key, val]) => (
              <Table.Row key={key}>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{val}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Theme>
    );
  },
};

export const Breakpoints: Story = {
  render: (): React.ReactElement => {
    return (
      <Theme>
        <Table appearance={["border-rows", "border-columns", "striped-rows"]}>
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th">Name</Table.Cell>
              <Table.Cell as="th">Value</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {Object.entries(breakpoints).map(([key, val]) => (
              <Table.Row key={key}>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{val}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Theme>
    );
  },
};

export const FontFamily: Story = {
  render: (): React.ReactElement => {
    return (
      <Theme>
        <Table appearance={["border-rows", "border-columns", "striped-rows"]}>
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th">Name</Table.Cell>
              <Table.Cell as="th">Value</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {Object.entries(fontFamily).map(([key, val]) => (
              <Table.Row key={key}>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{val}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Theme>
    );
  },
};

export const FontSize: Story = {
  render: (): React.ReactElement => {
    return (
      <Theme>
        <Table appearance={["border-rows", "border-columns", "striped-rows"]}>
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th">Name</Table.Cell>
              <Table.Cell as="th">Value</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {Object.entries(fontSize).map(([key, val]) => (
              <Table.Row key={key}>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{val}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Theme>
    );
  },
};

export const FontWeight: Story = {
  render: (): React.ReactElement => {
    return (
      <Theme>
        <Table appearance={["border-rows", "border-columns", "striped-rows"]}>
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th">Name</Table.Cell>
              <Table.Cell as="th">Value</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {Object.entries(fontWeight).map(([key, val]) => (
              <Table.Row key={key}>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{val}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Theme>
    );
  },
};

export const LineHeight: Story = {
  render: (): React.ReactElement => {
    return (
      <Theme>
        <Table appearance={["border-rows", "border-columns", "striped-rows"]}>
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th">Name</Table.Cell>
              <Table.Cell as="th">Value</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {Object.entries(lineHeight).map(([key, val]) => (
              <Table.Row key={key}>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{val}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Theme>
    );
  },
};

export const Spacings: Story = {
  render: (): React.ReactElement => {
    return (
      <Theme>
        <Table appearance={["border-rows", "border-columns", "striped-rows"]}>
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th">Name</Table.Cell>
              <Table.Cell as="th">Value</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {Object.entries(spacings).map(([key, val]) => (
              <Table.Row key={key}>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{val}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Theme>
    );
  },
};

export const Elevation: Story = {
  render: (): React.ReactElement => {
    return (
      <Theme>
        <Table appearance={["border-rows", "border-columns", "striped-rows"]}>
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th">Level</Table.Cell>
              <Table.Cell as="th">Z-Index</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {Object.entries(elevation).map(([key, val]) => (
              <Table.Row key={key}>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{val}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Theme>
    );
  },
};

export const Radius: Story = {
  render: (): React.ReactElement => {
    return (
      <Theme>
        <Table appearance={["border-rows", "border-columns", "striped-rows"]}>
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th">Name</Table.Cell>
              <Table.Cell as="th">Value</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {Object.entries(radius).map(([key, val]) => (
              <Table.Row key={key}>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{val}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Theme>
    );
  },
};

export const Shadows: Story = {
  render: (): React.ReactElement => {
    return (
      <Theme>
        <Table appearance={["border-rows", "border-columns", "striped-rows"]}>
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th">Name</Table.Cell>
              <Table.Cell as="th">Value</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {Object.entries(shadow).map(([key, val]) => (
              <Table.Row key={key}>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{val}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Theme>
    );
  },
};

export const Spaces: Story = {
  render: (): React.ReactElement => {
    return (
      <Theme>
        <Table appearance={["border-rows", "border-columns", "striped-rows"]}>
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th">Name</Table.Cell>
              <Table.Cell as="th">Value</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {Object.entries(spacings).map(([key, val]) => (
              <Table.Row key={key}>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{val}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Theme>
    );
  },
};

export const Duration: Story = {
  render: (): React.ReactElement => {
    return (
      <Theme>
        <Table appearance={["border-rows", "border-columns", "striped-rows"]}>
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th">Name</Table.Cell>
              <Table.Cell as="th">Value</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {Object.entries(duration).map(([key, val]) => (
              <Table.Row key={key}>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{val}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Theme>
    );
  },
};

export const Timing: Story = {
  render: (): React.ReactElement => {
    return (
      <Theme>
        <Table appearance={["border-rows", "border-columns", "striped-rows"]}>
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th">Name</Table.Cell>
              <Table.Cell as="th">Value</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {Object.entries(timing).map(([key, val]) => (
              <Table.Row key={key}>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{val}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Theme>
    );
  },
};

function Elements(): React.ReactElement {
  const { theme, setTheme } = useTheme<"metro" | "elegant">();
  const [isOpen, setOpen] = useState(false);

  const {
    formData: { username, gender, email, password },
    onFormChange,
    onFormReset,
  } = useStateForm({
    initialValues: {
      username: "",
      email: "",
      gender: "Prefer not to respond",
      password: "",
    },
    validators: ({ username, email, password }) => ({
      username: {
        condition: () => {
          return username ? /^[a-zA-Z0-9]+$/.exec(username) !== null : true;
        },
        description: "Username can only contain letters or digits.",
      },
      email: {
        condition: () => {
          return email ? /[\d%+._a-z-]+@[\d.a-z-]+.[a-z]{2,}$/.exec(email) !== null : true;
        },
        description: "The email address is not valid, make sure it follows the standard format.",
      },
      password: {
        condition: () => {
          return password ? /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.exec(password) !== null : true;
        },
        description:
          "Password must contain at least one number, one uppercase letter, one lowercase letter, and be at least 8 characters.",
      },
    }),
  });

  return (
    <>
      <Stack direction="column" gap="2xl" grow>
        <Tabs
          value={theme}
          alignment="center"
          onValueChange={(value) => {
            setTheme(value as "metro" | "elegant");
          }}>
          <Tabs.List>
            <Tabs.Item value="default">Default</Tabs.Item>
            <Tabs.Item value="metro">Metro</Tabs.Item>
            <Tabs.Item value="elegant">Elegant</Tabs.Item>
          </Tabs.List>
        </Tabs>
        <Card>
          <Card.Header>
            <Text as="h2">Create your account</Text>
          </Card.Header>

          <Card.Body>
            <Stack direction="column" gap="2xl">
              <Stack direction="column" gap="md">
                <FormField>
                  <FormField.Label htmlFor="username">Username</FormField.Label>
                  <FormField.Control>
                    <TextField
                      id="username"
                      type="text"
                      name="username"
                      value={username.value}
                      onChange={onFormChange}
                      skin={username.valid ? "neutral-faded" : "critical"}
                      placeholder="Enter your username"
                    />
                  </FormField.Control>
                  <FormField.Description>
                    You can use letters, numbers, and periods.
                  </FormField.Description>
                  <FormField.Error hidden={username.valid}>{username.error}</FormField.Error>
                </FormField>

                <FormField>
                  <FormField.Label htmlFor="gender">Gender</FormField.Label>
                  <FormField.Control>
                    <Select id="gender" value={gender.value} name="gender" onChange={onFormChange}>
                      <Select.Option value="Woman">Woman</Select.Option>
                      <Select.Option value="Man">Man</Select.Option>
                      <Select.Option value="Non-binary/non-conforming">
                        Non-binary/non-conforming
                      </Select.Option>
                      <Select.Option value="Prefer not to respond">
                        Prefer not to respond
                      </Select.Option>
                    </Select>
                  </FormField.Control>
                </FormField>

                <FormField>
                  <FormField.Label htmlFor="email">Email</FormField.Label>
                  <FormField.Control>
                    <TextField
                      id="email"
                      type="email"
                      name="email"
                      value={email.value}
                      onChange={onFormChange}
                      skin={email.valid ? "neutral-faded" : "critical"}
                      placeholder="Enter your email"
                    />
                  </FormField.Control>
                  <FormField.Error hidden={email.valid}>{email.error}</FormField.Error>
                </FormField>

                <FormField>
                  <FormField.Label htmlFor="password">Password</FormField.Label>
                  <FormField.Control>
                    <TextField
                      id="password"
                      type="password"
                      name="password"
                      value={password.value}
                      onChange={onFormChange}
                      skin={password.valid ? "neutral-faded" : "critical"}
                      placeholder="Enter your password"
                    />
                  </FormField.Control>
                  <FormField.Description>
                    Use 8 or more characters with a mix of letters, numbers, and symbols.
                  </FormField.Description>
                  <FormField.Error hidden={password.valid}>{password.error}</FormField.Error>
                </FormField>
              </Stack>
            </Stack>
            <Separator space={{ block: "xl" }} />
            <Stack items="start" justify="between">
              <Stack direction="column">
                <Text weight="semi-bold">Favorites</Text>
                <Text size="xs" skin="neutral">
                  Receive notifications when there is activity related to your favorite items.
                </Text>
              </Stack>
              <Stack gap="md" direction="column" items="baseline">
                <Switch size="sm">Push</Switch>
                <Switch size="sm">Email</Switch>
                <Switch size="sm">Slack</Switch>
              </Stack>
            </Stack>
            <Separator space={{ block: "xl" }} />
            <Stack items="start" justify="between">
              <Stack direction="column">
                <Text weight="semi-bold">New documents</Text>
                <Text size="xs" skin="neutral">
                  Receive notifications whenever people on your team create new documents.
                </Text>
              </Stack>
              <Stack gap="md" direction="column" items="baseline">
                <Switch size="sm">Push</Switch>
                <Switch size="sm">Email</Switch>
                <Switch size="sm">Slack</Switch>
              </Stack>
            </Stack>
          </Card.Body>
          <Separator />
          <Card.Footer>
            <Stack justify="end" gap="md">
              <Button skin="neutral" appearance="outline" onClick={(): void => onFormReset()}>
                Clean
              </Button>
              <Button onClick={(): void => setOpen(true)}>Create an account</Button>
            </Stack>
          </Card.Footer>
        </Card>
      </Stack>
      <Dialog open={isOpen} size="sm">
        <Dialog.Header>
          <Text as="h4">Are you ready to create your account?</Text>
        </Dialog.Header>
        <Dialog.Body>
          <Text size="sm" skin="neutral">
            By proceeding, you ll be establishing a new account with us. Your information will be
            securely stored on our servers for your future access.
          </Text>
        </Dialog.Body>
        <Dialog.Footer>
          <Stack gap="md" justify="end">
            <Button
              skin="neutral"
              appearance="outline"
              type="button"
              onClick={(): void => setOpen(false)}>
              Cancel
            </Button>
            <Button type="button" skin="success" onClick={(): void => setOpen(false)}>
              Create Account
            </Button>
          </Stack>
        </Dialog.Footer>
      </Dialog>
    </>
  );
}

export const CustomTokens: Story = {
  render: (): React.ReactElement => {
    return (
      <Theme<"metro" | "elegant">
        tokens={{
          metro: {
            color: {
              primary: "#3f51b5",
            },
            fontFamily: {
              base: "'Roboto Serif', serif",
            },
            components: {
              "text-field": {
                radius: "none",
              },
              "select": {
                radius: "none",
              },
              "card": {
                radius: "none",
              },
              "switch": {
                radius: "none",
              },
              "dialog": {
                radius: "none",
                shadow: "xl",
              },
              "tabs": {
                radius: "none",
              },
              "button": {
                radius: "none",
              },
            },
          },
          elegant: {
            fontFamily: {
              base: "'DM Sans', sans-serif",
            },
            color: {
              "background-backdrop": "rgb(200 200 200 / 70%)",
              "primary": "#e91e63",
              "critical": "#ef4444",
              "success": "#14784a",
            },
            components: {
              "button": {
                radius: "full",
              },
              "tabs": {
                radius: "xl",
              },
              "text-field": {
                radius: "2xl",
              },
              "select": {
                radius: "2xl",
              },
              "backdrop": {
                blur: "md",
              },
            },
          },
        }}
        theme="metro">
        <Container screen="lg" alignment="center">
          <Elements />
        </Container>
      </Theme>
    );
  },
};
