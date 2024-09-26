import { groq } from "next-sanity";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { sanityFetch } from "~/sanity/lib/client";
import { notFound } from "next/navigation";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import {
  ProgramTypePageProgramsQueryResult,
  ProgramTypePageQueryResult,
} from "../../../../../../../generated/sanity/types";
import { BentoCTA } from "~/app/_components/blocks/bento-cta";
import { Certificate } from "~/app/_components/compounds/certificate";
import { BasicAccordion } from "~/app/_components/compounds/basic-accordion";
import { EducationalProgramTypeCards } from "~/app/_components/blocks/educational-program-type-cards";
import Link from "next/link";
import { EducationalProgramCard } from "~/app/_components/compounds/educational-program-card";
import { createColorThemeStyles, ensureValidHSL } from "~/app/_utils/color-swatch";
import { Section } from "~/app/_components/primitives/section";
import Image from "next/image";

// const programTypePageSlugsQuery = groq`*[_type == "educational-program-type"]{ slug }`;

const programTypePageQuery = groq`*[_type == "educational-program-type" && slug.current == $slug][0]{
  ...,
  certificate {
    ...,
    jobs[] {
      ...,
      image { asset -> { url } }
    }
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
      <div className="bg-neutral-200 pb-32 pt-header">
        <Container className="pt-20 text-center" width="narrow">
          <div className="mx-auto w-fit rounded-full border border-neutral-400/20 bg-themed-secondary px-4 py-2 shadow">
            <Label className="mb-0 text-primary-900">{programType.name}</Label>
          </div>
          <Heading tag="h2" className="mt-8">
            {programType.promotionalHeadline}
          </Heading>
          <Paragraph>{programType.introduction}</Paragraph>
        </Container>
      </div>

      <Section className="bg-themed-primary">
        <Container className="py-24">
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
      </Section>

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
      </Container>

      <Section connect="bottom" className="mt-24 bg-primary-900">
        <Container className="flex items-center gap-24 py-24">
          <div className="flex-1 text-neutral-900-text">
            <Heading>Dein Weg zum Studium</Heading>
            <Paragraph>
              Verbinde Berufsfachschule und Fachoberschule und erreiche dein Abitur in nur einem Jahr. Verbinde
              Berufsfachschule und Fachoberschule und erreiche dein Abitur in nur einem Jahr.
            </Paragraph>
          </div>
          <div className="relative min-h-96 flex-1">
            <Image
              src="/overview.svg"
              alt="Übersicht"
              fill
              className="absolute left-0 top-0 h-full w-full object-contain"
            />
          </div>
        </Container>
      </Section>

      <Section connect="top" className="bg-neutral-100">
        <Container width="narrow" className="pb-24 pt-64">
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

        <Container width="narrow">
          <EducationalProgramTypeCards className="mt-16" filter={{ excludeSlugs: [programType.slug?.current || ""] }} />
        </Container>

        <Container>
          <BentoCTA className="mt-24" />
        </Container>
      </Section>
    </div>
  );
};

export default EducationalProgramTypePage;
