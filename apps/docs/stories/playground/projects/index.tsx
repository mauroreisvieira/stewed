import React from 'react';

import {
    Avatar,
    Button,
    Flex,
    Input,
    Text as Text,
} from '../../../../../packages/react/src';

const projects = [
{
        id: 'new-benefits-plan',
        title: 'New Benefits Plan',
        category: 'Human Resources',
        members: [
            {
                id: 'mauro-vieira',
                name: 'Mauro Vieira',
            },
            {
                id: 'bruna-santos',
                name: 'Bruna Santos',
            },
            {
                id: 'lourençco-vieira',
                name: 'Lourenço Vieira',
            },
        ],
    },
    {
        id: 'onboarding-emails',
        title: 'Onboarding Emails',
        category: 'Customer Success',
        members: [
            {
                id: 'janne-bosh',
                name: 'Janne Bosh',
                picture:
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
            },
            {
                id: 'mauro-vieira',
                name: 'Mauro Vieira',
            },
            {
                id: 'bruna-santos',
                name: 'Bruna Santos',
            },
            {
                id: 'lourençco-vieira',
                name: 'Lourenço Vieira',
            },
        ],
    },
    {
        id: 'api-integration',
        title: 'API Integration',
        category: 'Engineering',
        members: [
            {
                id: 'mauro-vieira',
                name: 'Mauro Vieira',
            },
            {
                id: 'bruna-santos',
                name: 'Bruna Santos',
            },
            {
                id: 'lourençco-vieira',
                name: 'Lourenço Vieira',
            },
        ],
    },
];

export const App = () => {
    return (
        <div
            style={{
                borderRadius: 4,
                padding: 24,
                border: '1px solid #eee',
            }}
        >
            <Flex
                items="center"
                space={{
                    y: 'xl',
                }}
            >
                <Flex grow>
                    <Text size="xl" weight="medium">
                        Project
                    </Text>
                </Flex>
                <Flex>
                    <Button
                        leftIcon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                width={16}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                        }
                    >
                        New
                    </Button>
                </Flex>
            </Flex>
            <div>
                <Input
                    placeholder="Filter projects..."
                    leftSlot={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            width={16}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    }
                />
            </div>
            <Flex gap="lg">
                {projects.map(({ id, title,category,  members }) => (
                    <Flex key={id} gap="md" grow>
                        <div
                            style={{
                                width: '100%',
                                padding: 24,
                                borderRadius: 4,
                                border: '1px solid #ddd',
                            }}
                        >
                            <Flex
                                direction="column"
                                gap="sm"
                                space={{ y: 'xl' }}
                            >
                                <Text weight="bold" size="lg">
                                    {title}
                                </Text>
                                <Text skin="secondary">{category}</Text>
                            </Flex>
                            <Avatar.Group>
                                {members.map(({ id, name, picture }) => (
                                    <Avatar key={id} src={picture} size="xs">
                                        {name}
                                    </Avatar>
                                ))}
                            </Avatar.Group>
                        </div>
                    </Flex>
                ))}
            </Flex>
        </div>
    );
};
