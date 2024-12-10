import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Accordion, Text } from "../../index";
// Icons
import { FiPlus, FiMinus, FiChevronDown, FiChevronUp } from "react-icons/fi";

type Story = StoryObj<typeof Accordion>;

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  subcomponents: {
    "Accordion.Item": Accordion.Item as React.FC<unknown>,
    "Accordion.Header": Accordion.Header as React.FC<unknown>,
    "Accordion.Body": Accordion.Body as React.FC<unknown>,
  },
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

const data = [
  {
    title: "Connected accounts",
    description: "Manage your linked social and work accounts",
    body: "Connect your accounts from Google, GitHub, or Microsoft to enable single sign-on and streamline your workflow. Connected accounts can be used for quick login and importing your preferences across platforms. You can revoke access to any connected account at any time.",
  },
  {
    title: "Notifications",
    description: "Customize your notification preferences",
    body: "Choose which updates you want to receive. You can get notifications for: security alerts, billing updates, newsletter and product announcements, usage reports, and scheduled maintenance. Notifications can be delivered via email, SMS, or push notifications on your devices.",
  },
  {
    title: "Contact Support",
    description: "We're here to help 24/7",
    body: "Our support team is available around the clock to assist you. For billing inquiries, technical issues, or general questions, you can reach us through live chat, email at support@example.com, or schedule a call with our technical team. Premium support is available for enterprise customers.",
  },
];

export const Base: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    children: (
      <>
        {data.map(({ title, description, body }) => (
          <Accordion.Item value={title}>
            {({ open }) => (
              <>
                <Accordion.Header rightSlot={open ? <FiChevronUp /> : <FiChevronDown />}>
                  <Text weight="bold" space={{ y: "xs" }}>
                    {title}
                  </Text>
                  <Text size="sm">{description}</Text>
                </Accordion.Header>
                <Accordion.Body>
                  <Text size="sm" skin="neutral">
                    {body}
                  </Text>
                </Accordion.Body>
              </>
            )}
          </Accordion.Item>
        ))}
      </>
    ),
  },
};

export const Border: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    appearance: "border",
    children: (
      <>
        {data.map(({ title, body }) => (
          <Accordion.Item value={title}>
            {({ open }) => (
              <>
                <Accordion.Header rightSlot={open ? <FiMinus /> : <FiPlus />}>
                  <Text weight="medium">{title}</Text>
                </Accordion.Header>
                <Accordion.Body>
                  <Text size="sm" skin="neutral">
                    {body}
                  </Text>
                </Accordion.Body>
              </>
            )}
          </Accordion.Item>
        ))}
      </>
    ),
  },
};

export const MultipleExpanded: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    multipleExpanded: true,
    appearance: "border-row",
    children: (
      <>
        {data.map(({ title, body }) => (
          <Accordion.Item value={title}>
            {({ open }) => (
              <>
                <Accordion.Header rightSlot={open ? <FiMinus /> : <FiPlus />}>
                  <Text weight="medium">{title}</Text>
                </Accordion.Header>
                <Accordion.Body>
                  <Text size="sm" skin="neutral">
                    {body}
                  </Text>
                </Accordion.Body>
              </>
            )}
          </Accordion.Item>
        ))}
      </>
    ),
  },
};
