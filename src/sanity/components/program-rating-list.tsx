import { ComponentProps, FC, useCallback, useMemo } from "react";
import { Box, Card, Flex, Heading, Label, Spinner, Stack, Text } from "@sanity/ui";
import { FormPatch, PatchEvent, set, useClient } from "sanity";
import { groq } from "next-sanity";
import { useQuery } from "@tanstack/react-query";
import { CheckupAnswerEducationalProgramsQueryResult } from "../../../generated/sanity/types";
import { createColorThemeStyles, ensureValidHSL } from "~/app/_utils/color-swatch";

const checkupAnswerEducationalProgramsQuery = groq`*[_type == "educational-program"] {
  _id,
  name,
  promotionalHeadline,
  educationalProgramType -> {
      name,
      color
  }
}`;

export type CheckupAnswerRatingsValue<T> = Record<string, T>;

const updateCheckupAnswerRatingPayload = <T,>(payload: string, ratingID: string, newRating: T) => {
  const parsedPayload = JSON.parse(payload) as CheckupAnswerRatingsValue<T>;
  return JSON.stringify({ ...parsedPayload, [ratingID]: newRating });
};

type UseCheckupAnswerRatingsConfig = {
  JSONValue: string;
  onChange: (patch: FormPatch | FormPatch[] | PatchEvent) => void;
};

export const useCheckupAnswerRatings = <T,>(config: UseCheckupAnswerRatingsConfig) => {
  const sanity = useClient();

  const { data: programs, isLoading: loadingPrograms } = useQuery({
    queryKey: ["educational-programs"],
    queryFn: () => sanity.fetch<CheckupAnswerEducationalProgramsQueryResult>(checkupAnswerEducationalProgramsQuery),
  });

  const ratingMap = useMemo(
    () => JSON.parse(config.JSONValue || "{}") as CheckupAnswerRatingsValue<T>,
    [config.JSONValue],
  );

  const updateRating = useCallback(
    (ratingID: string, value: T) => {
      const newPayload = updateCheckupAnswerRatingPayload(config.JSONValue, ratingID, value);
      config.onChange(PatchEvent.from(set(newPayload)));
    },
    [config.JSONValue, config.onChange],
  );

  return { programs, loadingPrograms, ratingMap, updateRating };
};

export type ProgramRatingListProps = ComponentProps<typeof Box> & {
  programs: ReturnType<typeof useCheckupAnswerRatings>["programs"];
  loadingPrograms: boolean;
  ratingComponent: FC<{ programID: string }>;
};

export const ProgramRatingList: FC<ProgramRatingListProps> = ({
  programs,
  loadingPrograms,
  ratingComponent: RatingComponent,
  ...restProps
}) => {
  return (
    <Box padding={4} {...restProps}>
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
              <RatingComponent programID={program._id} />
            </Stack>
          ))}
        </Stack>
      ) : (
        <Card padding={4} border radius={2} tone="caution">
          <Stack space={3}>
            {/* TODO: Connect CMS */}
            <Heading>Keine Bildungsgänge vorhanden</Heading>
            <Text muted>Bitte lege erst Bildungsgänge an, bevor du die Checkup-Seite einrichtest.</Text>
          </Stack>
        </Card>
      )}
    </Box>
  );
};
