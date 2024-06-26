import React from "react";
// UI Components
import {
  Theme,
  Card,
  Button,
  Box,
  Text,
  Container,
  TextField,
  Avatar,
  Separator,
  Switch,
  Progress,
  Tooltip,
  FormField,
  Select,
} from "@stewed/react";
// Hooks
import { useDateTime } from "@stewed/hooks";
// Icons
import { TbPin } from "react-icons/tb";

const meta = {
  title: "Examples/Widgets",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Team = {
  render: function Example() {
    const team = [
      {
        id: 1,
        name: "Sophia Chang",
        email: "sophia.chang@example.com",
        open: false,
      },
      {
        id: 2,
        name: "Olivia Patel",
        email: "olivia.patel@example.com",
        open: false,
      },
      {
        id: 3,
        name: "Benjamin Martinez",
        email: "benjamin.martinez@example.com",
        open: false,
      },
      {
        id: 4,
        name: "Noah Andersen",
        email: "noah.andersen@example.com",
        open: false,
      },
      {
        id: 5,
        name: "Liam O'Connor",
        email: "liam.connor@example.com",
        open: false,
      },
    ];

    return (
      <Container screen="lg" alignment="center" padding={{ block: "7xl" }}>
        <Card>
          <Card.Header>
            <Text as="h5">Your team</Text>
            <Text size="sm" skin="neutral" space={{ y: "lg" }}>
              Invite and manage your team members.
            </Text>

            <Box items="baseline" gap="lg">
              <TextField placeholder="Email address" />
              <Button>Invite</Button>
            </Box>
          </Card.Header>
          <Card.Body>
            {team.map(({ id, name, email }) => (
              <React.Fragment key={id}>
                <Box items="center" justify="between">
                  <Box items="center" gap="md">
                    <Avatar name={name} />
                    <Box direction="column">
                      <Text size="sm" weight="medium">
                        {name}
                      </Text>
                      <Text as="a" href="" size="xs" skin="neutral" alignment="end">
                        {email}
                      </Text>
                    </Box>
                  </Box>
                </Box>
                <Separator space={{ block: "xl" }} />
              </React.Fragment>
            ))}
          </Card.Body>
        </Card>
      </Container>
    );
  },
};

export const Notification = {
  render: function Example() {
    return (
      <Container screen="sm" alignment="center" padding={{ block: "7xl" }}>
        <Card>
          <Card.Header>
            <Box direction="column" space={{ y: "lg" }}>
              <Text as="h5">Notification</Text>
              <Text size="sm" skin="neutral">
                Manage your notification settings.
              </Text>
            </Box>
          </Card.Header>
          <Card.Body>
            <Box items="baseline" justify="between" gap="md">
              <Box direction="column">
                <Text weight="semi-bold">Comments</Text>
                <Text size="xs" skin="neutral">
                  Receive notifications when someone comments on your documents or mentions you.
                </Text>
              </Box>
              <Box gap="md" direction="column" items="baseline">
                <Switch size="sm">Push</Switch>
                <Switch size="sm">Email</Switch>
                <Switch size="sm">Slack</Switch>
              </Box>
            </Box>
            <Separator space={{ block: "xl" }} />
            <Box items="start" justify="between">
              <Box direction="column">
                <Text weight="semi-bold">Favorites</Text>
                <Text size="xs" skin="neutral">
                  Receive notifications when there is activity related to your favorite items.
                </Text>
              </Box>
              <Box gap="md" direction="column" items="baseline">
                <Switch size="sm">Push</Switch>
                <Switch size="sm">Email</Switch>
                <Switch size="sm">Slack</Switch>
              </Box>
            </Box>
            <Separator space={{ block: "xl" }} />
            <Box items="start" justify="between">
              <Box direction="column">
                <Text weight="semi-bold">New documents</Text>
                <Text size="xs" skin="neutral">
                  Receive notifications whenever people on your team create new documents.
                </Text>
              </Box>
              <Box gap="md" direction="column" items="baseline">
                <Switch size="sm">Push</Switch>
                <Switch size="sm">Email</Switch>
                <Switch size="sm">Slack</Switch>
              </Box>
            </Box>
          </Card.Body>
          <Card.Footer>
            <Button appearance="outline" fullWidth>
              Save preferences
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    );
  },
};

export const RecentActivity = {
  render: function Example() {
    const { createDate } = useDateTime();

    return (
      <Container screen="md" alignment="center" padding={{ block: "7xl" }}>
        <Card>
          <Card.Header>
            <Box items="baseline" justify="between" gap="2xl">
              <Text as="h5">Recent activity</Text>
              <Tooltip
                placement="top"
                content={
                  <Text size="xs" skin="inherit">
                    Pin this widget to your dashboard for quick access.
                  </Text>
                }>
                {(props) => (
                  <Button size="sm" leftSlot={<TbPin />} appearance="ghost" iconOnly {...props}>
                    Bookmark
                  </Button>
                )}
              </Tooltip>
            </Box>
            <Text size="sm" skin="neutral">
              Review what has happened over the past days.
            </Text>
          </Card.Header>
          <Card.Body>
            <Box justify="between" gap="2xl" wrap="wrap">
              <Box gap="md" items="center">
                <Avatar size="md" name="Noah Andersen" />
                <Box direction="column">
                  <Text weight="medium">Noah Andersen</Text>
                  <Text size="sm" skin="neutral">
                    Purchased 15 office chairs and 2 drum sets
                  </Text>
                </Box>
              </Box>
              <Text size="xs" skin="neutral">
                {createDate().format({
                  dateStyle: "medium",
                  timeStyle: "short",
                  hour12: true,
                })}
              </Text>
            </Box>
            <Separator space={{ block: "2xl" }} />
            <Box justify="between" gap="2xl" wrap="wrap">
              <Box gap="md" items="center">
                <Avatar size="md" name="Olivia Patel" />
                <Box direction="column">
                  <Text weight="medium">Olivia Patel</Text>
                  <Text size="sm" skin="neutral">
                    Updated client details for{" "}
                    <Text as="a" size="sm" href="">
                      Acme Co.
                    </Text>
                  </Text>
                </Box>
              </Box>
              <Text size="xs" skin="neutral">
                {createDate().subtract(10, "days").format({
                  dateStyle: "medium",
                  timeStyle: "short",
                  hour12: true,
                })}
              </Text>
            </Box>
          </Card.Body>
        </Card>
      </Container>
    );
  },
};

export const PaymentMethod = {
  render: function Example() {
    return (
      <Container screen="sm" alignment="center" padding={{ block: "7xl" }}>
        <Card>
          <Card.Header>
            <Box gap="2xl">
              <Text as="h5">Payment Method</Text>
            </Box>
            <Text size="sm" skin="neutral">
              Add a new payment method to your account.
            </Text>
          </Card.Header>
          <Card.Body>
            <Box justify="between" gap="2xl" wrap="wrap" space={{ y: "3xl" }}>
              <Box gap="md" items="center" grow>
                <Card hoverable>
                  <Card.Body>
                    <Text alignment="center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        width={24}>
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                    </Text>
                    <Text alignment="center">Card</Text>
                  </Card.Body>
                </Card>
              </Box>
              <Box gap="md" items="center" grow>
                <Card selected hoverable>
                  <Card.Body>
                    <Text alignment="center">
                      <svg role="img" viewBox="0 0 24 24" width={24}>
                        <path
                          d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"
                          fill="currentColor"
                        />
                      </svg>
                    </Text>
                    <Text alignment="center">Paypal</Text>
                  </Card.Body>
                </Card>
              </Box>
              <Box gap="md" items="center" grow>
                <Card hoverable>
                  <Card.Body>
                    <Text alignment="center">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&amp;:has([data-state=checked])]:border-primary"
                        htmlFor="apple">
                        <svg role="img" viewBox="0 0 24 24" width={24}>
                          <path
                            d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                            fill="currentColor"
                          />
                        </svg>
                      </label>
                    </Text>
                    <Text alignment="center">Apple</Text>
                  </Card.Body>
                </Card>
              </Box>
            </Box>
            <Box direction="column" gap="lg">
              <FormField>
                <FormField.Label>Name</FormField.Label>
                <FormField.Control>
                  <TextField id="name" type="name" placeholder="Card name" />
                </FormField.Control>
              </FormField>

              <FormField>
                <FormField.Label>Card number</FormField.Label>
                <FormField.Control>
                  <TextField id="card" type="text" />
                </FormField.Control>
              </FormField>

              <Box gap="xl">
                <FormField>
                  <FormField.Label>Expires</FormField.Label>
                  <FormField.Control>
                    <Select skin="default">
                      <Select.Option value={1}>Jan</Select.Option>
                      <Select.Option value={2}>Feb</Select.Option>
                      <Select.Option value={3}>Mar</Select.Option>
                      <Select.Option value={4}>Apr</Select.Option>
                    </Select>
                  </FormField.Control>
                </FormField>

                <FormField>
                  <FormField.Label>Year</FormField.Label>
                  <FormField.Control>
                    <Select skin="default">
                      <Select.Option value={1}>2024</Select.Option>
                      <Select.Option value={2}>2025</Select.Option>
                      <Select.Option value={3}>2026</Select.Option>
                      <Select.Option value={4}>2027</Select.Option>
                    </Select>
                  </FormField.Control>
                </FormField>

                <FormField>
                  <FormField.Label>CVC</FormField.Label>
                  <FormField.Control>
                    <TextField id="cvc" type="text" />
                  </FormField.Control>
                </FormField>
              </Box>
            </Box>
          </Card.Body>
          <Card.Footer>
            <Button fullWidth>Continue</Button>
          </Card.Footer>
        </Card>
      </Container>
    );
  },
};

export const CompletedProgress = {
  render: function Example() {
    return (
      <Container screen="xl" alignment="center" padding={{ block: "7xl" }}>
        <Card skin="primary" padding={{ block: "2xl", inline: "2xl" }}>
          <Card.Body>
            <Box direction="column" gap="xl">
              <Text weight="semi-bold" skin="white" space={{ y: "lg" }}>
                UI Component Progress
              </Text>
              <Text skin="white" size="3xl" weight="light" space={{ y: "2xl" }}>
                This widget tracks the percentage of UI components already built in relation to the
                total project scope.
              </Text>
              <Box gap="md" items="center">
                <Avatar src="./images/logo/stewed.svg" skin="neutral" size="2xl" name="Stewed" />
                <Box direction="column">
                  <Text weight="medium" skin="white" size="xs">
                    Assigned to
                  </Text>
                  <Text weight="medium" size="lg" skin="white">
                    Stewed React Kit
                  </Text>
                </Box>
              </Box>
              <Box gap="4xl" items="center">
                <Progress size="lg" skin="white" value={70} />
                <Text weight="bold" skin="white">
                  70%
                </Text>
              </Box>
            </Box>
          </Card.Body>
        </Card>
      </Container>
    );
  },
};
