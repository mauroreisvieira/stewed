import React, { useState } from "react";
// Storybook
import type { Meta, StoryObj } from "@storybook/react";
// Packages
import { Text, Box, Theme, Table, Grid, Stack, Button, Dialog } from "../../index";
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
  timing
} from "@stewed/tokens";

type Story = StoryObj<typeof Theme>;

const meta: Meta<typeof Theme> = {
  title: "Components/Theme",
  component: Theme,
  decorators: [(Story) => <Story />]
};

export default meta;

export const Palette: Story = {
  render: (): React.ReactElement => {
    return (
      <Theme>
        <Grid
          cols={3}
          responsive={{
            md: {
              cols: 9
            }
          }}
          gap="xs"
        >
          {Object.keys(palette).map((color, index) => (
            <Box
              key={color}
              radius="md"
              padding={{ block: "3xl" }}
              style={{
                backgroundColor: `var(--color-${color})`
              }}
            >
              <Text
                size="xxs"
                responsive={{
                  sm: {
                    size: "xs"
                  }
                }}
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
  }
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
                <Table.Cell>
                  <Stack gap="md">
                    <Box
                      borderColor="neutral-faded"
                      borderWidth={1}
                      borderStyle="solid"
                      radius="full"
                      style={{ minWidth: 18, height: 18, background: val }}
                    />
                    {val}
                  </Stack>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Theme>
    );
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
};

function DialogActions({ onClick }: { onClick: () => void }): React.ReactElement {
  return (
    <Theme
      cssScope="third-scope"
      tokens={{
        default: {
          color: {
            "primary-background": "lime-500",
            "primary-background-hovered": "lime-600",
            "primary-background-pressed": "lime-600",
            "primary-background-faded": "lime-100",
            focus: "lime-500"
          }
        }
      }}
    >
      <Button onClick={onClick} fullWidth>
        Close
      </Button>
    </Theme>
  );
}

export const ThemeScope: Story = {
  render: function Render(): React.ReactElement {
    const [open, setOpen] = useState(false);

    return (
      <Theme>
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
                    focus: "purple-500"
                  },
                  components: {
                    button: {
                      radius: "full"
                    }
                  }
                }
              }}
            >
              <Box
                radius="md"
                borderStyle="solid"
                borderColor="neutral-faded"
                skin="primary-faded"
                padding={{ block: "lg", inline: "lg" }}
              >
                <Button onClick={() => setOpen(true)}>Primary</Button>
                <Dialog
                  open={open}
                  size="xs"
                  onEscape={() => setOpen(false)}
                  onClickOutside={() => setOpen(false)}
                >
                  <Dialog.Body>
                    <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur distinctio
                      labore blanditiis soluta ipsam ratione earum perspiciatis omnis fugit
                      consectetur repellendus rem reprehenderit neque cupiditate corporis temporibus
                      natus corrupti vel aliquid fuga laudantium autem, exercitationem!
                    </Text>
                    <Text space={{ y: "2xl" }}>
                      Ipsum nobis, deserunt, culpa ex aliquam nemo. Omnis ut, cupiditate culpa eos.
                      Quibusdam minima aspernatur quidem voluptates, quaerat, quas. Veritatis nam
                      dolor delectus rerum esse error optio libero nobis sunt corrupti aliquid quos
                      fugit, reiciendis perspiciatis? Nostrum laborum reprehenderit, magnam placeat
                      velit fuga exercitationem aspernatur, vero eveniet consequuntur culpa. Iure,
                      nisi, soluta! Minima repellendus, nesciunt, nostrum corrupti omnis ratione
                      cupiditate maiores facilis dolorum provident? Fugiat eos corrupti, recusandae
                      delectus quas sequi eligendi porro hic expedita temporibus ullam repellat
                      mollitia. Quia ea expedita, iure debitis? Fugit.
                    </Text>

                    <DialogActions onClick={() => setOpen(false)} />
                  </Dialog.Body>
                </Dialog>
              </Box>
            </Theme>
          </Stack>
        </Box>
      </Theme>
    );
  }
};
