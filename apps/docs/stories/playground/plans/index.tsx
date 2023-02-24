import React from 'react';

import {
    Avatar,
    Button,
    Flex,
    Input,
    Tabs,
    Text as Text,
} from '../../../../../packages/react/src';

export const App = () => {
    return (
        <Flex
            direction="column"
            style={{
                borderRadius: 4,
                padding: 24,
                border: '1px solid #eee',
            }}
            gap="2xl"
        >
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                    veniam repellendus doloremque enim doloribus asperiores
                    eaque illum quia sed cumque alias, ea expedita minima.
                </Text>
            </div>
            <Flex justify="center">
                <Tabs value="monthly">
                    <Tabs.List>
                        <Tabs.Item value="monthly">Monthly</Tabs.Item>
                        <Tabs.Item value="annually">Annually</Tabs.Item>
                    </Tabs.List>
                </Tabs>
            </Flex>
        </Flex>
    );
};
