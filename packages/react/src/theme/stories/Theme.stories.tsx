import React from "react";
// Storybook
import type { Meta, StoryObj } from "@storybook/react";
// Packages
import { Box, Text, TextProps, Theme } from "../../index";

type Story = StoryObj<typeof Theme>;

const meta: Meta<typeof Theme> = {
  title: "Components/Theme",
  component: Theme,
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
  args: {
    children: "Theme",
  },
};

export const Colors: Story = {
  args: {
    children: "Theme",
  },
  render: (): React.ReactElement => {
    return (
      <>
        {["primary", "secondary", "neutral", "critical", "success", "info", "warning"].map(
          (color) => (
            <Box direction="column" gap="xs" space={{ y: "xl" }}>
              <Text variation={"capitalize"} weight="medium">
                {color}
              </Text>
              <Box items="baseline">
                {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((tone) => (
                  <Box
                    justify="center"
                    grow
                    style={{
                      padding: tone === 500 ? 32 : 24,
                      backgroundColor:
                        tone === 500 ? `var(--color-${color})` : `var(--color-${color}-${tone})`,
                    }}
                  >
                    <Text size="xs" skin={tone > 400 ? "white" : "text"}>
                      {tone}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
          ),
        )}
      </>
    );
  },
};
