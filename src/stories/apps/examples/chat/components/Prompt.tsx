import React from "react";
// UI Components
import { Stack, TextArea, Button, Text, useTheme } from "@stewed/react";
// Hooks
import { useInput, useMediaQuery } from "@stewed/hooks";
// Icons
import { GoArrowRight } from "react-icons/go";
import { IoAttach, IoImage } from "react-icons/io5";

export function Prompt(): React.ReactElement {
  const { value: text, onChange: onTextChange } = useInput<string>("", {
    validate: (newValue) => {
      if (newValue.length >= 1001) {
        return false;
      }

      return true;
    }
  });

  const { activeToken } = useTheme();

  const isDesktop = useMediaQuery({ query: `(min-width: ${activeToken.breakpoints?.sm})` });

  return (
    <Stack direction="column" gap="md">
      <TextArea
        rows={4}
        appearance="ghost"
        placeholder="Ask whatever you want..."
        value={text}
        onChange={onTextChange}
        resize="none"
      />

      <Stack gap="md" justify="between">
        <Stack gap="sm">
          <Button
            skin="neutral"
            appearance="ghost"
            size="sm"
            iconOnly={!isDesktop}
            leftSlot={<IoAttach size={16} />}
          >
            Add Attachment
          </Button>
          <Button
            skin="neutral"
            appearance="ghost"
            size="sm"
            iconOnly={!isDesktop}
            leftSlot={<IoImage size={16} />}
          >
            Use Image
          </Button>
        </Stack>
        <Stack items="center" gap="sm">
          <Text size="xs" skin={text.length === 1000 ? "critical" : "neutral"}>
            {text.length}/1000
          </Text>
          <Button skin="primary" size="sm" leftSlot={<GoArrowRight size={16} />} iconOnly>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
