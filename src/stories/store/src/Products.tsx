import React, { useState } from "react";
// UI Components
import { Card, Button, Box, Text, Theme, AspectRatio } from "../../../../packages/react/index";
import { FiShoppingCart } from "react-icons/fi";

export function Products(): React.ReactElement {
  const products = [
    {
      id: "1",
      name: "EAGLE Hood Black",
      image: "https://placehold.co/400x400",
      price: "€89,95",
    },
    {
      id: "2",
      name: "HERO Tee Black",
      image: "https://placehold.co/400x400",
      price: "€70,00",
    },
    {
      id: "3",
      name: "RENAISSANCE Hood Black",
      image: "https://placehold.co/400x400",
      price: "€45,00",
    },
  ];
  return (
    <Theme>
      <Box gap="xl">
        {products.map(({ id, name, image, price }) => (
          <Card key={id}>
            <Card.Media>
              <img src={image} />
            </Card.Media>
            <Card.Body>
              <Box direction="column" gap="sm">
                <Text size="xl">{name}</Text>
                <Box gap="sm">
                  <Text weight="bold">{price}</Text>
                </Box>
              </Box>
            </Card.Body>
            <Card.Footer>
              <Button leftSlot={<FiShoppingCart />} fullWidth>
                Add to Card
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </Box>
    </Theme>
  );
}
