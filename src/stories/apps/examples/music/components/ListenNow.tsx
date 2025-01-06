import React from "react";
// UI Components
import { Carousel, Button, Card, Text, Grid, Skeleton, AspectRatio } from "@stewed/react";
// API
import { useGetImages } from "../../../../../api/useGetImages";
// Icons
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const NUMBER_OF_PLAYLISTS = 12;

export function ListenNow(): React.ReactElement {
  // Get images
  const { data, isLoading } = useGetImages({ query: "concerts", perPage: NUMBER_OF_PLAYLISTS });

  if (isLoading) {
    return (
      <Grid
        cols={4}
        responsive={{
          xs: {
            cols: 2
          },
          md: { cols: 4 }
        }}
        gap="md"
      >
        {Array.from({ length: 4 }).map(() => (
          <AspectRatio key={crypto.randomUUID()} ratio="2:3" radius="md">
            <Skeleton size="auto" />
          </AspectRatio>
        ))}
      </Grid>
    );
  }

  return (
    <Carousel
      responsive={{
        xs: {
          perView: 2
        },
        md: { perView: 4 }
      }}
      navigation={{
        renderPrev: (props) => (
          <Button skin="secondary" leftSlot={<FiChevronLeft />} {...props} iconOnly>
            Prev
          </Button>
        ),
        renderNext: (props) => (
          <Button skin="secondary" leftSlot={<FiChevronRight />} {...props} iconOnly>
            Next
          </Button>
        )
      }}
      loop={false}
    >
      {data?.results?.map(({ urls, user, alt_description }) => (
        <Card key={user.username} shadow="none" padding={{ block: "lg", inline: "md" }}>
          <Card.Media image={{ src: `${urls.raw}&w=300&h=500&fit=crop`, alt: alt_description }} />
          <Card.Body>
            <Text size="sm" weight="medium">
              {user.name}
            </Text>
            <Text size="sm" skin="neutral">
              @{user.username}
            </Text>
          </Card.Body>
        </Card>
      ))}
    </Carousel>
  );
}
