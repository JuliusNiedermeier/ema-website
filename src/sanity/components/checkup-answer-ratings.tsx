import { ComponentProps, FC, useMemo } from "react";
import { Box, Card, Flex, Heading, Label, Spinner, Stack, Text } from "@sanity/ui";
import { PatchEvent, set, StringInputProps, useClient } from "sanity";
import { groq } from "next-sanity";
import { useQuery } from "@tanstack/react-query";
import { CheckupAnswerEducationalProgramsQueryResult } from "../../../generated/sanity/types";
import { Root as SliderRoot, SliderTrack, SliderThumb } from "@radix-ui/react-slider";
import { createColorThemeStyles, ensureValidHSL } from "~/app/_utils/color-swatch";

export type CheckupAnswerRatingsValue = Record<string, number>;

const updateCheckupAnswerRatingPayload = (payload: string, ratingID: string, newRating: number) => {
  const parsedPayload = JSON.parse(payload) as CheckupAnswerRatingsValue;
  return JSON.stringify({ ...parsedPayload, [ratingID]: newRating });
};

const checkupAnswerEducationalProgramsQuery = groq`*[_type == "educational-program"] {
    _id,
    name,
    promotionalHeadline,
    educationalProgramType -> {
        name,
        color
    }
}`;

type CheckupAnswerRatingsProps = StringInputProps;

export const CheckupAnswerRatings: FC<CheckupAnswerRatingsProps> = ({ value: jsonValue, onChange }) => {
  const sanity = useClient();

  const { data: programs, isLoading: loadingPrograms } = useQuery({
    queryKey: ["educational-programs"],
    queryFn: () => sanity.fetch<CheckupAnswerEducationalProgramsQueryResult>(checkupAnswerEducationalProgramsQuery),
  });

  const createValueChangeHandler =
    (ratingID: string): ComponentProps<typeof SliderRoot>["onValueChange"] =>
    ([value]) => {
      const newPayload = updateCheckupAnswerRatingPayload(jsonValue || "{}", ratingID, value);
      onChange(PatchEvent.from(set(newPayload)));
    };

  const ratingMap = useMemo(() => JSON.parse(jsonValue || "{}") as CheckupAnswerRatingsValue, [jsonValue]);

  return (
    <Card border radius={2} className="mt-8">
      <div className="sticky -top-px z-10 flex justify-between gap-2 border-b border-[ghostwhite]/20 bg-[#13141b] p-4 pb-0">
        {["Sehr Unpassend", "Neutral", "Sehr passend"].map((label, index) => (
          <div className="flex flex-col items-center gap-2">
            <Label size={1} muted>
              {label}
            </Label>
            <div className="h-2 w-px bg-[ghostwhite]/20" />
          </div>
        ))}
      </div>
      <Box padding={4}>
        {loadingPrograms ? (
          <Flex justify="center">
            <Spinner />
          </Flex>
        ) : programs?.length ? (
          <Stack hidden={loadingPrograms}>
            {programs.map((program, index) => (
              <Stack
                key={index}
                space={3}
                marginTop={6}
                style={createColorThemeStyles(ensureValidHSL(program.educationalProgramType?.color?.hsl))}
              >
                <div className="flex gap-4">
                  <div className="h-full w-4 rounded-full bg-themed-primary" />
                  <Stack space={3}>
                    <Label muted>{program.educationalProgramType?.name}</Label>
                    <Heading size={1}>{program.name}</Heading>
                    <Text muted>{program.promotionalHeadline}</Text>
                  </Stack>
                </div>
                <SliderRoot
                  value={[ratingMap[program._id] || 50]}
                  onValueChange={createValueChangeHandler(program._id)}
                  className="relative mt-4 flex h-5 w-full touch-none select-none items-center"
                  defaultValue={[50]}
                  max={100}
                  step={1}
                >
                  <SliderTrack className="relative h-[3px] grow rounded-full bg-[#94a2f1]/20" />
                  <SliderThumb
                    className="block h-4 w-4 cursor-w-resize rounded-full bg-[#bfbfd8] transition-all hover:scale-125 hover:bg-[#588ee0] focus:outline-none focus:ring"
                    aria-label="Volume"
                  />
                </SliderRoot>
              </Stack>
            ))}
          </Stack>
        ) : (
          <Card padding={4} border radius={2} tone="caution">
            <Stack space={3}>
              <Heading>Keine Bildungsgänge vorhanden</Heading>
              <Text muted>Bitte lege erst Bildungsgänge an, bevor du die Checkup-Seite einrichtest.</Text>
            </Stack>
          </Card>
        )}
      </Box>
    </Card>
  );
};
