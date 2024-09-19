import { groq } from "next-sanity";
import { ComponentProps, FC } from "react";
import { sanityFetch } from "~/sanity/lib/client";
import { ProgramPreviewListQueryResult } from "../../../../generated/sanity/types";
import { EducationalProgramPreviewList as ClientList } from "~/app/_components/compounds/educational-program-preview-list";
import { ensureValidHSL } from "~/app/_utils/color-swatch";

const programPreviewListQuery = groq`*[_type == "educational-program-type"]{
  _id,
  slug,
  name,
  color,
  readMoreLabel,
  "programs": *[_type == "educational-program" && educationalProgramType._ref == ^._id] {
    slug,
    name,
    promotionalHeadline,
    introduction,
    coverImage { asset -> { url } },
  }
}`;

export type EducationalProgramPreviewListProps = Omit<ComponentProps<typeof ClientList>, "programs"> & {};

export const EducationalProgramPreviewList: FC<EducationalProgramPreviewListProps> = async (props) => {
  const programTypes = await sanityFetch<ProgramPreviewListQueryResult>(programPreviewListQuery, {
    tags: ["educational-program", "educational-program-type"],
  });

  const programs = programTypes
    .map((programType) =>
      programType.programs.map<ComponentProps<typeof ClientList>["programs"][number]>((program) => ({
        slug: program.slug?.current || "",
        name: program.name || "",
        heading: program.promotionalHeadline || "",
        description: program.introduction || "",
        imageURL: program.coverImage?.asset?.url || "",
        readMoreLabel: "Ansehen",
        programType: {
          slug: programType.slug?.current || "",
          name: programType.name || "",
          color: ensureValidHSL(programType.color?.hsl),
          readMoreLabel: programType.readMoreLabel || "",
        },
      })),
    )
    .flat();

  return <ClientList programs={programs} {...props} />;
};
