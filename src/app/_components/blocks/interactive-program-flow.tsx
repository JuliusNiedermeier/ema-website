import { groq } from "next-sanity";
import { ComponentProps, FC } from "react";
import { InteractiveProgramFlow as Flow } from "~/app/_components/compounds/interactive-program-flow";
import { sanityFetch } from "~/sanity/lib/client";
import { ProgramFlowProgramsQueryResult } from "../../../../generated/sanity/types";
import { ensureValidHSL } from "~/app/_utils/color-swatch";

const programFlowProgramsQuery = groq`*[_type == "educational-program"] {
  _id,
  name,
  educationalProgramType -> {
    color
  },
  nextOptions[] {
    ...,
    _type == "educationalProgram" => {
      reference { _ref }
    }
  }
}`;

type InteractiveProgramFlowProps = Omit<ComponentProps<typeof Flow>, "items">;

export const InteractiveProgramFlow: FC<InteractiveProgramFlowProps> = async (props) => {
  const programs = await sanityFetch<ProgramFlowProgramsQueryResult>(programFlowProgramsQuery, {
    tags: ["educational-program"],
  });

  const programItems = programs.map<ComponentProps<typeof Flow>["items"][number]>((program) => ({
    id: program._id,
    type: "program",
    data: { name: program.name || "", color: ensureValidHSL(program.educationalProgramType?.color?.hsl) },
    nextItemIDs:
      program.nextOptions?.map((option) => {
        switch (option._type) {
          case "educationalProgram": {
            return option.reference!._ref; // This is not safe!
          }
          case "textNode": {
            return option._key;
          }
        }
      }) || [],
  }));

  const textItems = programs
    .map(
      (program) =>
        program.nextOptions
          ?.filter((option) => option._type === "textNode")
          .map<
            ComponentProps<typeof Flow>["items"][number]
          >((option) => ({ id: option._key, type: "text", data: { label: option.content || "" }, nextItemIDs: [] })) ||
        [],
    )
    .flat();

  return <Flow items={[...programItems, ...textItems]} {...props} />;
};
