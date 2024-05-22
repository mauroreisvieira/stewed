import React, { useState } from "react";
// UI Components
import {
  Theme,
  Card,
  Button,
  Box,
  Tabs,
  Text,
  Container,
  Accordion,
  Separator,
  Avatar,
} from "@stewed/react";
// Icons
import { FiPlus, FiMinus } from "react-icons/fi";

const meta = {
  title: "Examples/Page Sections",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const PricingPlans = {
  render: function Example() {
    const [value, setValue] = useState("annually");

    const plans = [
      {
        title: "Freelancer",
        description: "Perfect for getting your business off the ground!",
        price: 12,
      },
      {
        title: "Startup",
        description: "Tailored for propelling your business to success!",
        price: 24,
      },
      {
        title: "Enterprise",
        description: "Comprehensive features for growing your business!",
        price: 36,
      },
    ];

    return (
      <Container screen="lg" alignment="center" padding={{ block: "7xl" }}>
        <Box direction="column">
          <Text
            size="xs"
            variation="uppercase"
            alignment="center"
            weight="bold"
            skin="primary"
            space={{ y: "xs" }}>
            Teams for all sizes
          </Text>

          <Text as="h1" alignment="center" weight="extra-bold" space={{ y: "3xl" }}>
            Pricing Plans
          </Text>

          <Text alignment="center" size="xl" space={{ y: "3xl" }}>
            Start building for free, then add a site plan to go live. Account plans unlock
            additional features.
          </Text>

          <Box direction="column" gap="3xl">
            <Tabs alignment="center" value={value} onValueChange={setValue}>
              <Tabs.List>
                <Tabs.Item value="monthly">Monthly billing</Tabs.Item>
                <Tabs.Item value="annually">Yearly billing</Tabs.Item>
              </Tabs.List>
            </Tabs>

            <Box
              gap="2xl"
              items="center"
              responsive={{
                xs: {
                  wrap: "wrap",
                },
                md: {
                  wrap: "nowrap",
                },
              }}>
              {plans.map(({ title, description, price }, index) => (
                <Card
                  key={index}
                  selected={index === 1}
                  padding={{
                    block: index === 1 ? "2xl" : "xl",
                    inline: "xl",
                  }}
                  shadow={index === 1 ? "2xl" : undefined}>
                  <Card.Header>
                    <Text as="h4">{title}</Text>
                  </Card.Header>
                  <Card.Body>
                    <Box direction="column" gap="2xl">
                      <Text skin="neutral">{description}</Text>
                      <Box items="baseline" gap="sm">
                        <Text size="4xl" weight="bold">
                          {value === "monthly" ? price : price * 12 * 0.5}€
                        </Text>
                        <Text size="xs" weight="medium">
                          {value === "monthly" ? "/month" : "/year"}
                        </Text>
                      </Box>
                    </Box>
                  </Card.Body>
                  <Card.Footer>
                    <Button fullWidth>Subscribe</Button>
                  </Card.Footer>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    );
  },
};

export const CTASection = {
  render: function Example() {
    return (
      <Box as="main" padding={{ block: "7xl" }} direction="column" items="center" justify="center">
        <Container screen="md" alignment="center" padding={{ block: "7xl" }}>
          <Box justify="center" direction="column" grow>
            <Text as="h1" alignment="center" space={{ y: "4xl" }}>
              Boost your productivity. <br />
              Start using our app today.
            </Text>
            <Text size="xl" skin="neutral" alignment="center" space={{ y: "5xl" }}>
              Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua
              proident excepteur commodo do ea.
            </Text>
            <Box justify="center" gap="lg">
              <Button>Get started</Button>
              <Button appearance="ghost" rightSlot="→">
                Learn more
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  },
};

export const Testimonials = {
  render: function Example() {
    return (
      <Box as="main" padding={{ block: "7xl" }} direction="column" items="center" justify="center">
        <Container screen="xl" alignment="center" padding={{ block: "7xl" }}>
          <Box justify="between" grow>
            <Box direction="column" gap="2xl" padding={{ inline: "2xl", block: "7xl" }} grow>
              <Text size="xl" weight="light" space={{ y: "2xl" }}>
                <Text size="3xl" skin="primary" as="span">
                  “
                </Text>
                Amet amet eget scelerisque tellus sit neque faucibus non eleifend. Integer eu
                praesent at a. Ornare arcu gravida natoque erat et cursus tortor consequat at.
                Vulputate gravida sociis enim nullam ultricies habitant malesuada lorem ac.
                <Text size="3xl" skin="primary" as="span">
                  ”
                </Text>
              </Text>
              <Box items="center" gap="md">
                <Avatar
                  skin="neutral"
                  size="xl"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                />
                <Box direction="column">
                  <Text weight="medium">Judith Black</Text>
                  <Text size="sm" skin="neutral">
                    CEO of Tuple
                  </Text>
                </Box>
              </Box>
            </Box>
            <Separator space={{ inline: "7xl" }} orientation="vertical" />
            <Box direction="column" gap="2xl" padding={{ inline: "2xl", block: "7xl" }} grow>
              <Text size="xl" weight="light" space={{ y: "2xl" }}>
                <Text size="3xl" skin="primary" as="span">
                  “
                </Text>
                “Excepteur veniam labore ullamco eiusmod. Pariatur consequat proident duis dolore
                nulla veniam reprehenderit nisi officia voluptate incididunt exercitation
                exercitation elit. Nostrud veniam sint dolor nisi ullamco.
                <Text size="3xl" skin="primary" as="span">
                  ”
                </Text>
              </Text>
              <Box items="center" gap="md">
                <Avatar
                  skin="neutral"
                  size="xl"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                />
                <Box direction="column">
                  <Text weight="medium">Joseph Rodriguez</Text>
                  <Text size="sm" skin="neutral">
                    CEO of Reform
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  },
};

export const FAQ = {
  render: function Example() {
    return (
      <Box as="main" padding={{ block: "7xl" }} direction="column" items="center" justify="center">
        <Container screen="md" alignment="center" padding={{ block: "7xl" }}>
          <Box justify="center" direction="column" grow>
            <Text as="h4" space={{ y: "4xl" }}>
              Frequently asked questions
            </Text>
            <Box grow gap="lg">
              <Accordion>
                <Accordion.Item>
                  {({ open }) => (
                    <>
                      <Accordion.Header rightSlot={open ? <FiMinus /> : <FiPlus />}>
                        Whats the best thing about Switzerland?
                      </Accordion.Header>
                      <Accordion.Body>
                        <Text skin="neutral">
                          I dont know, but the flag is a big plus. Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.
                        </Text>
                      </Accordion.Body>
                    </>
                  )}
                </Accordion.Item>
                <Accordion.Item open>
                  {({ open }) => (
                    <>
                      <Accordion.Header rightSlot={open ? <FiMinus /> : <FiPlus />}>
                        How do you make holy water?
                      </Accordion.Header>
                      <Accordion.Body>
                        <Text skin="neutral">
                          You boil the hell out of it. Lorem ipsum dolor sit amet consectetur
                          adipisicing elit. Magnam aut tempora vitae odio inventore fuga aliquam
                          nostrum quod porro. Delectus quia facere id sequi expedita natus.
                        </Text>
                      </Accordion.Body>
                    </>
                  )}
                </Accordion.Item>
                <Accordion.Item>
                  {({ open }) => (
                    <>
                      <Accordion.Header rightSlot={open ? <FiMinus /> : <FiPlus />}>
                        What do you call someone with no body and no nose?
                      </Accordion.Header>
                      <Accordion.Body>
                        <Text skin="neutral">
                          Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                          Culpa, voluptas ipsa quia excepturi, quibusdam natus exercitationem
                          sapiente tempore labore voluptatem.
                        </Text>
                      </Accordion.Body>
                    </>
                  )}
                </Accordion.Item>
              </Accordion>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  },
};
