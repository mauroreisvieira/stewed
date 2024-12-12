import React, { useState } from "react";
// UI Components
import {
  Theme,
  Card,
  Button,
  Stack,
  Segmented,
  Text,
  Container,
  Accordion,
  Separator,
  Box,
  Avatar
} from "@stewed/react";
// Icons
import { FiPlus, FiMinus } from "react-icons/fi";
import { GoArrowRight } from "react-icons/go";

const meta = {
  title: "Examples/Page Sections",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

export const PricingPlans = {
  render: function Example() {
    const [value, setValue] = useState("annually");

    const plans = [
      {
        title: "Freelancer",
        description: "Perfect for getting your business off the ground!",
        price: 12
      },
      {
        title: "Startup",
        description: "Tailored for propelling your business to success!",
        price: 24
      },
      {
        title: "Enterprise",
        description: "Comprehensive features for growing your business!",
        price: 36
      }
    ];

    return (
      <Container screen="lg" alignment="center" padding={{ block: "7xl" }}>
        <Stack direction="column">
          <Text
            size="xs"
            variation="uppercase"
            alignment="center"
            weight="bold"
            skin="primary"
            space={{ y: "xs" }}
          >
            Teams for all sizes
          </Text>

          <Text as="h1" alignment="center" weight="extra-bold" space={{ y: "3xl" }}>
            Pricing Plans
          </Text>

          <Text alignment="center" skin="neutral" size="xl" space={{ y: "3xl" }}>
            Start building for free, then add a site plan to go live. Account plans unlock
            additional features.
          </Text>

          <Stack direction="column" gap="3xl">
            <Stack justify="center">
              <Segmented value={value} onValueChange={setValue} size="lg">
                <Segmented.Item value="monthly">Monthly billing</Segmented.Item>
                <Segmented.Item value="annually">Yearly billing</Segmented.Item>
              </Segmented>
            </Stack>

            <Stack
              gap="2xl"
              items="center"
              responsive={{
                xs: {
                  wrap: "wrap"
                },
                md: {
                  wrap: "nowrap"
                }
              }}
            >
              {plans.map(({ title, description, price }, index) => (
                <Box
                  key={index}
                  borderStyle="solid"
                  borderColor={index === 1 ? "primary" : undefined}
                  radius="md"
                  fullWidth
                >
                  <Card
                    padding={{
                      block: index === 1 ? "2xl" : "xl",
                      inline: "xl"
                    }}
                    shadow={index === 1 ? "2xl" : undefined}
                  >
                    <Card.Header>
                      <Text as="h4">{title}</Text>
                    </Card.Header>
                    <Card.Body>
                      <Stack direction="column" gap="2xl">
                        <Text skin="neutral">{description}</Text>
                        <Stack items="baseline" gap="sm">
                          <Text size="4xl" weight="bold">
                            {value === "monthly" ? price : price * 12 * 0.5}€
                          </Text>
                          <Text size="xs" weight="medium">
                            {value === "monthly" ? "/month" : "/year"}
                          </Text>
                        </Stack>
                      </Stack>
                    </Card.Body>
                    <Card.Footer>
                      <Button fullWidth>Subscribe</Button>
                    </Card.Footer>
                  </Card>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    );
  }
};

export const CTASection = {
  render: function Example() {
    return (
      <Stack as="main" direction="column" items="center" justify="center">
        <Container screen="md" alignment="center" padding={{ block: "7xl" }}>
          <Stack justify="center" direction="column" grow>
            <Text as="h1" alignment="center" space={{ y: "4xl" }}>
              Boost your productivity. <br />
              Start using our app today.
            </Text>
            <Text size="xl" skin="neutral" alignment="center" space={{ y: "5xl" }}>
              Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua
              proident excepteur commodo do ea.
            </Text>
            <Stack justify="center" gap="lg">
              <Button>Get started</Button>
              <Button appearance="ghost" rightSlot={<GoArrowRight />}>
                Learn more
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Stack>
    );
  }
};

export const Testimonials = {
  render: function Example() {
    return (
      <Stack as="main" direction="column" items="center" justify="center">
        <Container screen="xl" alignment="center" padding={{ block: "7xl" }}>
          <Stack
            direction="column"
            justify="between"
            gap="4xl"
            responsive={{
              md: {
                direction: "row"
              }
            }}
          >
            <Stack direction="column" gap="2xl" grow>
              <Text size="xl" weight="light" space={{ y: "2xl" }}>
                <Text size="3xl" skin="primary" as="span" family="serif">
                  “
                </Text>
                Amet amet eget scelerisque tellus sit neque faucibus non eleifend. Integer eu
                praesent at a. Ornare arcu gravida natoque erat et cursus tortor consequat at.
                Vulputate gravida sociis enim nullam ultricies habitant malesuada lorem ac.
                <Text size="3xl" skin="primary" as="span" family="serif">
                  ”
                </Text>
              </Text>
              <Stack items="center" gap="md">
                <Avatar
                  skin="neutral"
                  size="xl"
                  image={{
                    src: "https://images.unsplash.com/photo-1701615004837-40d8573b6652"
                  }}
                />
                <Stack direction="column">
                  <Text weight="medium">Judith Black</Text>
                  <Text size="sm" skin="neutral">
                    CEO of Tuple
                  </Text>
                </Stack>
              </Stack>
            </Stack>
            <Separator
              space={{ block: "xl" }}
              orientation="horizontal"
              responsive={{
                md: {
                  orientation: "vertical",
                  space: {
                    inline: "7xl",
                    block: "none"
                  }
                }
              }}
            />
            <Stack direction="column" gap="2xl" grow>
              <Text size="xl" weight="light" space={{ y: "2xl" }}>
                <Text size="3xl" skin="primary" as="span" family="serif">
                  “
                </Text>
                Excepteur veniam labore ullamco eiusmod. Pariatur consequat proident duis dolore
                nulla veniam reprehenderit nisi officia voluptate incididunt exercitation
                exercitation elit. Nostrud veniam sint dolor nisi ullamco.
                <Text size="3xl" skin="primary" as="span" family="serif">
                  ”
                </Text>
              </Text>
              <Stack items="center" gap="md">
                <Avatar
                  skin="neutral"
                  size="xl"
                  image={{
                    src: "https://images.unsplash.com/photo-1633332755192-727a05c4013d"
                  }}
                />
                <Stack direction="column">
                  <Text weight="medium">Joseph Rodriguez</Text>
                  <Text size="sm" skin="neutral">
                    CEO of Reform
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Stack>
    );
  }
};

export const FAQ = {
  render: function Example() {
    return (
      <Stack as="main" direction="column" items="center" justify="center">
        <Container screen="md" alignment="center" padding={{ block: "7xl" }}>
          <Stack justify="center" direction="column" grow>
            <Text as="h4" space={{ y: "4xl" }}>
              Frequently asked questions
            </Text>
            <Stack grow gap="lg">
              <Accordion>
                <Accordion.Item value="1">
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

                <Accordion.Item value="2" defaultOpen>
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

                <Accordion.Item value="3">
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
            </Stack>
          </Stack>
        </Container>
      </Stack>
    );
  }
};
