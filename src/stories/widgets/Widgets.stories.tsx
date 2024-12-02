import React, { useMemo, useState } from "react";
// UI Components
import {
  Theme,
  Card,
  Button,
  Box,
  Stack,
  Text,
  Dropdown,
  Container,
  TextField,
  Avatar,
  Separator,
  Switch,
  Progress,
  Tooltip,
  FormField,
  Group,
  ListBox,
  Hue,
} from "@stewed/react";
// Hooks
import { useSelect, useToggle, useInputMask, useInput } from "@stewed/hooks";
import { useDateTime } from "@hello-week/hooks";
// Icons
import { TbPin, TbStar, TbPlus } from "react-icons/tb";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdCheck } from "react-icons/md";
import { FiCopy, FiSearch } from "react-icons/fi";
import { FaPaypal, FaCreditCard, FaApple } from "react-icons/fa";

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

export const Team = {
  render: function Render() {
    return (
      <Container screen="lg" alignment="center" padding={{ block: "7xl" }}>
        <Card>
          <Card.Header>
            <Text as="h5">Your team</Text>
            <Text size="sm" skin="neutral" space={{ y: "lg" }}>
              Invite and manage your team members.
            </Text>

            <Stack items="baseline" gap="lg">
              <TextField placeholder="Email address" fullWidth />
              <Button>Invite</Button>
            </Stack>
          </Card.Header>
          <Card.Body>
            {team.map(({ id, name, email }) => (
              <React.Fragment key={id}>
                <Stack items="center" justify="between">
                  <Stack items="center" gap="md">
                    <Avatar name={name} />
                    <Stack direction="column" gap="xs">
                      <Text size="sm" weight="medium">
                        {name}
                      </Text>
                      <Text as="a" href="" size="xs" skin="neutral">
                        {email}
                      </Text>
                    </Stack>
                  </Stack>
                </Stack>
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
  render: function Render() {
    return (
      <Container screen="sm" alignment="center" padding={{ block: "7xl" }}>
        <Card style={{ flexGrow: 1 }}>
          <Card.Header>
            <Stack direction="column">
              <Text as="h5">Notification</Text>
              <Text size="sm" skin="neutral">
                Manage your notification settings.
              </Text>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Stack items="baseline" justify="between" gap="md">
              <Stack direction="column" grow={false} gap="sm">
                <Text weight="semi-bold">Comments</Text>
                <Text size="xs" skin="neutral">
                  Receive notifications when someone comments on your documents or mentions you.
                </Text>
              </Stack>
              <Stack gap="md" direction="column" items="baseline" grow={false}>
                <Switch size="sm">Push</Switch>
                <Switch size="sm">Email</Switch>
                <Switch size="sm">Slack</Switch>
              </Stack>
            </Stack>
            <Separator space={{ block: "xl" }} />
            <Stack items="start" justify="between">
              <Stack direction="column" gap="sm">
                <Text weight="semi-bold">Favorites</Text>
                <Text size="xs" skin="neutral">
                  Receive notifications when there is activity related to your favorite items.
                </Text>
              </Stack>
              <Stack gap="md" direction="column" items="baseline" grow={false}>
                <Switch size="sm">Push</Switch>
                <Switch size="sm">Email</Switch>
                <Switch size="sm">Slack</Switch>
              </Stack>
            </Stack>
            <Separator space={{ block: "xl" }} />
            <Stack items="start" justify="between">
              <Stack direction="column" gap="sm">
                <Text weight="semi-bold">New documents</Text>
                <Text size="xs" skin="neutral">
                  Receive notifications whenever people on your team create new documents.
                </Text>
              </Stack>
              <Stack gap="md" direction="column" items="baseline" grow={false}>
                <Switch size="sm">Push</Switch>
                <Switch size="sm">Email</Switch>
                <Switch size="sm">Slack</Switch>
              </Stack>
            </Stack>
          </Card.Body>
          <Card.Footer>
            <Button appearance="soft" fullWidth>
              Save preferences
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    );
  },
};

export const RecentActivity = {
  render: function Render() {
    const { createDate } = useDateTime();

    return (
      <Container screen="md" alignment="center" padding={{ block: "7xl" }}>
        <Card>
          <Card.Header>
            <Stack items="baseline" justify="between" gap="2xl">
              <Text as="h5">Recent activity</Text>
              <Tooltip<HTMLButtonElement>
                placement="top"
                delay={1000}
                renderAnchor={(props) => (
                  <Button size="sm" leftSlot={<TbPin />} appearance="ghost" iconOnly {...props}>
                    Bookmark
                  </Button>
                )}
              >
                <Text size="xs" skin="white" inherit>
                  Pin this widget to your dashboard for quick access.
                </Text>
              </Tooltip>
            </Stack>
            <Text size="sm" skin="neutral">
              Review what has happened over the past days.
            </Text>
          </Card.Header>
          <Card.Body>
            <Stack justify="between" gap="2xl" wrap="wrap">
              <Stack gap="md" items="center">
                <Avatar size="md" name="Noah Andersen" />
                <Stack direction="column">
                  <Text weight="medium">Noah Andersen</Text>
                  <Text size="sm" skin="neutral">
                    Purchased 15 office chairs and 2 drum sets
                  </Text>
                </Stack>
              </Stack>
              <Text size="xs" skin="neutral" hidden responsive={{ md: { hidden: false } }}>
                {createDate().format({
                  dateStyle: "medium",
                  timeStyle: "short",
                  hour12: true,
                })}
              </Text>
            </Stack>
            <Separator space={{ block: "2xl" }} />
            <Stack justify="between" gap="2xl" wrap="wrap">
              <Stack gap="md" items="center">
                <Avatar size="md" name="Olivia Patel" />
                <Stack direction="column">
                  <Text weight="medium">Olivia Patel</Text>
                  <Text size="sm" skin="neutral">
                    Updated client details for{" "}
                    <Text as="a" size="sm" href="">
                      Acme Co.
                    </Text>
                  </Text>
                </Stack>
              </Stack>
              <Text size="xs" skin="neutral" hidden responsive={{ md: { hidden: false } }}>
                {createDate().subtract(10, "days").format({
                  dateStyle: "medium",
                  timeStyle: "short",
                  hour12: true,
                })}
              </Text>
            </Stack>
          </Card.Body>
        </Card>
      </Container>
    );
  },
};

export const Suggested = {
  render: function Render() {
    const [liked, handleToggle] = useToggle(false);

    return (
      <Container screen="sm" alignment="center" padding={{ block: "7xl" }}>
        <Card>
          <Card.Body>
            <Stack items="baseline">
              <Box>
                <Text weight="semi-bold" space={{ y: "lg" }}>
                  @stewed/react
                </Text>
                <Text skin="neutral" size="sm">
                  This is a collection of reusable React components built with SCSS, accompanied by
                  React hooks, and a set of utilities to enhance the front-end development
                  experience.
                </Text>
              </Box>
              <Group>
                <Button
                  size="sm"
                  skin="neutral"
                  appearance={liked ? "filled" : "outline"}
                  leftSlot={<TbStar />}
                  onClick={handleToggle}
                >
                  Start
                </Button>
                <Dropdown<HTMLButtonElement>
                  placement="bottom-end"
                  renderAnchor={({ ref, isOpen, open, close }) => (
                    <Button
                      ref={ref}
                      onClick={isOpen ? close : open}
                      pressed={isOpen}
                      size="sm"
                      skin="neutral"
                      appearance="outline"
                      leftSlot={
                        isOpen ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />
                      }
                      iconOnly
                    >
                      Start
                    </Button>
                  )}
                >
                  {() => (
                    <ListBox>
                      <ListBox.Group title="Suggested list">
                        <ListBox.Item>Future ideas</ListBox.Item>
                        <ListBox.Item>My Stack</ListBox.Item>
                        <ListBox.Item>Inspiration</ListBox.Item>
                      </ListBox.Group>
                      <Separator space={{ block: "none" }} />
                      <ListBox.Group>
                        <ListBox.Item leftSlot={<TbPlus />}>Create list</ListBox.Item>
                      </ListBox.Group>
                    </ListBox>
                  )}
                </Dropdown>
              </Group>
            </Stack>
          </Card.Body>
        </Card>
      </Container>
    );
  },
};

export const ShareSettings = {
  render: function Render() {
    return (
      <Container screen="sm" alignment="center" padding={{ block: "7xl" }}>
        <Card>
          <Card.Header>
            <Stack items="center" gap="md">
              <Avatar name="Acme" size="xl" appearance="square" />
              <Stack direction="column" gap="xxs">
                <Text as="h5">Share Settings</Text>
                <Text size="sm" skin="neutral">
                  Manage the authorization of this workspaces
                </Text>
              </Stack>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Stack direction="column" gap="xl">
              <Card>
                <Card.Body>
                  <Stack justify="between">
                    <div>
                      <Text weight="medium" space={{ y: "sm" }}>
                        Public Access
                      </Text>
                      <Text size="xs">Publish and share link with anyone</Text>
                    </div>
                    <Switch defaultChecked />
                  </Stack>
                </Card.Body>
              </Card>

              <Stack direction="column" gap="sm">
                <Text weight="medium">Team members</Text>
                <Stack justify="between" gap="lg">
                  <TextField
                    placeholder="Enter email"
                    rightSlot={
                      <Dropdown<HTMLButtonElement>
                        placement="bottom-end"
                        renderAnchor={({ ref, isOpen, open, close }) => (
                          <Button
                            ref={ref}
                            onClick={isOpen ? close : open}
                            size="xs"
                            skin="neutral"
                            appearance="ghost"
                            rightSlot={
                              isOpen ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />
                            }
                          >
                            Can view
                          </Button>
                        )}
                      >
                        {({ close }) => (
                          <ListBox>
                            <ListBox.Item onClick={close}>Can view</ListBox.Item>
                            <ListBox.Item onClick={close}>Can edit</ListBox.Item>
                          </ListBox>
                        )}
                      </Dropdown>
                    }
                    fullWidth
                  />
                  <Button>Send Invite</Button>
                </Stack>
              </Stack>
            </Stack>

            <Separator space={{ block: "xl" }} />

            {team.map(({ id, name, email }) => (
              <React.Fragment key={id}>
                <Stack items="center" justify="between">
                  <Stack items="center" gap="md">
                    <Avatar name={name} />
                    <Stack direction="column" gap="xs">
                      <Text size="sm" weight="medium">
                        {name}
                      </Text>
                      <Text as="a" href="" size="xs" skin="neutral">
                        {email}
                      </Text>
                    </Stack>
                  </Stack>
                  <Dropdown<HTMLButtonElement>
                    placement="bottom-end"
                    renderAnchor={({ ref, isOpen, open, close }) => (
                      <Button
                        ref={ref}
                        onClick={isOpen ? close : open}
                        size="xs"
                        skin="neutral"
                        appearance="ghost"
                        rightSlot={
                          isOpen ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />
                        }
                      >
                        Can view
                      </Button>
                    )}
                  >
                    {({ close }) => (
                      <ListBox>
                        <ListBox.Item onClick={close}>Can view</ListBox.Item>
                        <ListBox.Item onClick={close}>Can edit</ListBox.Item>
                      </ListBox>
                    )}
                  </Dropdown>
                </Stack>
                <Separator space={{ block: "xl" }} />
              </React.Fragment>
            ))}

            <FormField>
              <FormField.Label>Copy link</FormField.Label>
              <FormField.Control>
                <TextField
                  placeholder="https://figma.com/design/oobq11Zltwz0ai"
                  rightSlot={
                    <Button size="sm" appearance="ghost" leftSlot={<FiCopy />} iconOnly>
                      Copy
                    </Button>
                  }
                  fullWidth
                />
              </FormField.Control>
            </FormField>
          </Card.Body>
        </Card>
      </Container>
    );
  },
};

export const PaymentMethod = {
  render: function Render() {
    const items = [
      {
        name: "Card",
        icon: <FaCreditCard size={24} />,
      },
      {
        name: "Paypal",
        icon: <FaPaypal size={24} />,
      },
      {
        name: "Apple",
        icon: <FaApple size={24} />,
      },
    ];

    // Using the useSelect hook to manage selection
    const { index, setIndex } = useSelect<{ name: string; icon: React.ReactNode }>(items, 0);

    const regexPatterns = {
      name: /^[a-zA-Z ]+$/,
      creditCard: /^\d{4}(\s?\d{4}){3}$/, // Matches 4 groups of 4 digits (e.g., 1234 5678 1234 5678)
      cvv: /^\d{3,4}$/, // Matches 3 or 4 digits (e.g., 123 or 1234)
      expireDate: /^(0[1-9]|1[0-2])\/\d{2}$/, // MM/YY format (e.g., 12/25)
    };

    const nameMask = useInputMask({
      defaultValue: "Benjamin Martinez",
      pattern: regexPatterns.name,
      required: true,
    });

    const creditCardMask = useInputMask({
      defaultValue: "1234567812345678",
      mask: "XXXX XXXX XXXX XXXX",
      pattern: regexPatterns.creditCard,
      required: true,
    });

    const cvvMask = useInputMask({
      defaultValue: "123",
      mask: "XXX",
      pattern: regexPatterns.cvv,
      required: true,
    });

    const expireDateMask = useInputMask({
      defaultValue: "03/24",
      mask: "MM/YY",
      pattern: regexPatterns.expireDate,
      required: true,
    });

    return (
      <Container screen="sm" alignment="center" padding={{ block: "7xl" }}>
        <Card>
          <Card.Header>
            <Stack gap="2xl">
              <Text as="h5">Payment Method</Text>
            </Stack>
            <Text size="sm" skin="neutral">
              Add a new payment method to your account.
            </Text>
          </Card.Header>
          <Card.Body>
            <Box space={{ y: "xl" }}>
              <Group gap="md" fullWidth>
                {items.map(({ name, icon }, idx) => (
                  <Box
                    as="button"
                    key={name}
                    radius="md"
                    skin={idx === index ? "success-faded" : "white"}
                    borderWidth={1}
                    borderStyle="solid"
                    aria-selected={idx === index}
                    borderColor={idx === index ? "success" : "neutral-faded"}
                    padding={{ inline: "lg", block: "lg" }}
                    onClick={() => setIndex(idx)}
                    fullWidth
                  >
                    <Text size="2xl" space={{ y: "sm" }} alignment="center">
                      {icon}
                    </Text>
                    <Text size="sm" weight="medium" alignment="center">
                      {name}
                    </Text>
                  </Box>
                ))}
              </Group>
            </Box>
            <Stack direction="column" gap="lg">
              <FormField>
                <FormField.Label>Name</FormField.Label>
                <FormField.Control>
                  <TextField
                    id="name"
                    type="name"
                    skin={nameMask.isValid ? "neutral" : "critical"}
                    value={nameMask.value}
                    onChange={nameMask.onChange}
                    onBlur={nameMask.onBlur}
                    placeholder="Card name"
                    fullWidth
                  />
                </FormField.Control>
              </FormField>

              <FormField>
                <FormField.Label>Card number</FormField.Label>
                <FormField.Control>
                  <TextField
                    id="card"
                    type="text"
                    skin={creditCardMask.isValid ? "neutral" : "critical"}
                    value={creditCardMask.value}
                    onChange={creditCardMask.onChange}
                    onBlur={creditCardMask.onBlur}
                    fullWidth
                  />
                </FormField.Control>
              </FormField>

              <Stack gap="xl">
                <Stack size={8}>
                  <FormField>
                    <FormField.Label>Expires</FormField.Label>
                    <FormField.Control>
                      <TextField
                        placeholder="Select a date"
                        skin={expireDateMask.isValid ? "neutral" : "critical"}
                        value={expireDateMask.value}
                        onChange={expireDateMask.onChange}
                        onBlur={expireDateMask.onBlur}
                        fullWidth
                      />
                    </FormField.Control>
                  </FormField>
                </Stack>

                <Stack size={4}>
                  <FormField>
                    <FormField.Label>CVC</FormField.Label>
                    <FormField.Control>
                      <TextField
                        id="cvc"
                        type="text"
                        skin={cvvMask.isValid ? "neutral" : "critical"}
                        value={cvvMask.value}
                        onChange={cvvMask.onChange}
                        onBlur={cvvMask.onBlur}
                      />
                    </FormField.Control>
                  </FormField>
                </Stack>
              </Stack>
            </Stack>
          </Card.Body>
          <Card.Footer>
            <Button size="lg" appearance="soft" fullWidth>
              Save
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    );
  },
};

export const NewMessage = {
  render: function Render() {
    const [selected, setSelected] = useState<number[]>([]);

    const { value, onChange } = useInput<string>("");

    const filterTeam = useMemo(() => {
      if (value) {
        return team.filter(({ name }) => name.toUpperCase().includes(value.toUpperCase()));
      }

      return team;
    }, [value]);

    return (
      <Container screen="sm" alignment="center" padding={{ block: "7xl" }}>
        <Card>
          <Card.Header>
            <Stack gap="2xl">
              <Text as="h5">New message</Text>
            </Stack>
            <Text size="sm" skin="neutral">
              Invite a user to create a new group message.
            </Text>
          </Card.Header>
          <Separator />
          <Box padding={{ inline: "md" }}>
            <TextField
              leftSlot={<FiSearch />}
              appearance="ghost"
              outlineFocus={false}
              onChange={onChange}
              value={value}
              placeholder="Search a user..."
            />
          </Box>
          <Separator />
          <Card.Body>
            <ListBox>
              {filterTeam.length > 0 ? (
                <>
                  {filterTeam.map(({ id, name, email }) => (
                    <ListBox.Item
                      key={id}
                      onClick={() => {
                        setSelected((prev) => {
                          const exists = prev.some((curr) => curr === id);

                          if (exists) {
                            return prev.filter((curr) => curr !== id);
                          }

                          return [...prev, id];
                        });
                      }}
                      rightSlot={selected.includes(id) ? <MdCheck /> : ""}
                    >
                      <Box padding={{ block: "sm" }}>
                        <Stack gap="lg" items="center">
                          <Avatar name={name} />
                          <Stack direction="column" gap="xs">
                            <Text weight="medium">{name}</Text>
                            <Text size="xs" skin="neutral">
                              {email}
                            </Text>
                          </Stack>
                        </Stack>
                      </Box>
                    </ListBox.Item>
                  ))}
                </>
              ) : (
                <Box padding={{ block: "4xl" }}>
                  <Text alignment="center" skin="neutral-faded">
                    No users found.
                  </Text>
                </Box>
              )}
            </ListBox>
          </Card.Body>
          <Separator />
          <Card.Footer>
            <Stack justify="between">
              <Stack gap="sm">
                <Avatar.Group>
                  {team
                    .filter(({ id }) => selected.includes(id))
                    .map(({ id, name }) => (
                      <Avatar key={id} name={name} size="sm" />
                    ))}
                </Avatar.Group>
              </Stack>
              <Button disabled={selected.length === 0}>Continue</Button>
            </Stack>
          </Card.Footer>
        </Card>
      </Container>
    );
  },
};

export const CompletedProgress = {
  render: function Render() {
    return (
      <Container screen="xl" alignment="center" padding={{ block: "7xl" }}>
        <Hue skin={{ from: "indigo-600", to: "blue-900" }}>
          <Card padding={{ block: "2xl", inline: "2xl" }} shadow="lg">
            <Card.Body>
              <Stack direction="column" gap="xl">
                <Text weight="semi-bold" skin="white" space={{ y: "lg" }}>
                  UI Component Progress
                </Text>
                <Text skin="white" size="3xl" weight="light" space={{ y: "2xl" }}>
                  This widget tracks the percentage of UI components already built in relation to
                  the total project scope.
                </Text>
                <Stack gap="md" items="center">
                  <Avatar
                    image={{ src: "./images/logo/stewed.svg" }}
                    skin="neutral"
                    size="2xl"
                    name="Stewed"
                  />
                  <Stack direction="column">
                    <Text weight="medium" skin="white" size="xs">
                      Assigned to
                    </Text>
                    <Text weight="medium" size="lg" skin="white">
                      Stewed React Kit
                    </Text>
                  </Stack>
                </Stack>
                <Stack gap="4xl" items="center">
                  <Progress size="lg" skin="white" value={70} />
                  <Text weight="bold" skin="white">
                    70%
                  </Text>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Hue>
      </Container>
    );
  },
};
