import { groq } from "next-sanity";
import { ComponentProps, FC } from "react";
import { sanityFetch } from "~/sanity/lib/client";
import {
  ProgramTypePreviewListProgramsQueryResult,
  ProgramTypePreviewListTypesQueryResult,
} from "../../../../generated/sanity/types";
import { EducationalProgramTypePreviewList as ClientList } from "~/app/_components/compounds/educational-program-type-preview-list";
import { ensureValidHSL } from "~/app/_utils/color-swatch";

const programTypePreviewListTypesQuery = groq`*[_type == "educational-program-type"]{
  ...,
}`;

const programTypePreviewListProgramsQuery = groq`*[_type == "educational-program"]{
  ...,
  coverImage { alt, asset -> { url } },
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
      heading: programType.promotionalHeadline || "",
      description: programType.introduction || "",
      readMoreLabel: programType.readMoreLabel || "",
      programs: programs
        .filter((program) => program.educationalProgramType?._id === programType._id)
        .map((program) => ({
          slug: program.slug?.current || "",
          name: program.name || "",
          heading: program.promotionalHeadline || "",
          description: program.introduction || "",
          image: { url: program.coverImage?.asset?.url || "", alt: program.coverImage?.alt || "" },
        })),
    }),
  );

  return <ClientList programTypes={programTypesWithPrograms} {...props} />;
};
