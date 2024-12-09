import React, { useState } from "react";
// UI Components
import {
  Container,
  Text,
  Theme,
  Group,
  Button,
  TextField,
  Drawer,
  Stack,
  FormField,
  List,
  Separator,
  Accordion,
  Box,
} from "@stewed/react";
// Hooks
import { useInput } from "../../../packages/hooks/index";
// Icons
import { HiOutlinePlusSm, HiMinusSm } from "react-icons/hi";

const meta = {
  title: "Examples/Ecommerce",
  decorators: [
    (Story) => (
      <Theme
        tokens={{
          default: {
            components: {
              group: {
                radius: "full",
              },
              button: {
                radius: "full",
              },
            },
          },
        }}
      >
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const QuickViews = {
  render: function Example() {
    const productsSizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
    const [selectedSize, setSelectedSize] = useState("M");

    const { value, setValue, onChange } = useInput<number>(1, {
      validate: (newValue) => {
        return newValue >= 0 && newValue <= 100;
      },
    });

    return (
      <Container screen="md" alignment="center" padding={{ block: "7xl" }}>
        <Drawer placement="right" open>
          <Drawer.Header>
            <Text as="h5" space={{ y: "sm" }}>
              Benfica ÁGUIA Hoodie
            </Text>
          </Drawer.Header>

          <Drawer.Body>
            <Stack direction="column" gap="2xl">
              <Stack gap="lg" items="center">
                <Stack gap="sm" grow>
                  <Text size="3xl" variation={["line-through"]} skin="neutral-faded">
                    €120
                  </Text>
                  <Text size="3xl" weight="bold">
                    €89,95
                  </Text>
                </Stack>
              </Stack>

              <FormField>
                <FormField.Label htmlFor="group">Size</FormField.Label>
                <FormField.Control>
                  <Box
                    radius="full"
                    borderColor="neutral-faded"
                    borderStyle="solid"
                    borderWidth={1}
                    padding={{ block: "xxs", inline: "xxs" }}
                  >
                    <Group focusOnSelected>
                      {productsSizes.map((value) => (
                        <Button
                          key={value}
                          size="sm"
                          tabIndex={value === selectedSize ? 0 : -1}
                          pressed={value === selectedSize}
                          skin={value === selectedSize ? "primary" : "neutral"}
                          appearance={value === selectedSize ? "filled" : "soft"}
                          onClick={() => setSelectedSize(value)}
                        >
                          {value}
                        </Button>
                      ))}
                    </Group>
                  </Box>
                </FormField.Control>
              </FormField>

              <FormField>
                <FormField.Label htmlFor="quantity">Quantity</FormField.Label>
                <FormField.Control>
                  <Box
                    radius="full"
                    borderColor="neutral-faded"
                    borderStyle="solid"
                    borderWidth={1}
                    padding={{ block: "xxs", inline: "xxs" }}
                  >
                    <Group gap="xxs">
                      <Button
                        appearance="soft"
                        size="sm"
                        skin="neutral"
                        leftSlot={<HiMinusSm size={16} />}
                        onClick={() => setValue(Number(value) - 1)}
                        disabled={value === 0}
                        iconOnly
                      >
                        Decrease
                      </Button>

                      <TextField
                        id="quantity"
                        skin="neutral"
                        size="sm"
                        appearance="ghost"
                        name="quantity"
                        value={value}
                        onChange={onChange}
                        maxChars={3}
                        alignment="center"
                        pattern="\d*"
                        autoComplete="off"
                      />

                      <Button
                        appearance="soft"
                        skin="neutral"
                        size="sm"
                        leftSlot={<HiOutlinePlusSm size={16} />}
                        onClick={() => setValue(Number(value) + 1)}
                        disabled={value === 10}
                        iconOnly
                      >
                        Increase
                      </Button>
                    </Group>
                  </Box>
                </FormField.Control>
              </FormField>

              <Stack gap="lg" direction="column">
                <Text weight="medium">Description</Text>
                <Text size="sm" skin="neutral">
                  The Basic tee is an honest new take on a classic. The tee uses super soft,
                  pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and
                  sewn locally, with a special dye technique that gives each tee its own look.
                </Text>

                <Text size="sm" skin="neutral">
                  Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a
                  bundle discount.
                </Text>

                <Separator space={{ block: "xl" }} />

                <Accordion>
                  <Accordion.Item value="1">
                    {({ open }) => (
                      <>
                        <Accordion.Header
                          rightSlot={open ? <HiMinusSm size={20} /> : <HiOutlinePlusSm size={20} />}
                        >
                          <Text weight="medium">Fabric & Fit</Text>
                        </Accordion.Header>
                        <Separator />
                        <Accordion.Body>
                          <List>
                            <List.Item>
                              <Text size="sm" skin="neutral">
                                Only the best materials
                              </Text>
                            </List.Item>
                            <List.Item>
                              <Text size="sm" skin="neutral">
                                Ethically and locally made
                              </Text>
                            </List.Item>
                            <List.Item>
                              <Text size="sm" skin="neutral">
                                Pre-washed and pre-shrunk
                              </Text>
                            </List.Item>
                            <List.Item>
                              <Text size="sm" skin="neutral">
                                Machine wash cold with similar colors
                              </Text>
                            </List.Item>
                          </List>
                        </Accordion.Body>
                      </>
                    )}
                  </Accordion.Item>
                  <Separator />

                  <Accordion.Item value="2">
                    {({ open }) => (
                      <>
                        <Accordion.Header
                          rightSlot={open ? <HiMinusSm size={20} /> : <HiOutlinePlusSm size={20} />}
                        >
                          <Text weight="medium">Care Guide</Text>
                        </Accordion.Header>
                        <Separator />
                        <Accordion.Body>
                          <List>
                            <List.Item>
                              <Text size="sm" skin="neutral">
                                Only the best materials
                              </Text>
                            </List.Item>
                            <List.Item>
                              <Text size="sm" skin="neutral">
                                Ethically and locally made
                              </Text>
                            </List.Item>
                            <List.Item>
                              <Text size="sm" skin="neutral">
                                Pre-washed and pre-shrunk
                              </Text>
                            </List.Item>
                            <List.Item>
                              <Text size="sm" skin="neutral">
                                Machine wash cold with similar colors
                              </Text>
                            </List.Item>
                          </List>
                        </Accordion.Body>
                      </>
                    )}
                  </Accordion.Item>
                  <Separator />

                  <Accordion.Item value="3">
                    {({ open }) => (
                      <>
                        <Accordion.Header
                          rightSlot={open ? <HiMinusSm size={20} /> : <HiOutlinePlusSm size={20} />}
                        >
                          <Text weight="medium">Size Guide</Text>
                        </Accordion.Header>
                        <Separator />
                        <Accordion.Body>
                          <List>
                            <List.Item>
                              <Text size="sm" skin="neutral">
                                Only the best materials
                              </Text>
                            </List.Item>
                            <List.Item>
                              <Text size="sm" skin="neutral">
                                Ethically and locally made
                              </Text>
                            </List.Item>
                            <List.Item>
                              <Text size="sm" skin="neutral">
                                Pre-washed and pre-shrunk
                              </Text>
                            </List.Item>
                            <List.Item>
                              <Text size="sm" skin="neutral">
                                Machine wash cold with similar colors
                              </Text>
                            </List.Item>
                          </List>
                        </Accordion.Body>
                      </>
                    )}
                  </Accordion.Item>
                </Accordion>
              </Stack>
            </Stack>
          </Drawer.Body>
          <Separator />
          <Drawer.Footer>
            <Stack direction="column" gap="md">
              <Button skin="primary" fullWidth>
                Checkout now
              </Button>
              <Button skin="neutral" appearance="outline" fullWidth>
                Add to cart
              </Button>
            </Stack>
          </Drawer.Footer>
        </Drawer>
      </Container>
    );
  },
};
