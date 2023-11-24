import React from "react";
// UI Components
import { FiSearch, FiPlus } from "react-icons/fi";
import { Avatar, Button, Card, Flex, Input, Text } from "../../../../packages/react/index";

const projects = [
  {
    id: "new-benefits-plan",
    title: "New Benefits Plan",
    category: "Human Resources",
    members: [
      {
        id: "mauro-vieira",
        name: "Mauro Vieira",
      },
      {
        id: "bruna-santos",
        name: "Bruna Santos",
      },
      {
        id: "lourenco-vieira",
        name: "Lourenço Vieira",
      },
    ],
  },
  {
    id: "onboarding-emails",
    title: "Onboarding Emails",
    category: "Customer Success",
    members: [
      {
        id: "mauro-vieira",
        name: "Mauro Vieira",
      },
      {
        id: "bruna-santos",
        name: "Bruna Santos",
      },
      {
        id: "lourenco-vieira",
        name: "Lourenço Vieira",
      },
    ],
  },
  {
    id: "api-integration",
    title: "API Integration",
    category: "Engineering",
    members: [
      {
        id: "mauro-vieira",
        name: "Mauro Vieira",
      },
      {
        id: "bruna-santos",
        name: "Bruna Santos",
      },
      {
        id: "lourenco-vieira",
        name: "Lourenço Vieira",
      },
    ],
  },
];

export function Board(): React.ReactElement {
  return (
    <Flex direction="column" grow>
      <Flex
        items="center"
        space={{
          y: "xl",
        }}
        justify="between"
        gap="lg">
        <Text as="h4" weight="normal">
          All boards
        </Text>
        <Button leftIcon={<FiPlus />}>New Project</Button>
      </Flex>
      <div></div>
      <Flex gap="lg">
        {projects.map(({ id, title, category, members }) => (
          <Flex key={id} gap="md" grow>
            <Card>
              <Card.Body>
                <Flex direction="column" gap="sm" space={{ y: "xl" }}>
                  <Text weight="bold" size="lg">
                    {title}
                  </Text>
                  <Text skin="secondary">{category}</Text>
                </Flex>
                <Avatar.Group>
                  {members.map(({ id, name }) => (
                    <Avatar key={id} size="xs" name={name} skin="secondary" />
                  ))}
                </Avatar.Group>
              </Card.Body>
            </Card>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
