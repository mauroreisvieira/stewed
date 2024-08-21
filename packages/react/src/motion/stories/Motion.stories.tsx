import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Motion, Button, Box, Stack } from "../../index";

type Story = StoryObj<typeof Motion>;

const meta: Meta<typeof Motion> = {
  title: "Components/Motion",
  component: Motion,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Zoom: Story = {
  render: function Render() {
    const zooms = ["zoom-in", "zoom-out", "zoom-in-soft", "zoom-out-soft"] as const;

    const [animation, setAnimation] = useState<(typeof zooms)[number]>();
    return (
      <Stack justify="center" direction="column" items="center" gap="2xl">
        <Stack style={{ width: 200, height: 200, overflow: "hidden" }}>
          <Motion
            duration="slowly"
            timing="ease-in-out"
            animation={animation}
            onDone={() => {
              setAnimation(undefined);
            }}>
            <Box
              padding={{ block: "9xl", inline: "9xl" }}
              skin="primary"
              style={{ width: 200, height: 200 }}
            />
          </Motion>
        </Stack>
        <Stack gap="lg" wrap="wrap" items="center" justify="center">
          {zooms.map((i) => (
            <Button key={i} skin="neutral" onClick={() => setAnimation(i)}>
              {i}
            </Button>
          ))}
        </Stack>
      </Stack>
    );
  },
};

export const Fade: Story = {
  render: function Render() {
    const fades = ["fade-in", "fade-out"] as const;

    const [animation, setAnimation] = useState<(typeof fades)[number]>();
    return (
      <Stack justify="center" direction="column" items="center" gap="2xl">
        <Stack style={{ width: 200, height: 200, overflow: "hidden" }}>
          <Motion
            duration="slowly"
            timing="ease-in-out"
            animation={animation}
            onDone={() => {
              setAnimation(undefined);
            }}>
            <Box
              padding={{ block: "9xl", inline: "9xl" }}
              skin="primary"
              style={{ width: 200, height: 200 }}
            />
          </Motion>
        </Stack>
        <Stack gap="lg" wrap="wrap" items="center" justify="center">
          {fades.map((i) => (
            <Button key={i} skin="neutral" onClick={() => setAnimation(i)}>
              {i}
            </Button>
          ))}
        </Stack>
      </Stack>
    );
  },
};

export const Slide: Story = {
  render: function Render() {
    const slides = [
      "slide-in-top",
      "slide-out-top",
      "slide-in-right",
      "slide-out-right",
      "slide-in-bottom",
      "slide-out-bottom",
      "slide-in-left",
      "slide-out-left",
    ] as const;

    const [animation, setAnimation] = useState<(typeof slides)[number]>();
    return (
      <Stack justify="center" direction="column" items="center" gap="2xl">
        <Stack style={{ width: 200, height: 200, overflow: "hidden" }}>
          <Motion
            duration="slowly"
            timing="ease-in-out"
            animation={animation}
            onDone={() => {
              setAnimation(undefined);
            }}>
            <Box
              padding={{ block: "9xl", inline: "9xl" }}
              skin="primary"
              style={{ width: 200, height: 200 }}
            />
          </Motion>
        </Stack>
        <Stack gap="lg" wrap="wrap" items="center" justify="center">
          {slides.map((i) => (
            <Button key={i} skin="neutral" onClick={() => setAnimation(i)}>
              {i}
            </Button>
          ))}
        </Stack>
      </Stack>
    );
  },
};
