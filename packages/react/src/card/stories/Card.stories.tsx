import React from "react";
// Storybook
import type { Meta, StoryObj } from "@storybook/react";
// Packages
import { Theme, Card, Text, Button, useTheme } from "../../index";

type Story = StoryObj<typeof Card>;

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  decorators: [
    (Story) => (
        <Story />
    ),
  ],
};

export default meta;

const ThemeOne = ({ children }: { children: React.ReactNode }) => {
  return (
    <Theme
      tokens={{
        default: {
          color: {
            primary: "#0f0",
          },
          components: {
            button: {
              radius: "full",
            },
          },
        },
      }}
      scoped>
      {children}
    </Theme>
  );
};

const ThemeTwo = ({ children }: { children: ({ setTheme: any, theme: any, setTokens: any }) => React.ReactNode }) => {
  const { setTheme, theme, setTokens } = useTheme();
  return (
    <Theme<"space" | "default">
      defaultTheme="space"
      tokens={{
        space: {
          color: {
            primary: "#101",
          },
        },
        default: {
          color: {
            primary: "#00a",
          },
          components: {
            button: {
              radius: "full",
            },
          },
        },
      }}
      scoped>
      {children({ setTheme, theme, setTokens })}
    </Theme>
  );
};
function Aux(): React.ReactElement {
  return (
    <>
      <Card.Header>
        <Text>Card Header</Text>
      </Card.Header>
      <Card.Body>
        <Button>Button</Button>
        <ThemeOne>
          <Card>
            <Card.Body>
              <Button>Button</Button>
              <ThemeTwo>
                {({ setTheme, setTokens, theme }) => (
                  <Card>
                    <Card.Body>
                      <Button
                        onClick={() => {
                          setTheme(theme === "space" ? "default" : "space");
                          console.log("Click", theme);
                        }}>
                        Button
                      </Button>
                    </Card.Body>
                  </Card>
                )}
              </ThemeTwo>
            </Card.Body>
          </Card>
        </ThemeOne>
        <Text>
          Pellentesque elementum diam sapien, nec ultrices risus convallis eget. Nam pharetra dolor
          at dictum tempor. Quisque ut est a ligula hendrerit sodales. Curabitur ornare a nulla in
          laoreet. Maecenas semper mi egestas, dignissim nisi et, elementum neque.
        </Text>
      </Card.Body>
      <Card.Footer>
        <Text>Card Footer</Text>
      </Card.Footer>
    </>
  );
}

export const Base: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  render: () => {
    return <Theme><Aux /></Theme>
  },
  args: {
    selected: false,
    skin: "default",
    children: <Aux />,
  },
};

export const Skin: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    selected: false,
    skin: "primary",
    shadow: "none",
    children: (
      <>
        <Card.Body>
          <Text skin="white">
            Pellentesque elementum diam sapien, nec ultrices risus convallis eget. Nam pharetra
            dolor at dictum tempor. Quisque ut est a ligula hendrerit sodales. Curabitur ornare a
            nulla in laoreet. Maecenas semper mi egestas, dignissim nisi et, elementum neque.
          </Text>
        </Card.Body>
      </>
    ),
  },
};
