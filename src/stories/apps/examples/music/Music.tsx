import React, { useState } from "react";
// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// UI Components
import { Box, Container, Segmented, Separator, Snackbar, Stack, Theme } from "@stewed/react";
// Partials
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Podcast } from "./components/Podcast";

const queryClient = new QueryClient();

/**
 * Represents the available themes for the Music component.
 *
 * - `"default"`: The default theme for the music player.
 * - `"dark"`: A dark theme for the music player.
 */
type TMusicTheme = "default" | "dark";

/**
 * Music component that renders a music player UI.
 * The component renders a music player with different visual themes, such as the default or dark theme, based on the passed props.
 *
 * @returns {React.ReactElement} The rendered music player component.
 */
export function Music(): React.ReactElement {
  // State to manage the value of the segmented control between "music" and "podcast"
  const [segmentedValue, setSegmentedValue] = useState<"music" | "podcast">("music");

  return (
    <QueryClientProvider client={queryClient}>
      <Theme<TMusicTheme>
        theme="default"
        tokens={{
          default: {
            color: {
              "background-surface": "slate-100",
              "primary-background": "#1db954",
              "primary-background-hovered": "#1aa64b",
              "primary-background-pressed": "#179443",
              "primary-border": "#1db954",
              "primary-border-faded": "teal-200",
              "primary-foreground": "#1db954",
              "secondary-background": "#121212",
              "secondary-background-hovered": "#101010",
              "secondary-background-pressed": "#101010",
              "secondary-foreground": "#121212"
            },
            components: {
              button: {
                radius: "full"
              }
            }
          },
          dark: {
            color: {
              "background-backdrop": "#aaaaaaa8",
              "background-default": "#0f162a",
              "background-elevated": "#0f162a",
              "background-surface": "#3b4554",
              "foreground-default": "#fff",
              "neutral-foreground": "slate-300",
              "neutral-background": "slate-500",
              "neutral-background-faded": "slate-800",
              "neutral-border-faded": "slate-700",
              "secondary-background": "#fff",
              "secondary-background-hovered": "#fcfcfc",
              "secondary-background-pressed": "#fcfcfc",
              "secondary-foreground": "#fff",
              "secondary-foreground-on-background": "#121212",
              "critical-background-faded": "#2e0a0a",
              "critical-border-faded": "#793335"
            }
          }
        }}
      >
        <Snackbar screen="sm" placement="bottom" max={5}>
          <Box skin="default" fullScreen>
            <Header />
            <Separator />
            <Container as="main" screen="2xl" padding={{ block: "xl" }} alignment="center">
              <Box padding={{ inline: "2xl", block: "lg" }}>
                <Box space={{ y: "4xl" }}>
                  <Stack items="baseline" justify="between">
                    <Segmented<"music" | "podcast">
                      value={segmentedValue}
                      onValueChange={setSegmentedValue}
                    >
                      <Segmented.Item value="music">Music</Segmented.Item>
                      <Segmented.Item value="podcast">Podcast</Segmented.Item>
                      <Segmented.Item value="live" disabled>
                        Live
                      </Segmented.Item>
                    </Segmented>
                  </Stack>
                </Box>

                {segmentedValue === "music" ? <Home /> : <Podcast />}
              </Box>
            </Container>
          </Box>
        </Snackbar>
      </Theme>
    </QueryClientProvider>
  );
}
