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
      <Card>
        <Card.Body>
          <Box direction="column" gap="2xl">
            <div>
              <Text alignment="center" weight="medium" skin="primary">
                Teams for all sizes
              </Text>

              <Text as="h2" alignment="center" weight="extra-bold">
                Pricing Plans
              </Text>
            </div>

            <Text alignment="center" size="xl">
              Start building for free, then add a site plan to go live. <br />
              Account plans unlock additional features.
            </Text>

            <Tabs alignment="center" value={value} onValueChange={setValue}>
              <Tabs.List>
                <Tabs.Item value="monthly">Monthly billing</Tabs.Item>
                <Tabs.Item value="annually">Yearly billing</Tabs.Item>
              </Tabs.List>
            </Tabs>
            <Box gap="2xl" items="stretch">
              {plans.map(({ title, description, price }, index) => (
                <Card key={index} selected={index === 1}>
                  <Card.Header>
                    <Text as="h4">{title}</Text>
                  </Card.Header>
                  <Card.Body>
                    <Box direction="column" gap="2xl">
                      <Text skin="secondary">{description}</Text>
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
                  <Card.Footer bordered>
                    <Button fullWidth>
                      Subscribe
                    </Button>
                  </Card.Footer>
                </Card>
              ))}
            </Box>
          </Box>
        </Card.Body>
      </Card>
    </Theme>
  );
}
