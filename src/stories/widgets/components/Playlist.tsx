import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// UI Components
import {
  Container,
  Card,
  Backdrop,
  Stack,
  Button,
  Hue,
  ScrollArea,
  Box,
  ListBox,
  Avatar,
  Slider,
  Text
} from "@stewed/react";
// Hooks
import { useFetchImages } from "../../../api/useFetchImages";
import { useSelect, useToggle } from "@stewed/hooks";
// Icons
import { LuPause, LuPlay, LuShuffle, LuSkipBack, LuSkipForward, LuRepeat } from "react-icons/lu";
import { PiQueue } from "react-icons/pi";
// Data
import { songs } from "./data";
import { Separator } from "@stewed/react";
import { title } from "process";

export function Playlist(): React.ReactElement {
  const { data } = useFetchImages({ query: "playlist", perPage: songs.length });

  const { item, setIndex, index } = useSelect(songs, 1);
  const [isPlaying, togglePlay, setIsPlaying] = useToggle();

  const [showQueue, setShowQueue] = useState(false);

  const [sliderValue, setSliderValue] = useState(0);
  const intervalRef = useRef<null | ReturnType<typeof setInterval>>(null);

  // Utility Functions
  const durationToSeconds = useCallback((duration: string) => {
    const [minutes, seconds] = duration.split(":").map(Number);

    return (minutes || 0) * 60 + (seconds || 0);
  }, []);

  const secondsToDuration = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }, []);

  const durationInSeconds = useMemo(
    () => (item?.duration ? durationToSeconds(item.duration) : 0),
    [durationToSeconds, item?.duration]
  );

  const onHandleSliderChange = useCallback(
    (value: number | number[]) => {
      const newValueInSeconds = Math.round((Array.isArray(value) ? value[0] : value) || 0);

      // Update the slider value
      setSliderValue(newValueInSeconds);

      // Sync playback
      if (isPlaying && intervalRef.current) {
        // Clear the current interval
        clearInterval(intervalRef.current);

        // Start a new interval from the updated value
        intervalRef.current = setInterval(() => {
          setSliderValue((prev) => {
            if (prev < durationInSeconds) {
              return prev + 1;
            } else {
              if (intervalRef.current) clearInterval(intervalRef.current);
              setIsPlaying(false);

              return prev;
            }
          });
        }, 1000);
      }
    },
    [durationInSeconds, isPlaying, setIsPlaying]
  );

  // Define the function to handle what happens when music ends
  const onMusicEnd = useCallback(() => {
    setIndex(index < songs.length - 1 ? index + 1 : 0);
    setSliderValue(0);
  }, [index, setIndex]);

  // Handle play/pause
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setSliderValue((prev) => {
          if (prev < durationInSeconds) {
            return prev + 1;
          } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
            onMusicEnd();

            return prev;
          }
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, durationInSeconds, onMusicEnd]);

  return (
    <Container screen="xs" alignment="center" padding={{ block: "7xl" }}>
      <Card padding={{ block: "2xl", inline: "2xl" }} shadow="2xl">
        <Card.Media
          image={{ src: data?.results[index]?.urls.thumb }}
          style={{ height: 260, overflow: "hidden" }}
        >
          <Backdrop blur="xs" style={{ position: "absolute" }} />

          <Stack justify="end">
            <Button
              onClick={() => setShowQueue((prev) => !prev)}
              leftSlot={<PiQueue size={16} />}
              appearance="soft"
              pressed={showQueue}
              size="sm"
              skin="secondary"
              iconOnly
            >
              Queue
            </Button>
          </Stack>
        </Card.Media>

        <Hue skin={{ from: "white", to: "indigo-100" }} degree={180}>
          <div>
            {showQueue && (
              <>
                <ScrollArea style={{ maxHeight: 320 }}>
                  <Box padding={{ block: "md" }}>
                    <ListBox>
                      {songs.map(({ title, genre, album, artist }, idx) => (
                        <ListBox.Item
                          key={title}
                          selected={index === idx}
                          onClick={() => {
                            setIndex(idx);

                            if (isPlaying) {
                              setIsPlaying(index === idx ? false : true);
                            } else {
                              setIsPlaying(true);
                            }
                          }}
                          leftSlot={
                            <Avatar
                              shape="square"
                              name={artist}
                              size="xl"
                              image={{ src: data?.results[idx]?.urls.raw }}
                            />
                          }
                          rightSlot={
                            // eslint-disable-next-line no-nested-ternary
                            index === idx ? (
                              isPlaying ? (
                                <LuPause size={18} />
                              ) : (
                                <LuPlay size={18} />
                              )
                            ) : null
                          }
                        >
                          <Box
                            padding={{
                              block: "lg"
                            }}
                          >
                            <Text size="sm">{genre}</Text>
                            <Text size="xs" skin="neutral">
                              {title} ({album})
                            </Text>
                          </Box>
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Box>
                </ScrollArea>
                <Separator />
              </>
            )}

            <Card.Body>
              <Stack direction="column" gap="2xl">
                <Stack gap="5xl" direction="column">
                  <Stack direction="column" gap="sm">
                    <Text skin="primary" size="sm">
                      {item?.genre}
                    </Text>
                    <Text skin="neutral" size="sm" weight="medium">
                      {item?.title} ({item?.album})
                    </Text>
                    <Text size="lg" weight="medium">
                      {item?.artist}
                    </Text>
                  </Stack>

                  <Slider
                    size="lg"
                    value={sliderValue}
                    max={durationInSeconds}
                    onChange={onHandleSliderChange}
                  />
                </Stack>

                <Stack justify="between">
                  <Text size="xs" skin="primary">
                    {secondsToDuration(sliderValue)}
                  </Text>
                  <Text size="xs" skin="neutral">
                    {item?.duration}
                  </Text>
                </Stack>
              </Stack>
            </Card.Body>
          </div>
        </Hue>

        <Hue skin={{ from: "indigo-100", to: "white" }} degree={180}>
          <Card.Footer>
            <Stack items="center" justify="center" gap="2xl">
              <Button appearance="ghost" leftSlot={<LuShuffle size={18} />} iconOnly>
                Shuffle
              </Button>
              <Button
                appearance="ghost"
                leftSlot={<LuSkipBack size={18} />}
                onClick={() => {
                  setIndex(index === 0 ? songs.length - 1 : index - 1);
                  setSliderValue(0);
                }}
                iconOnly
              >
                Previous
              </Button>
              <Button
                appearance="ghost"
                leftSlot={isPlaying ? <LuPause size={24} /> : <LuPlay size={24} />}
                size="xl"
                onClick={togglePlay}
                iconOnly
              >
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button
                appearance="ghost"
                leftSlot={<LuSkipForward size={18} />}
                onClick={() => {
                  setIndex(index < songs.length - 1 ? index + 1 : 0);
                  setSliderValue(0);
                }}
                iconOnly
              >
                Next
              </Button>
              <Button appearance="ghost" leftSlot={<LuRepeat size={18} />} pressed iconOnly>
                Repeat
              </Button>
            </Stack>
          </Card.Footer>
        </Hue>
      </Card>
    </Container>
  );
}
