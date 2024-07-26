import { FC } from "react";
import { Card, Label } from "@sanity/ui";
import { StringInputProps } from "sanity";
import { Root as SliderRoot, SliderTrack, SliderThumb } from "@radix-ui/react-slider";
import { ProgramRatingList, useCheckupAnswerRatings } from "./program-rating-list";

type EducationalProgramNumberRatingInputProps = StringInputProps;

export const EducationalProgramNumberRatingInput: FC<EducationalProgramNumberRatingInputProps> = ({
  value = "{}",
  onChange,
}) => {
  const { programs, loadingPrograms, ratingMap, updateRating } = useCheckupAnswerRatings<number>({
    JSONValue: value,
    onChange,
  });

  return (
    <Card border radius={2} className="mt-8">
      <div className="sticky -top-px z-10 flex justify-between gap-2 border-b border-[ghostwhite]/20 bg-[#13141b] p-4 pb-0">
        {["Sehr Unpassend", "Neutral", "Sehr passend"].map((label, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <Label size={1} muted>
              {label}
            </Label>
            <div className="h-2 w-px bg-[ghostwhite]/20" />
          </div>
        ))}
      </div>
      <ProgramRatingList
        programs={programs}
        loadingPrograms={loadingPrograms}
        ratingComponent={({ programID }) => (
          <SliderRoot
            value={[ratingMap[programID] || 0]}
            onValueChange={([value]) => updateRating(programID, value)}
            className="relative mt-4 flex h-5 w-full touch-none select-none items-center"
            defaultValue={[0]}
            max={1}
            min={-1}
            step={0.01}
          >
            <SliderTrack className="relative h-[3px] grow rounded-full bg-[#94a2f1]/20" />
            <SliderThumb
              className="block h-4 w-4 cursor-w-resize rounded-full bg-[#bfbfd8] transition-all hover:scale-125 hover:bg-[#588ee0] focus:outline-none focus:ring"
              aria-label="Volume"
            />
          </SliderRoot>
        )}
      />
    </Card>
  );
};
