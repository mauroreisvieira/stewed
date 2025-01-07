import React, { useMemo, useState } from "react";
// UI Components
import {
  Text,
  Container,
  Drawer,
  Stack,
  FormField,
  Box,
  Group,
  Button,
  TextField,
  Separator,
  Tag
} from "@stewed/react";
// Hooks
import { useInput } from "@stewed/hooks";
// Icons
import { HiMinusSm, HiOutlinePlusSm, HiStar } from "react-icons/hi";
// Data
import { PRODUCTS, SIZES } from "../data";

export function QuickView(): React.ReactElement {
  // State to manage the selected size of the product
  const [selectedSize, setSelectedSize] = useState("");

  // State to manage the selected color of the product
  const [selectedColor, setSelectedColor] = useState("");

  // This prevents unnecessary recalculations when the component re-renders.
  const product = useMemo(() => PRODUCTS.find(({ discount }) => discount), []);

  // Using a custom hook `useInput` to manage the input value for the quantity.
  const { value, setValue, onChange } = useInput<number>(1);

  return (
    <Container screen="md" alignment="center" padding={{ block: "7xl" }}>
      <Drawer placement="right" open>
        <Drawer.Body>
          <Text as="h3" space={{ y: "md" }}>
            {product?.name}
          </Text>

          <Text size="sm" skin="neutral" space={{ y: "2xl" }}>
            {product?.category} / {product?.tag}
          </Text>

          <Stack direction="column" gap="2xl">
            <Stack gap="sm" grow>
              {product?.discount && (
                <Text size="3xl" weight="light" variation="line-through" skin="neutral-faded">
                  {(product.price.value * product?.discount) / 100}
                  {product.price.currency}
                </Text>
              )}

              <Text size="3xl" weight="semi-bold">
                {product?.price.value}
                {product?.price.currency}
              </Text>

              {product?.discount && <Tag size="xs">{product.discount}% of discount</Tag>}
            </Stack>

            {product?.rate && (
              <Stack items="center" gap="sm">
                <Stack direction="row">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Text
                      key={index}
                      as="div"
                      skin={index + 1 <= Math.floor(product?.rate) ? "warning" : "neutral-faded"}
                    >
                      <HiStar size={24} />
                    </Text>
                  ))}
                </Stack>

                <Text as="a" href="/" skin="neutral" size="xs">
                  ({product?.reviews} reviews)
                </Text>
              </Stack>
            )}

            <Text as="div" size="sm" whiteSpace="pre-wrap">
              {product?.description}
            </Text>

            <FormField>
              <FormField.Label htmlFor="group">Size</FormField.Label>
              <FormField.Control>
                <Group gap="sm">
                  {SIZES.map((value) => (
                    <Button
                      key={value}
                      size="sm"
                      disabled={!product?.sizes.includes(value)}
                      tabIndex={value === selectedSize ? 0 : -1}
                      pressed={value === selectedSize}
                      skin={value === selectedSize ? "primary" : "neutral"}
                      appearance={value === selectedSize ? "filled" : "outline"}
                      onClick={() => setSelectedSize(value)}
                    >
                      {value}
                    </Button>
                  ))}
                </Group>
              </FormField.Control>
            </FormField>

            <FormField>
              <FormField.Label htmlFor="group">Pick Color</FormField.Label>
              <FormField.Control>
                <Group gap="sm">
                  {product?.color.map((value) => (
                    <Button
                      key={value}
                      size="sm"
                      tabIndex={value === selectedColor ? 0 : -1}
                      pressed={value === selectedColor}
                      skin={value === selectedColor ? "primary" : "neutral"}
                      appearance={value === selectedColor ? "filled" : "outline"}
                      onClick={() => setSelectedColor(value)}
                    >
                      {value}
                    </Button>
                  ))}
                </Group>
              </FormField.Control>
            </FormField>

            <FormField>
              <FormField.Label htmlFor="quantity">Quantity</FormField.Label>
              <FormField.Control>
                <Box
                  radius="md"
                  borderColor="neutral-faded"
                  borderStyle="solid"
                  borderWidth={1}
                  padding={{ block: "xxs", inline: "xxs" }}
                >
                  <Group gap="xxs">
                    <Button
                      size="sm"
                      skin="neutral"
                      appearance="soft"
                      leftSlot={<HiMinusSm size={16} />}
                      onClick={() => setValue(Number(value) - 1)}
                      disabled={value <= 1}
                      iconOnly
                    >
                      Decrease
                    </Button>

                    <TextField
                      id="quantity"
                      skin={value > (product?.stock || 0) ? "critical" : "neutral"}
                      size="sm"
                      appearance="ghost"
                      name="quantity"
                      value={value}
                      onChange={onChange}
                      maxChars={Number(product?.stock).toString().length}
                      alignment="center"
                      pattern="\d*"
                      autoComplete="off"
                    />

                    <Button
                      size="sm"
                      skin="neutral"
                      appearance="soft"
                      leftSlot={<HiOutlinePlusSm size={16} />}
                      onClick={() => setValue(Number(value) + 1)}
                      disabled={value === product?.stock}
                      iconOnly
                    >
                      Increase
                    </Button>
                  </Group>
                </Box>
              </FormField.Control>
            </FormField>
          </Stack>
        </Drawer.Body>
        <Separator />
        <Drawer.Footer>
          <Stack direction="column" gap="md">
            <Button skin="primary" fullWidth>
              Checkout now
            </Button>
            <Button appearance="outline" fullWidth>
              Add to cart
            </Button>
          </Stack>
        </Drawer.Footer>
      </Drawer>
    </Container>
  );
}
