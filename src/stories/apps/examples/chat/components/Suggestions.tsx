import React from "react";
// UI Components
import { Grid, Hue, Card, Text } from "@stewed/react";
// Icons
import { BsBodyText } from "react-icons/bs";
import { GoTasklist } from "react-icons/go";
import { IoMailOutline, IoSettingsOutline } from "react-icons/io5";

export function Suggestions(): React.ReactElement {
  return (
    <Grid
      cols={2}
      responsive={{
        sm: {
          cols: 4
        }
      }}
      gap="lg"
    >
      <Hue skin="transparent">
        <Card>
          <Card.Body>
            <Text size="sm" skin="neutral">
              Write a to-do list for a personal project or task
            </Text>
          </Card.Body>
          <Card.Footer>
            <Text skin="neutral">
              <GoTasklist size={18} />
            </Text>
          </Card.Footer>
        </Card>
      </Hue>

      <Hue skin="transparent">
        <Card>
          <Card.Body>
            <Text size="sm" skin="neutral">
              Generate an email ro reply to a job offer
            </Text>
          </Card.Body>
          <Card.Footer>
            <Text skin="neutral">
              <IoMailOutline size={18} />
            </Text>
          </Card.Footer>
        </Card>
      </Hue>

      <Hue skin="transparent">
        <Card>
          <Card.Body>
            <Text size="sm" skin="neutral">
              Summarize this article or text for me in one paragraph
            </Text>
          </Card.Body>

          <Card.Footer>
            <Text skin="neutral">
              <BsBodyText size={18} />
            </Text>
          </Card.Footer>
        </Card>
      </Hue>

      <Hue skin="transparent">
        <Card>
          <Card.Body>
            <Text size="sm" skin="neutral">
              How does Al work in a technical capacity
            </Text>
          </Card.Body>
          <Card.Footer>
            <Text skin="neutral">
              <IoSettingsOutline size={18} />
            </Text>
          </Card.Footer>
        </Card>
      </Hue>
    </Grid>
  );
}
