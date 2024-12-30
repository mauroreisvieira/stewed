import React from "react";
// UI Components
import { Box, Text, Container, Stack, Dropdown, ListBox } from "@stewed/react";
// Icons
import { LuCheck } from "react-icons/lu";
// Data
import { SORT, PRICE } from "../../data";

export interface Sort {
  price: "high" | "low" | undefined;
  popular: "most" | "best" | "newest" | undefined;
}

interface HeaderProps {
  sort: Sort;
  setSort: React.ActionDispatch<[next: Partial<Sort>]>;
}

export function Header({ sort, setSort }: HeaderProps): React.ReactElement {
  return (
    <Box skin="neutral-faded" padding={{ block: "4xl" }}>
      <Container screen="xl" alignment="center" padding={{ block: "7xl", inline: "lg" }}>
        <Stack justify="between" items="baseline">
          <div>
            <Text as="h1" size="3xl" weight="medium">
              Collections
            </Text>
            <Text weight="light" skin="neutral">
              You deserve the best. Shop our latest collections and find the perfect piece for your
              wardrobe.
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
                    <ListBox.Group title="Sort by">
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
                    <ListBox.Group title="Price">
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
  );
}
