import React, { useState } from "react";
// UI Components
import { Card, Button, Flex, Tabs, Text } from "../../../../packages/react/index";

export function Plans(): React.ReactElement {
  const [value, setValue] = useState("monthly");

  return (
    <Flex
      direction="column"
      style={{
        borderRadius: 4,
        padding: 24,
        border: "1px solid #eee",
      }}
      gap="2xl">
      <div>
        <Text as="h4" alignment="center" size="sm" weight="bold" skin="primary">
          Pricing Plans
        </Text>
        <Text alignment="center" size="4xl" weight="bold">
          Pricing Plans for teams of all sizes
        </Text>
      </div>
      <div>
        <Text alignment="center" size="md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit veniam repellendus doloremque enim
          doloribus asperiores eaque illum quia sed cumque alias, ea expedita minima.
        </Text>
      </div>
      <Flex
        justify="center"
        space={{
          y: "2xl",
        }}>
        <Tabs value={value} onValueChange={setValue}>
          <Tabs.List>
            <Tabs.Item value="monthly">Monthly</Tabs.Item>
            <Tabs.Item value="annually">Annually</Tabs.Item>
          </Tabs.List>
        </Tabs>
      </Flex>
      <Flex gap="2xl">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} selected={index === 1}>
            <Card.Body>
              <Flex direction="column" gap="xl">
                <Text as="h5">Hobby</Text>
                <Text skin="secondary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit excepturi, tempora.
                </Text>
                <Flex items="baseline" gap="sm">
                  <Text size="4xl" weight="bold">
                    15€
                  </Text>
                  <Text size="xs" weight="medium">
                    /month
                  </Text>
                </Flex>
                <Button appearance="outline" skin="secondary" fullWidth>
                  Buy plan
                </Button>
              </Flex>
            </Card.Body>
          </Card>
        ))}
      </Flex>
    </Flex>
  );
}
