import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Grid, Box, Icon, Text, Tooltip } from "../../index";
// Utilities
import { objectKeys } from "@stewed/utilities";

type Story = StoryObj<typeof Icon>;

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

export const Base: Story = {
  args: {},
  render: function Render() {
    return (
      <Grid cols={10} gap="md">
        {objectKeys(Icon).map((key) => {
          const RenderIcon = Icon[key];

          return (
            <Tooltip<HTMLDivElement>
              renderAnchor={(props) => (
                <Box key={key} {...props}>
                  <Text skin="neutral" alignment="center">
                    <RenderIcon />
                  </Text>
                </Box>
              )}
            >
              {key.match(/[A-Z][a-z]+|[0-9]+/g)?.join(" ")}
            </Tooltip>
          );
        })}
      </Grid>
    );
  }
};
