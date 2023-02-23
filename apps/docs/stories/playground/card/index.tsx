import React from 'react';

import {
    AspectRatio,
    Button,
    Flex,
    Text as Text,
} from '../../../../../packages/react/src';

export const App = () => {
    return (
        <Flex
            wrap="wrap"
            style={{
                borderRadius: 8,
                overflow: 'hidden',
                maxWidth: 600,
                boxShadow:
                    '0 0 #0000, 0 0 #0000, 0 20px 25px -5px rgba(0, 0, 0, .1), 0 8px 10px -6px rgba(0, 0, 0, .1)',
            }}
        >
            <Flex grow>
                <AspectRatio ratio="3:2">
                    <img src="https://uniformcss.com/assets/img/uniform-hoodie.jpg" />
                </AspectRatio>
            </Flex>
            <Flex
                direction="column"
                items="stretch"
                grow
                style={{ padding: 24 }}
            >
                <Flex justify="between" space={{ y: 'lg' }}>
                    <Text size="xl" weight="medium">
                        Classic Utility Jacket
                    </Text>
                    <Text size="xl" weight="medium">
                        150€
                    </Text>
                </Flex>
                <Text>In stock</Text>
                <Flex direction="column">
                    <Flex gap="sm">
                        <Button
                            size="sm"
                            skin="secondary"
                            variant="ghost"
                            disabled
                        >
                            XS
                        </Button>
                        <Button size="sm" skin="secondary" variant="ghost">
                            S
                        </Button>
                        <Button size="sm" skin="secondary" variant="ghost">
                            M
                        </Button>
                        <Button size="sm" skin="secondary">
                            L
                        </Button>
                        <Button size="sm" skin="secondary" variant="ghost">
                            XL
                        </Button>
                    </Flex>
                </Flex>
                <hr />
                <Flex justify="between" gap="md">
                    <Flex gap="md">
                        <Button>Buy now</Button>
                        <Button skin="secondary" variant="outline">
                            Add to bag
                        </Button>
                    </Flex>
                    <Button
                        skin="secondary"
                        variant="outline"
                        iconOnly
                        leftIcon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                width="1em"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                />
                            </svg>
                        }
                    >
                        Wishlist
                    </Button>
                </Flex>
                <Text size="sm">Free shipping on orders over 100€.</Text>
            </Flex>
        </Flex>
    );
};
