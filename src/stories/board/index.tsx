import React from "react";
// UI Components
import { FiSearch, FiPlus } from "react-icons/fi";
import { Avatar, Button, Flex, Input, Text } from "../../../packages/react/index";
// Hooks
import { useInput } from "../../../packages/hooks/index";

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

export function App(): React.ReactElement {
  const placeholder = useInput("");

  return (
    <div
      style={{
        borderRadius: 4,
        padding: 24,
        border: "1px solid #eee",
      }}>
      <Flex
        items="center"
        space={{
          y: "xl",
        }}>
        <Flex gap="lg" items="center" grow>
          <Avatar name="Stewed Board" skin="primary" appearance="square" />
          <Text size="xl" weight="bold">
            Stewed Board
          </Text>
        </Flex>
        <Flex>
          <Button leftIcon={<FiPlus />}>
            New Project
          </Button>
        </Flex>
      </Flex>
      <div>
        <Input {...placeholder} placeholder="Filter projects..." leftSlot={<FiSearch />} />
      </div>
      <Flex gap="lg">
        {projects.map(({ id, title, category, members }) => (
          <Flex key={id} gap="md" grow>
            <div
              style={{
                width: "100%",
                padding: 24,
                borderRadius: 4,
                border: "1px solid #ddd",
              }}>
              <Flex direction="column" gap="sm" space={{ y: "xl" }}>
                <Text weight="bold" size="lg">
                  {title}
                </Text>
                <Text skin="secondary">{category}</Text>
              </Flex>
              <Avatar.Group>
                {members.map(({ id, name, picture }) => (
                  <Avatar key={id} src={picture} size="xs" name={name} skin="secondary" />
                ))}
              </Avatar.Group>
            </div>
          </Flex>
        ))}
      </Flex>
    </div>
  );
}
