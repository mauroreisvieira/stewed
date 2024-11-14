import React, { useState } from "react";
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
  Calendar,
  Popover,
  Hue,
} from "@stewed/react";
// Hooks
import { useSelect, useToggle } from "@stewed/hooks";
import { useDateTime } from "@hello-week/hooks";
// Icons
import { TbPin, TbStar, TbPlus } from "react-icons/tb";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdOutlineCalendarToday,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { FiCopy } from "react-icons/fi";
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
    const { formatDate } = useDateTime();

    const [expires, setExpires] = useState<Date>(new Date());

    const items = [
      {
        name: "Card",
        icon: <FaCreditCard />,
      },
      {
        name: "Paypal",
        icon: <FaPaypal />,
      },
      {
        name: "Apple",
        icon: <FaApple />,
      },
    ];

    // Using the useSelect hook to manage selection
    const { index, setIndex } = useSelect<{ name: string; icon: React.ReactNode }>(items, 0);

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
              <Stack gap="md">
                {items.map(({ name, icon }, idx) => (
                  <Box
                    key={name}
                    radius="md"
                    borderWidth={1}
                    borderStyle="solid"
                    borderColor={idx === index ? "success" : "neutral-faded"}
                    padding={{ inline: "lg", block: "lg" }}
                    onClick={() => setIndex(idx)}
                    fullWidth
                  >
                    <Text size="2xl" alignment="center">
                      {icon}
                    </Text>
                    <Text size="sm" alignment="center">
                      {name}
                    </Text>
                  </Box>
                ))}
              </Stack>
            </Box>
            <Stack direction="column" gap="lg">
              <FormField>
                <FormField.Label>Name</FormField.Label>
                <FormField.Control>
                  <TextField
                    id="name"
                    type="name"
                    placeholder="Card name"
                    defaultValue="Mr. Benjamin Martinez"
                    fullWidth
                  />
                </FormField.Control>
              </FormField>

              <FormField>
                <FormField.Label>Card number</FormField.Label>
                <FormField.Control>
                  <TextField id="card" type="text" defaultValue={"0001211022912221"} fullWidth />
                </FormField.Control>
              </FormField>

              <Stack gap="xl">
                <Stack size={8}>
                  <FormField>
                    <FormField.Label>Expires</FormField.Label>
                    <FormField.Control>
                      <Popover<HTMLInputElement>
                        renderAnchor={({ ref, open }) => (
                          <TextField
                            rootRef={ref}
                            onFocus={open}
                            value={expires ? formatDate(expires) : ""}
                            readOnly
                            leftSlot={<MdOutlineCalendarToday />}
                            placeholder="Select a date"
                            fullWidth
                          />
                        )}
                        offset={6}
                        placement="bottom-start"
                      >
                        {({ close }) => (
                          <Box padding={{ block: "sm", inline: "sm" }}>
                            <Calendar
                              defaultDate={expires ? new Date(expires) : undefined}
                              selectedDates={expires ? [expires] : undefined}
                              siblingMonthDays={true}
                              formatDate={{
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                weekday: "narrow",
                              }}
                              onDaySelected={(day) => {
                                setExpires(day.date);
                                close();
                              }}
                            >
                              <Calendar.Navigation>
                                {({ locked, month, year, onPrev, onNext }) => (
                                  <>
                                    <Button
                                      skin="neutral"
                                      appearance="ghost"
                                      size="sm"
                                      iconOnly
                                      aria-label="Previous month"
                                      disabled={locked}
                                      onClick={onPrev}
                                      leftSlot={<MdKeyboardArrowLeft />}
                                    />

                                    <Stack justify="center" grow>
                                      <Text weight="medium">
                                        {month} {year}
                                      </Text>
                                    </Stack>

                                    <Button
                                      skin="neutral"
                                      appearance="ghost"
                                      size="sm"
                                      iconOnly
                                      onClick={onNext}
                                      aria-label="Next month"
                                      disabled={locked}
                                      leftSlot={<MdKeyboardArrowRight />}
                                    />
                                  </>
                                )}
                              </Calendar.Navigation>
                              <Calendar.Week />
                              <Calendar.Month />
                            </Calendar>
                          </Box>
                        )}
                      </Popover>
                    </FormField.Control>
                  </FormField>
                </Stack>

                <Stack size={4}>
                  <FormField>
                    <FormField.Label>CVC</FormField.Label>
                    <FormField.Control>
                      <TextField id="cvc" type="text" defaultValue={123} />
                    </FormField.Control>
                  </FormField>
                </Stack>
              </Stack>
            </Stack>
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
