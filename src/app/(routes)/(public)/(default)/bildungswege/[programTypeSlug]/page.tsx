import { groq } from "next-sanity";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { sanity } from "~/sanity/lib/client";
import { notFound } from "next/navigation";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import {
  ProgramTypePageProgramsQueryResult,
  ProgramTypePageQueryResult,
  ProgramTypePageSlugsQueryResult,
} from "../../../../../../../generated/sanity/types";
import { BentoCTA } from "~/app/_components/blocks/bento-cta";
import { Card } from "~/app/_components/primitives/card";
import { Certificate } from "~/app/_components/compounds/certificate";
import { BasicAccordion } from "~/app/_components/compounds/basic-accordion";
import { EducationalProgramTypeCards } from "~/app/_components/blocks/educational-program-type-cards";
import { MoveDownIcon } from "lucide-react";
import { EducationalProgramTypeCard } from "~/app/_components/compounds/educational-program-type-card";
import Link from "next/link";
import { EducationalProgramCard } from "~/app/_components/compounds/educational-program-card";
import { createColorThemeStyles, ensureValidHSL } from "~/app/_utils/color-swatch";

const programTypePageSlugsQuery = groq`*[_type == "educational-program-type"]{ slug }`;

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

export const generateStaticParams = async () => {
  const programTypes = await sanity.fetch<ProgramTypePageSlugsQueryResult>(
    programTypePageSlugsQuery,
    {},
    { next: { tags: ["educational-program-type"] } },
  );
  const slugs = new Set<string>();
  programTypes.forEach((type) => type.slug?.current && slugs.add(type.slug.current));
  return Array.from(slugs);
};

const EducationalProgramTypePage: FC<{ params: { programTypeSlug: string } }> = async ({
  params: { programTypeSlug },
}) => {
  const programTypePromise = sanity.fetch<ProgramTypePageQueryResult>(
    programTypePageQuery,
    {
      slug: decodeURIComponent(programTypeSlug),
    },
    { next: { tags: ["educational-program-type"] } },
  );

  const programsPromise = sanity.fetch<ProgramTypePageProgramsQueryResult>(
    programTypePageProgramsQuery,
    {
      programTypeSlug: decodeURIComponent(programTypeSlug),
    },
    { next: { tags: ["educational-program-type", "educational-program"] } },
  );

  const [programType, programs] = await Promise.all([programTypePromise, programsPromise]);

  if (!programType) notFound();

  return (
    <Container className="pt-16 sm:pt-24" style={createColorThemeStyles(ensureValidHSL(programType.color?.hsl))}>
      <div className="mx-auto max-w-[40rem] sm:text-center">
        <Heading size="sm">{programType.name}</Heading>
        <Heading>{programType.promotionalHeadline}</Heading>
        <Paragraph className="mt-8">{programType.introduction}</Paragraph>
      </div>

      <Certificate
        className="mt-16 border border-[gray]/50"
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

      <Container width="narrow" className="mt-60 text-center">
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
        <div className="-mt-12 rounded-3xl border bg-neutral-200 p-4 pt-16">
          <Container width="narrow" className="flex flex-col items-center gap-8 sm:flex-row">
            <div className="p-4 text-center sm:text-left">
              <Heading size="sm">{programType.followUpTraining?.heading}</Heading>
              <Paragraph>{programType.followUpTraining?.description}</Paragraph>
            </div>
            <MoveDownIcon className="shrink-0 sm:-rotate-90" />
            <Link
              href={`/bildungswege/${programType.followUpTraining?.educationalProgramType?.slug?.current}`}
              className="relative z-10 ml-4 flex-1 self-stretch"
              style={createColorThemeStyles(
                ensureValidHSL(programType.followUpTraining?.educationalProgramType?.color?.hsl),
              )}
            >
              <Card className="absolute left-0 top-0 -z-10 h-full w-full -translate-y-4 scale-x-90 bg-themed-primary opacity-30 sm:-translate-x-4 sm:translate-y-0 sm:scale-x-100 sm:scale-y-90" />
              <EducationalProgramTypeCard
                name={programType.followUpTraining?.educationalProgramType?.name || ""}
                description={programType.followUpTraining?.educationalProgramType?.promotionalHeadline || ""}
              />
            </Link>
          </Container>
        </div>
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

      <BentoCTA className="mt-4" />
    </Container>
  );
};

export default EducationalProgramTypePage;
