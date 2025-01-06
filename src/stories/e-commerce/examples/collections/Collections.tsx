import React, { useMemo, useReducer } from "react";
// UI Components
import { Text, Container, Stack, Box, Accordion, Grid, Checkbox, Separator } from "@stewed/react";
// Partials
import { Products } from "./components/Products";
import { Header } from "./components/Header";
// Hooks
import { useFetchImages } from "../../../../api/useFetchImages";
// Icons
import { HiMinusSm, HiOutlinePlusSm } from "react-icons/hi";
// Data
import { FILTERS, PRODUCTS } from "../data";

interface Filters {
  tag: string[];
  category: string[];
  color: string[];
}

interface Sort {
  price: "high" | "low" | undefined;
  popular: "most" | "best" | "newest" | undefined;
}

export function Collections(): React.ReactElement {
  const { data } = useFetchImages({ query: "fashion", perPage: PRODUCTS.length });

  // Reducer to update the filters, merging the previous state with the new state
  const [filters, setFilters] = useReducer(
    (prev: Filters, next: Partial<Filters>) => {
      return { ...prev, ...next };
    },
    { tag: [], category: [], color: [] }
  );

  const [sort, setSort] = useReducer(
    (prev: Sort, next: Partial<Sort>) => {
      return { ...prev, ...next };
    },
    { price: undefined, popular: "newest" }
  );

  const productsList = useMemo(() => {
    // If no filters are applied, return all products
    const filteredProducts = PRODUCTS.map((product) => ({
      ...product,
      image: data?.results[product.id - 1]?.urls.small
    })).filter(({ category, color, tag }) => {
      // Check if the product matches the Tag filter (only if filters.tag is not empty)
      const matchesTag = filters.tag.length === 0 || filters.tag.includes(tag);

      // Check if the product matches the Category filter (only if filters.category is not empty)
      const matchesCategory = filters.category.length === 0 || filters.category.includes(category);

      // Check if the product matches the Color filter (only if filters.color is not empty)
      const matchesColor =
        filters.color.length === 0 || color.some((co) => filters.color.includes(co));

      // Return product only if it matches all selected filters
      return matchesTag && matchesCategory && matchesColor;
    });

    if (sort.price) {
      filteredProducts.sort((a, b) => {
        if (sort.price === "high") {
          return b.price?.value - a.price.value;
        }

        if (sort.price === "low") {
          return a.price.value - b.price.value;
        }

        return 0;
      });
    }

    if (sort.popular) {
      filteredProducts.sort((a, b) => {
        switch (sort.popular) {
          case "most":
            // Assuming "most" refers to sales products
            return b.sales - a.sales;
          case "best":
            // You could use the rate or another logic for "best" products
            return b.rate - a.rate; // You can change this based on your logic
          default:
            return 0;
        }
      });
    }

    return filteredProducts;
  }, [data?.results, filters.category, filters.color, filters.tag, sort.popular, sort.price]);

  return (
    <Box>
      <Header sort={sort} setSort={setSort} />

      <Container screen="xl" alignment="center" padding={{ block: "7xl", inline: "lg" }}>
        <Grid cols={4}>
          <Stack responsive={{ md: { hidden: false } }} hidden>
            <Accordion multipleExpanded>
              {FILTERS.map(({ name, key, values }) => (
                <Accordion.Item key={name} value={name} defaultOpen>
                  {({ open }) => (
                    <>
                      <Accordion.Header rightSlot={open ? <HiMinusSm /> : <HiOutlinePlusSm />}>
                        {name}
                      </Accordion.Header>
                      <Accordion.Body>
                        <Checkbox.Group
                          orientation="vertical"
                          checkedValues={filters[key as keyof Filters]}
                          onCheckedChange={(value) => setFilters({ [key]: value })}
                        >
                          {values.map((value) => (
                            <Checkbox key={value} value={value}>
                              <Text weight="normal" size="sm">
                                {value}
                              </Text>
                            </Checkbox>
                          ))}
                        </Checkbox.Group>
                      </Accordion.Body>
                    </>
                  )}
                </Accordion.Item>
              ))}
            </Accordion>

            <Separator space={{ inline: "6xl" }} orientation="vertical" />
          </Stack>

          <Grid.Item colSpan={4} responsive={{ md: { colSpan: 3 } }}>
            <Products data={productsList} />
          </Grid.Item>
        </Grid>
      </Container>
    </Box>
  );
}
