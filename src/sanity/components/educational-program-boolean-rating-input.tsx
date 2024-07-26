import { FC } from "react";
import { Card, Switch } from "@sanity/ui";
import { StringInputProps } from "sanity";
import { ProgramRatingList, useCheckupAnswerRatings } from "./program-rating-list";

type EducationalProgramBooleanRatingInputProps = StringInputProps;

export const EducationalProgramBooleanRatingInput: FC<EducationalProgramBooleanRatingInputProps> = ({
  value = "{}",
  onChange,
}) => {
  const { programs, loadingPrograms, ratingMap, updateRating } = useCheckupAnswerRatings<boolean>({
    JSONValue: value,
    onChange,
  });

  return (
    <Card border radius={2} className="mt-8">
      <ProgramRatingList
        programs={programs}
        loadingPrograms={loadingPrograms}
        ratingComponent={({ programID }) => (
          <Switch checked={ratingMap[programID]} onInput={() => updateRating(programID, !ratingMap[programID])} />
        )}
      />
    </Card>
  );
};
