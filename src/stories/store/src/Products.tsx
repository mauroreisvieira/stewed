import React from "react";
// UI Components
import { Card, Button, Box, Text, Theme, Tag } from "../../../../packages/react/index";
// Icons
import { FiShoppingCart } from "react-icons/fi";

export function Products(): React.ReactElement {
  const products = [
    {
      id: "1",
      name: "EAGLE Hood Black",
      image: "https://placehold.co/400x300",
      price: "€89,95",
    },
    {
      id: "2",
      name: "HERO Tee Black",
      image: "https://placehold.co/400x300",
      price: "€70,00",
    },
    {
      id: "3",
      name: "RENAISSANCE Hood Black",
      image: "https://placehold.co/400x300",
      price: "€45,00",
    },
  ];
  return (
    <Theme>
      <Box gap="xl" direction="row" wrap="wrap">
        {products.map(({ id, name, image, price }) => (
          <Box key={id} grow>
          <Card padding={{ inline: "md", block: "md" }}>
            <Card.Media src={image} alt={name}>
              <Box justify="end">
                <Tag appearance="ghost" skin="warning" size="sm">
                  Promotion
                </Tag>
              </Box>
            </Card.Media>
            <Card.Body>
              <Box direction="column" gap="sm">
                <Text size="xl" weight="bold">
                  {name}
                </Text>
                <Box gap="sm">
                  <Text skin="neutral">{price}</Text>
                </Box>
              </Box>
            </Card.Body>
            <Card.Footer>
              <Button leftSlot={<FiShoppingCart />} fullWidth>
                Add to Card
              </Button>
            </Card.Footer>
          </Card>
          </Box>
        ))}
      </Box>
    </Theme>
  );
}
