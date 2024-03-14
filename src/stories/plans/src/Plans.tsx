import React, { useState } from "react";
// UI Components
import { Theme, Card, Button, Box, Tabs, Text } from "../../../../packages/react/index";

export function Plans(): React.ReactElement {
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
    <Theme>
      <Text
        size="xs"
        variation="uppercase"
        alignment="center"
        weight="bold"
        skin="primary"
        space={{ y: "xs" }}>
        Teams for all sizes
      </Text>

      <Text as="h2" alignment="center" weight="extra-bold" space={{ y: "3xl" }}>
        Pricing Plans
      </Text>

      <Text alignment="center" size="xl" space={{ y: "3xl" }}>
        Start building for free, then add a site plan to go live. <br />
        Account plans unlock additional features.
      </Text>

      <Box direction="column" gap="3xl">
        <Tabs alignment="center" value={value} onValueChange={setValue}>
          <Tabs.List>
            <Tabs.Item value="monthly">Monthly billing</Tabs.Item>
            <Tabs.Item value="annually">Yearly billing</Tabs.Item>
          </Tabs.List>
        </Tabs>

        <Box gap="2xl" items="center">
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
    </Theme>
  );
}
