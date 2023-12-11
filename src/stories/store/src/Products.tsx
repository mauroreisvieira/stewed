import React, { useState } from "react";
// UI Components
import {
  Card,
  Button,
  Box,
  Text,
  Tag,
  Theme,
  Accordion,
  AspectRatio,
} from "../../../../packages/react/index";

export function Products(): React.ReactElement {
  const products = [
    {
      id: "1",
      name: "EAGLE Hood Black",
      image: "//legacies.com/cdn/shop/files/BenficaBlackHoodie-Compressed01.jpg?v=1700239125",
      price: "€89,95",
    },
    {
      id: "2",
      name: "HERO Tee Black",
      image:
        "//legacies.com/cdn/shop/products/tee_ab1cdbf4-5698-490e-95d7-7b4c07cc8bbc-428133.jpg?v=1697063989",
      price: "€70,00",
    },
    {
      id: "3",
      name: "RENAISSANCE Hood Black",
      image: "//legacies.com/cdn/shop/files/InterBlackHoodie.webp?v=1698755816",
      price: "€45,00",
    },
  ];
  return (
    <Theme>
      <Box gap="xl">
        {products.map(({ id, name, image, price }) => (
          <Card key={id}>
            <Card.Media>
              <AspectRatio ratio="2:3">
                <img src={image} />
              </AspectRatio>
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
            <Button fullWidth>Add to Card</Button>
            </Card.Footer>
          </Card>
        ))}
      </Box>
    </Theme>
  );
}
