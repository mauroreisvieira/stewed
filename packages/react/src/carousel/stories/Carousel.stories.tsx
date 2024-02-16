import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Theme, Carousel } from "../../index";

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
    slidesPerView: 1,
    loop: true,
    children: Array.from({ length: 3 }).map((_, index) => (
      <div key={index}>
        <img src="https://placehold.co/1200x400" />
      </div>
    )),
  },
};
