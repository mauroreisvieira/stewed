import React from "react";
// UI Components
import {
  Text,
  Container,
  Stack,
  Box,
  Button,
  Accordion,
  Hoverable,
  Motion,
  Grid,
  Checkbox,
  Card
} from "@stewed/react";
// Hooks
// Icons
import { HiMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { IoStar, IoEyeOutline, IoHeartOutline } from "react-icons/io5";

const FILTERS = [
  {
    name: "Tag",
    values: ["Bag", "Briefcase", "Backpack", "Travel", "Laptop Case"]
  },
  {
    name: "Category",
    values: ["Wallets", "Bag", "Accessories", "Luggage", "Clutches"]
  },
  {
    name: "Color",
    values: [
      "Gray",
      "Blue",
      "Black",
      "Red",
      "Green",
      "Yellow",
      "White",
      "Pink",
      "Purple",
      "Orange",
      "Brown",
      "Beige",
      "Gold",
      "Silver",
      "Teal",
      "Maroon",
      "Coral",
      "Turquoise"
    ]
  }
];

const PRODUCTS = [
  {
    id: 1,
    name: "Prospect Briefcase",
    category: "Bag",
    rate: 4.3,
    price: "325.00€"
  },
  {
    id: 2,
    name: "Bonnie Belt Bag",
    category: "Accessories",
    rate: 3.9,
    price: "120.00€"
  },
  {
    id: 3,
    name: "Traveler's Backpack",
    category: "Bag",
    rate: 4.8,
    price: "250.00€"
  },
  {
    id: 4,
    name: "Executive Laptop Case",
    category: "Bag",
    rate: 4.5,
    price: "300.00€"
  },
  {
    id: 5,
    name: "Compact Wallet",
    category: "Wallets",
    rate: 4.1,
    price: "75.00€"
  },
  {
    id: 6,
    name: "Voyager Duffel Bag",
    category: "Luggage",
    rate: 4.7,
    price: "210.00€"
  },
  {
    id: 7,
    name: "Classic Tote Bag",
    category: "Bag",
    rate: 4.2,
    price: "180.00€"
  },
  {
    id: 8,
    name: "Luxury Clutch",
    category: "Clutches",
    rate: 4.6,
    price: "350.00€"
  },
  {
    id: 9,
    name: "Heritage Messenger Bag",
    category: "Bag",
    rate: 4.4,
    price: "275.00€"
  },
  {
    id: 10,
    name: "Outdoor Utility Pack",
    category: "Bag",
    rate: 4.9,
    price: "190.00€"
  },
  {
    id: 11,
    name: "Urban Sling Bag",
    category: "Bag",
    rate: 4.0,
    price: "110.00€"
  },
  {
    id: 12,
    name: "Elegant Shoulder Bag",
    category: "Clutches",
    rate: 4.5,
    price: "220.00€"
  }
];

export function Collections(): React.ReactElement {
  return (
    <Container screen="2xl" alignment="center" padding={{ block: "7xl" }}>
      <Grid cols={4} gap="9xl">
        <Stack>
          <Accordion multipleExpanded>
            {FILTERS.map(({ name, values }) => (
              <Accordion.Item key={name} value={name} defaultOpen>
                {({ open }) => (
                  <>
                    <Accordion.Header rightSlot={open ? <HiMinusSm /> : <HiOutlinePlusSm />}>
                      {name}
                    </Accordion.Header>
                    <Accordion.Body>
                      <Checkbox.Group orientation="vertical">
                        {values.map((value) => (
                          <Checkbox key={value} value={value}>
                            {value}
                          </Checkbox>
                        ))}
                      </Checkbox.Group>
                    </Accordion.Body>
                  </>
                )}
              </Accordion.Item>
            ))}
          </Accordion>
        </Stack>
        <Grid.Item colSpan={3}>
          <Box padding={{ block: "lg" }}>
            <Grid cols={1} responsive={{ sm: { cols: 2 }, lg: { cols: 4 } }} gap="xl">
              {PRODUCTS.map(({ id, name, category, price, rate }) => (
                <Hoverable key={id}>
                  {({ isHovering }) => (
                    <Card shadow="none" padding={{ inline: "none", block: "md" }}>
                      <Motion animation={isHovering ? "scale-in" : undefined} duration="slowly">
                        {({ className }) => (
                          <Card.Media
                            style={{ height: 300, overflow: "hidden" }}
                            image={{
                              src: "https://placehold.co/300x300",
                              className
                            }}
                          >
                            {isHovering && (
                              <Box padding={{ inline: "md" }}>
                                <Stack direction="column" items="end" gap="sm">
                                  <Button
                                    size="sm"
                                    skin="secondary"
                                    leftSlot={<IoEyeOutline />}
                                    iconOnly
                                  >
                                    Quick View
                                  </Button>
                                  <Button
                                    size="sm"
                                    skin="secondary"
                                    leftSlot={<IoHeartOutline />}
                                    iconOnly
                                  >
                                    Add to Favorites
                                  </Button>
                                </Stack>
                              </Box>
                            )}
                          </Card.Media>
                        )}
                      </Motion>
                      <Card.Body>
                        <Text size="sm" space={{ y: "xs" }}>
                          {name}
                        </Text>
                        <Text size="xs" skin="neutral" space={{ y: "md" }}>
                          {category}
                        </Text>
                        <Stack justify="between" items="center" gap="md">
                          <Text weight="semi-bold">{price}</Text>
                          <Stack items="center" justify="end" gap="xxs">
                            <Text size="xs">{rate} </Text>
                            <Text as="span" skin="warning">
                              <IoStar size={14} />
                            </Text>
                          </Stack>
                        </Stack>
                      </Card.Body>
                    </Card>
                  )}
                </Hoverable>
              ))}
            </Grid>
          </Box>
        </Grid.Item>
      </Grid>
    </Container>
  );
}
