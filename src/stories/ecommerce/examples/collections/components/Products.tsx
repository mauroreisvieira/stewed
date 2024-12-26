import React from "react";
// UI Components
import { Box, Grid, Stack, Text } from "@stewed/react";
import { ProductItem, type ProductItemProps } from "./ProductItem";

interface ProductsProps {
  data: ProductItemProps[];
}

export function Products({ data }: ProductsProps): React.ReactElement {
  return (
    <Box fullHeight>
      {data.length ? (
        <Grid cols={1} responsive={{ sm: { cols: 2 }, md: { cols: 3 }, lg: { cols: 4 } }} gap="xl">
          {data.map((product) => (
            <ProductItem key={product.id} {...product} />
          ))}
        </Grid>
      ) : (
        <Box padding={{ block: "9xl" }} fullWidth>
          <Stack direction="column" items="center" justify="center" style={{ height: "100%" }}>
            <Text size="2xl" weight="semi-bold" skin="neutral-faded" space={{ y: "sm" }}>
              No products found
            </Text>
            <Text>Your search did not match any product</Text>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
