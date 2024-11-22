import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Theme, Carousel, Card, Text, Hue } from "../../index";

type Story = StoryObj<typeof Carousel>;

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Base: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    children: Array.from({ length: 4 }).map((_, index) => (
      <Hue skin="slate-100" key={index}>
        <Card shadow="none" padding={{ block: "7xl", inline: "7xl" }}>
          <Card.Body>
            <Text alignment="center" size="8xl">
              {index + 1}
            </Text>
          </Card.Body>
        </Card>
      </Hue>
    )),
  },
};

export const PerView: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    loop: false,
    responsive: {
      sm: {
        perView: 1,
      },
      md: {
        perView: 2,
      },
      lg: {
        perView: 3,
      },
    },
    children: Array.from({ length: 12 }).map((_, index) => (
      <Hue skin="slate-100" key={index}>
        <Card shadow="none" padding={{ block: "7xl", inline: "7xl" }}>
          <Card.Body>
            <Text alignment="center" size="8xl">
              {index + 1}
            </Text>
          </Card.Body>
        </Card>
      </Hue>
    )),
  },
};
