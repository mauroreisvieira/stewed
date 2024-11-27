import React from "react";
// Storybook
import type { Meta, StoryObj } from "@storybook/react";
// Packages
import { Text, Box, Theme, Table, Grid, Stack, Button } from "../../index";
// Tokens
import {
  skin,
  color,
  palette,
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
        <Grid cols={9} gap="xs">
          {Object.keys(palette).map((color, index) => (
            <Box
              key={color}
              radius="md"
              padding={{ block: "3xl" }}
              style={{
                backgroundColor: `var(--color-${color})`,
              }}
            >
              <Text
                size="xs"
                weight="medium"
                alignment="center"
                skin={index % 9 >= 4 || color === "black" ? "white" : "black"}
              >
                {color}
              </Text>
            </Box>
          ))}
        </Grid>
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
            {Object.entries({ ...color, ...skin }).map(([key, val]) => (
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

export const ThemeScope: Story = {
  render: function Render(): React.ReactElement {
    return (
      <Theme cssScope="first-scope">
        <Box
          radius="md"
          borderStyle="solid"
          borderColor="neutral-faded"
          skin="primary-faded"
          padding={{ block: "lg", inline: "lg" }}
        >
          <Stack direction="column" gap="lg">
            <div>
              <Button>Primary</Button>
            </div>
            <Theme
              cssScope="second-scope"
              tokens={{
                default: {
                  color: {
                    "primary-background": "purple-500",
                    "primary-background-hovered": "purple-600",
                    "primary-background-pressed": "purple-600",
                    "primary-background-faded": "purple-100",
                    "focus": "purple-500",
                  },
                  components: {
                    button: {
                      radius: "full",
                    },
                  },
                },
              }}
            >
              <Box
                radius="md"
                borderStyle="solid"
                borderColor="neutral-faded"
                skin="primary-faded"
                padding={{ block: "lg", inline: "lg" }}
              >
                <Button>Primary</Button>
              </Box>
            </Theme>
          </Stack>
        </Box>
      </Theme>
    );
  },
};
