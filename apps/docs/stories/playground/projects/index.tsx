import React from 'react';

import {
    Avatar,
    Button,
    Flex,
    Input,
    Text as Text,
} from '../../../../../packages/react/src';

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
            <Flex gap="md" grow>
                <div
                    style={{
                        width: '100%',
                        padding: 24,
                        borderRadius: 4,
                        border: '1px solid #ddd',
                    }}
                >
                    <Flex direction="column" gap="sm" space={{ y: 'xl' }}>
                        <Text weight="bold" size="lg">
                            API Integration
                        </Text>
                        <Text skin="secondary">Engineering</Text>
                    </Flex>
                    <Avatar.Group>
                        <Avatar
                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                            size="sm"
                        />
                        <Avatar
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                            size="sm"
                        />
                        <Avatar size="sm">Mauro Vieira</Avatar>
                        <Avatar size="sm">Bruna Santos</Avatar>
                        <Avatar size="sm">Lourenço Vieira</Avatar>
                    </Avatar.Group>
                </div>
            </Flex>
        </div>
    );
};
