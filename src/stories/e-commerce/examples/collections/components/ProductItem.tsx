import React from "react";
// UI Components
import { Hoverable, MotionProps, Text, Card, Motion, Box, Stack, Button } from "@stewed/react";
// Icons
import { IoEyeOutline, IoHeartOutline, IoStar } from "react-icons/io5";
// Types
import type { Product } from "../../data";

export interface ProductItemProps extends Product {
  image: string | undefined;
}

export function ProductItem({
  name,
  image,
  category,
  price,
  rate
}: ProductItemProps): React.ReactElement {
  return (
    <Hoverable>
      {({ status, isTouch }) => {
        let animation: MotionProps["animation"] = "zoom-in-soft";

        if (status === "enter") {
          animation = "scale-in";
        }

        if (status === "leave") {
          animation = "scale-out";
        }

        return (
          <Card shadow="none" padding={{ inline: "none", block: "md" }}>
            <Motion animation={isTouch ? undefined : animation}>
              {({ className }) => (
                <Card.Media
                  style={{ height: 200, overflow: "hidden" }}
                  image={{
                    src: image,
                    loading: "eager",
                    className
                  }}
                >
                  {status === "enter" && (
                    <Motion animation="fade-in" duration="slowly">
                      <Box padding={{ inline: "md" }}>
                        <Stack direction="column" items="end" gap="sm">
                          <Button size="sm" skin="secondary" leftSlot={<IoEyeOutline />} iconOnly>
                            Quick View
                          </Button>
                          <Button size="sm" skin="secondary" leftSlot={<IoHeartOutline />} iconOnly>
                            Add to Favorites
                          </Button>
                        </Stack>
                      </Box>
                    </Motion>
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
                <Text weight="semi-bold">
                  {price.value}
                  {price.currency}
                </Text>
                <Stack items="center" justify="end" gap="xxs">
                  <Text size="xs">{rate.toFixed(1)}</Text>
                  <Text as="span" skin="warning">
                    <IoStar size={14} />
                  </Text>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        );
      }}
    </Hoverable>
  );
}
