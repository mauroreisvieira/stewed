import React, { useMemo, useReducer } from "react";
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
  Card,
  ListBox,
  Dropdown,
  type MotionProps
} from "@stewed/react";
// Hooks
import { useFetchImages } from "../../../api/useFetchImages";
// Icons
import { LuCheck } from "react-icons/lu";
import { HiMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { IoStar, IoEyeOutline, IoHeartOutline } from "react-icons/io5";
// Data
import { FILTERS, PRICE, PRODUCTS, SORT } from "./data";

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
  const { data } = useFetchImages({ query: "bag", perPage: PRODUCTS.length });

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
    { price: undefined, popular: undefined }
  );

  const productsList = useMemo(() => {
    // If no filters are applied, return all products
    const filteredProducts = PRODUCTS.map((product, index) => ({
      ...product,
      image: data?.results[index]?.urls.small
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
          return parseFloat(b.price.replace("€", "")) - parseFloat(a.price.replace("€", ""));
        }

        if (sort.price === "low") {
          return parseFloat(a.price.replace("€", "")) - parseFloat(b.price.replace("€", ""));
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
      <Box skin="neutral-faded" padding={{ block: "4xl", inline: "lg" }}>
        <Container screen="xl" alignment="center" padding={{ block: "7xl" }}>
          <Stack justify="between" items="baseline">
            <div>
              <Text as="h1" size="3xl" weight="medium">
                Collections
              </Text>
              <Text weight="light" skin="neutral">
                You deserve the best. Shop our latest collections and find the perfect piece for
                your wardrobe.
              </Text>
            </div>
            <Dropdown<HTMLButtonElement>
              renderAnchor={({ ref, isOpen, open, close }) => (
                <Dropdown.Button ref={ref} onClick={isOpen ? close : open} size="md">
                  Filter
                </Dropdown.Button>
              )}
              placement="bottom-end"
            >
              {({ close }) => {
                return (
                  <Box padding={{ inline: "xs", block: "md" }}>
                    <ListBox>
                      <ListBox.Group
                        title={
                          <Text weight="medium" size="sm">
                            Sort by
                          </Text>
                        }
                      >
                        {SORT.map(({ key, name }) => (
                          <ListBox.Item
                            key={key}
                            as="button"
                            rightSlot={key === sort.popular ? <LuCheck /> : undefined}
                            onClick={() => {
                              setSort({ popular: key as Sort["popular"] });
                              close();
                            }}
                          >
                            {name}
                          </ListBox.Item>
                        ))}
                      </ListBox.Group>
                      <ListBox.Separator />
                      <ListBox.Group
                        title={
                          <Text weight="medium" size="sm">
                            Price
                          </Text>
                        }
                      >
                        {PRICE.map(({ key, name }) => (
                          <ListBox.Item
                            key={key}
                            as="button"
                            rightSlot={key === sort.price ? <LuCheck /> : undefined}
                            onClick={() => {
                              setSort({ price: key as Sort["price"] });
                              close();
                            }}
                          >
                            {name}
                          </ListBox.Item>
                        ))}
                      </ListBox.Group>
                    </ListBox>
                  </Box>
                );
              }}
            </Dropdown>
          </Stack>
        </Container>
      </Box>

      <Container screen="xl" alignment="center" padding={{ block: "7xl", inline: "lg" }}>
        <Grid cols={4} gap="9xl">
          <Stack hidden responsive={{ md: { hidden: false } }}>
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
          </Stack>
          <Grid.Item colSpan={4} responsive={{ md: { colSpan: 3 } }}>
            <Box padding={{ block: "lg" }} fullHeight>
              {productsList.length ? (
                <Grid
                  cols={1}
                  responsive={{ sm: { cols: 2 }, md: { cols: 3 }, lg: { cols: 4 } }}
                  gap="xl"
                >
                  {productsList.map(({ id, name, image, category, price, rate }) => (
                    <Hoverable key={id}>
                      {({ status }) => {
                        let animation: MotionProps["animation"] = "zoom-in-soft";

                        if (status === "enter") {
                          animation = "scale-in";
                        }

                        if (status === "leave") {
                          animation = "scale-out";
                        }

                        return (
                          <Card shadow="none" padding={{ inline: "none", block: "md" }}>
                            <Motion animation={animation}>
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
                        );
                      }}
                    </Hoverable>
                  ))}
                </Grid>
              ) : (
                <Box fullHeight fullWidth>
                  <Stack
                    direction="column"
                    items="center"
                    justify="center"
                    style={{ height: "100%" }}
                  >
                    <Text size="2xl" weight="semi-bold" skin="neutral-faded" space={{ y: "sm" }}>
                      No products found
                    </Text>
                    <Text>Your search did not match any product</Text>
                  </Stack>
                </Box>
              )}
            </Box>
          </Grid.Item>
        </Grid>
      </Container>
    </Box>
  );
}
