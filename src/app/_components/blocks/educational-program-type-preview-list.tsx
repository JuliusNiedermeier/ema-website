import { groq } from "next-sanity";
import { ComponentProps, FC } from "react";
import { sanityFetch } from "~/sanity/lib/client";
import {
  ProgramTypePreviewListProgramsQueryResult,
  ProgramTypePreviewListTypesQueryResult,
} from "../../../../generated/sanity/types";
import { EducationalProgramTypePreviewList as ClientList } from "~/app/_components/compounds/educational-program-type-preview-list";
import { ensureValidHSL } from "~/app/_utils/color-swatch";

const programTypePreviewListTypesQuery = groq`*[_type == "educational-program-type"] | order(order asc) {
  ...,
}`;

const programTypePreviewListProgramsQuery = groq`*[_type == "educational-program"] | order(order asc) {
  ...,
  educationalProgramType->{ _id }
}`;

export type EducationalProgramTypePreviewListProps = Omit<ComponentProps<typeof ClientList>, "programTypes"> & {};

export const EducationalProgramTypePreviewList: FC<EducationalProgramTypePreviewListProps> = async (props) => {
  const programTypes = await sanityFetch<ProgramTypePreviewListTypesQueryResult>(programTypePreviewListTypesQuery, {
    tags: ["educational-program-type"],
  });
  const programs = await sanityFetch<ProgramTypePreviewListProgramsQueryResult>(programTypePreviewListProgramsQuery, {
    tags: ["educational-program", "educational-program-type"],
  });

  const programTypesWithPrograms = programTypes.map<ComponentProps<typeof ClientList>["programTypes"][0]>(
    (programType) => ({
      slug: programType.slug?.current || "",
      color: ensureValidHSL(programType.color?.hsl),
      name: programType.name || "",
      heading: programType.slogan || "",
      description: programType.teaser || "",
      readMoreLabel: "Ansehen",
      programs: programs
        .filter((program) => program.educationalProgramType?._id === programType._id)
        .map((program) => ({
          slug: program.slug?.current || "",
          name: program.name || "",
          heading: program.slogan || "",
          description: program.teaser || "",
          image: { url: "placeholder", alt: "placeholder" },
        })),
    }),
  );

  return <ClientList programTypes={programTypesWithPrograms} {...props} />;
};
