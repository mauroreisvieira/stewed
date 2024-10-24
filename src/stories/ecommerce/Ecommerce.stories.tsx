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
  Grid,
} from "@stewed/react";
// Hooks
import { useInput } from "../../../packages/hooks/index";
// Icons
import { HiOutlinePlusSm, HiMinusSm, HiHeart } from "react-icons/hi";

const meta = {
  title: "Examples/Ecommerce",
  decorators: [
    (Story) => (
      <Theme>
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
            <Text as="h5">Benfica ÁGUIA Hoodie</Text>
          </Drawer.Header>
          <Separator />
          <Drawer.Body>
            <Stack direction="column" gap="2xl">
              <Stack gap="lg">
                <Text size="3xl" weight="bold">
                  €89,95
                </Text>
                <Text size="3xl" variation={["line-through"]} skin="critical">
                  €120
                </Text>
              </Stack>

              <FormField>
                <FormField.Label htmlFor="group">Size</FormField.Label>
                <FormField.Control>
                  <Grid cols={7} gap="sm">
                    {productsSizes.map((value) => (
                      <Button
                        key={value}
                        skin={value === selectedSize ? "primary" : "neutral"}
                        disabled={value === "XXL" ? true : false}
                        appearance={value === selectedSize ? "filled" : "outline"}
                        onClick={() => setSelectedSize(value)}>
                        {value}
                      </Button>
                    ))}
                  </Grid>
                </FormField.Control>
              </FormField>

              <FormField>
                <FormField.Label htmlFor="quantity">Quantity</FormField.Label>
                <FormField.Control>
                  <Group>
                    <Button
                      skin="neutral"
                      appearance="outline"
                      leftSlot={<HiMinusSm />}
                      onClick={() => setValue(Number(value) - 1)}
                      disabled={value === 0}
                      iconOnly>
                      Decrease
                    </Button>
                    <TextField
                      id="quantity"
                      skin="neutral"
                      name="quantity"
                      value={value}
                      onChange={onChange}
                      maxChars={3}
                      alignment="center"
                    />
                    <Button
                      skin="neutral"
                      appearance="outline"
                      leftSlot={<HiOutlinePlusSm />}
                      onClick={() => setValue(Number(value) + 1)}
                      disabled={value === 100}
                      iconOnly>
                      Increase
                    </Button>
                  </Group>
                </FormField.Control>
              </FormField>

              <Stack gap="lg" direction="column">
                <Text weight="medium">Description</Text>
                <Text size="sm" skin="neutral">
                  The Basic tee is an honest new take on a classic. The tee uses super soft,
                  pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and
                  sewn locally, with a special dye technique that gives each tee it's own look.
                </Text>

                <Text size="sm" skin="neutral">
                  Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a
                  bundle discount.
                </Text>

                <Separator space={{ block: "xl" }} />

                <Text weight="medium">Fabric & Care</Text>
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
              </Stack>
            </Stack>
          </Drawer.Body>
          <Drawer.Footer>
            <Stack gap="md">
              <Button skin="primary" size="xl" fullWidth>
                Add to bug
              </Button>

              <Button skin="neutral" appearance="ghost" size="xl" leftSlot={<HiHeart />} iconOnly>
                Add to favorites
              </Button>
            </Stack>
          </Drawer.Footer>
        </Drawer>
      </Container>
    );
  },
};
