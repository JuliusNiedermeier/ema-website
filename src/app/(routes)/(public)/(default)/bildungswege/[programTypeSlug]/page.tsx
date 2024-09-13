import { groq } from "next-sanity";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { sanityFetch } from "~/sanity/lib/client";
import { notFound } from "next/navigation";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import {
  ProgramTypePageProgramsQueryResult,
  ProgramTypePageQueryResult,
  // ProgramTypePageSlugsQueryResult,
} from "../../../../../../../generated/sanity/types";
import { BentoCTA } from "~/app/_components/blocks/bento-cta";
import { Certificate } from "~/app/_components/compounds/certificate";
import { BasicAccordion } from "~/app/_components/compounds/basic-accordion";
import { EducationalProgramTypeCards } from "~/app/_components/blocks/educational-program-type-cards";
import { EducationalProgramTypeCard } from "~/app/_components/compounds/educational-program-type-card";
import Link from "next/link";
import { EducationalProgramCard } from "~/app/_components/compounds/educational-program-card";
import { createColorThemeStyles, ensureValidHSL } from "~/app/_utils/color-swatch";
import { FollowUpTrainingCTA } from "~/app/_components/compounds/follow-up-training-cta";

// const programTypePageSlugsQuery = groq`*[_type == "educational-program-type"]{ slug }`;

const programTypePageQuery = groq`*[_type == "educational-program-type" && slug.current == $slug][0]{
  ...,
  certificate {
    ...,
    jobs[] {
      ...,
      image { asset -> { url } }
    }
  },
  followUpTraining {
    ...,
    educationalProgramType ->
  }
}`;

const programTypePageProgramsQuery = groq`*[_type == "educational-program" && educationalProgramType -> slug.current == $programTypeSlug]`;

type Params = { programTypeSlug: string };
type Props = { params: Params };

// export const generateStaticParams = async () => {
//   const programTypes = await sanityFetch<ProgramTypePageSlugsQueryResult>(
//     programTypePageSlugsQuery,
//     {},
//     { next: { tags: ["educational-program-type"] } },
//   );
//   const slugs = new Set<string>();
//   programTypes.forEach((type) => type.slug?.current && slugs.add(type.slug.current));
//   return Array.from(slugs).map((slug) => ({ programTypeSlug: slug }));
// };

const EducationalProgramTypePage: FC<Props> = async ({ params: { programTypeSlug } }) => {
  const slug = decodeURIComponent(programTypeSlug);

  const programTypePromise = sanityFetch<ProgramTypePageQueryResult>(programTypePageQuery, {
    params: { slug },
    tags: ["educational-program-type"],
  });

  const programsPromise = sanityFetch<ProgramTypePageProgramsQueryResult>(programTypePageProgramsQuery, {
    params: { programTypeSlug: slug },
    tags: ["educational-program-type", "educational-program"],
  });

  const [programType, programs] = await Promise.all([programTypePromise, programsPromise]);

  if (!programType) notFound();

  return (
    <div style={createColorThemeStyles(ensureValidHSL(programType.color?.hsl))}>
      <div className="pt-header bg-gradient-to-b from-neutral-200 to-neutral-100 pb-16">
        <Container className="pt-16 sm:pt-24">
          <div className="mx-auto max-w-[40rem] sm:text-center">
            <Heading size="sm">{programType.name}</Heading>
            <Heading>{programType.promotionalHeadline}</Heading>
            <Paragraph className="mt-8">{programType.introduction}</Paragraph>
          </div>
        </Container>
        <Container className="mt-24">
          <Certificate
            className="border-themed-primary"
            heading={programType.certificate?.heading || ""}
            name={programType.certificate?.name || ""}
            description={programType.certificate?.description || ""}
            qualifications={programType.certificate?.qualifications || []}
            jobs={
              programType.certificate?.jobs?.map((job) => ({
                image: job.image?.asset?.url || "",
                content: job.name || "",
              })) || []
            }
          />
        </Container>
      </div>

      <Container className="pt-16 sm:pt-64">
        <Container width="narrow" className="text-center">
          <Heading>{programType.educationalPrograms?.heading}</Heading>
          <Paragraph>{programType.educationalPrograms?.description}</Paragraph>
        </Container>

        <div className="relative mt-16 flex flex-wrap items-stretch gap-4 rounded-3xl border bg-neutral-100 p-4">
          {programs.map((program) => (
            <Link
              key={program._id}
              href={`/bildungswege/${programType.slug?.current}/${program.slug?.current}`}
              className="flex-1"
            >
              <EducationalProgramCard
                className="h-full pt-8"
                programType={programType.name || ""}
                name={program.name || ""}
                headline={program.promotionalHeadline || ""}
              />
            </Link>
          ))}
        </div>

        {programType.followUpTrainingEnabled && (
          <FollowUpTrainingCTA
            className="mt-60"
            heading={programType.followUpTraining?.heading || ""}
            description={programType.followUpTraining?.description || ""}
          >
            <Container
              width="narrow"
              style={createColorThemeStyles(
                ensureValidHSL(programType.followUpTraining?.educationalProgramType?.color?.hsl),
              )}
            >
              <Link href={`/bildungswege/${programType.followUpTraining?.educationalProgramType?.slug?.current}`}>
                <EducationalProgramTypeCard
                  name={programType.followUpTraining?.educationalProgramType?.name || ""}
                  description={programType.followUpTraining?.educationalProgramType?.promotionalHeadline || ""}
                />
              </Link>
            </Container>
          </FollowUpTrainingCTA>
        )}

        <Container width="narrow" className="mt-64">
          <Heading className="text-center">{programType.faq?.heading}</Heading>
          <BasicAccordion
            className="mt-16"
            items={
              programType.faq?.items?.map((item) => ({ title: item.question || "", content: item.answer || "" })) || []
            }
          />
        </Container>

        <Container width="narrow" className="mt-40 text-center">
          <Heading className="">{programType.alternatives?.heading}</Heading>
          <Paragraph className="">{programType.alternatives?.description}</Paragraph>
        </Container>
        <EducationalProgramTypeCards className="mt-16" filter={{ excludeSlugs: [programType.slug?.current || ""] }} />

        <BentoCTA className="mt-8" />
      </Container>
    </div>
  );
};

export default EducationalProgramTypePage;
