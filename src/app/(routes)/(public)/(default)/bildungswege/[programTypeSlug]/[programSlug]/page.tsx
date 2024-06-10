import { groq } from "next-sanity";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { sanity } from "~/sanity/lib/client";
import { notFound } from "next/navigation";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { Card } from "~/app/_components/primitives/card";
import { CheckIcon, PlusIcon, SparkleIcon, Sunrise, SunriseIcon } from "lucide-react";
import { BentoCTA } from "~/app/_components/blocks/bento-cta";
import { cn } from "~/app/_utils/cn";
import { TestimonialCarousel } from "~/app/_components/blocks/testimonial-carousel";
import { BasicAccordion } from "~/app/_components/compounds/basic-accordion";
import { Certificate } from "~/app/_components/compounds/certificate";
import { ProgramDetails } from "~/app/_components/compounds/program-details";
import { RequirementList } from "~/app/_components/compounds/requirement-list";
import { ProgramPageQueryResult, ProgramPageSlugsQueryResult } from "../../../../../../../../generated/sanity/types";
import { createColorThemeStyles, ensureValidHSL } from "~/app/_utils/color-swatch";
import Image from "next/image";
import { IconListItem } from "~/app/_components/primitives/icon-list-item";
import { EducationalProgramDetails } from "~/app/_components/compounds/educational-program-details";

const programPageSlugsQuery = groq`*[_type == "educational-program"]{ slug }`;

const programPageQuery = groq`*[_type == "educational-program" && slug.current == $slug][0]{
  ...,
  educationalProgramType->,
  certificate {
    ...,
    jobs[] {
      ...,
      image { asset -> { url } }
    }
  },
  gallery[] {
    ...,
    image { asset -> { url } }
  }
}`;

export const generateStaticParams = async () => {
  const programs = await sanity.fetch<ProgramPageSlugsQueryResult>(programPageSlugsQuery);
  const slugs = new Set<string>();
  programs.forEach(({ slug }) => slug?.current && slugs.add(slug?.current));
  return Array.from(slugs);
};

const EducationalProgramPage: FC<{ params: { programSlug: string } }> = async ({ params: { programSlug } }) => {
  const program = await sanity.fetch<ProgramPageQueryResult>(programPageQuery, {
    slug: decodeURIComponent(programSlug),
  });

  if (!program) notFound();

  return (
    <div style={createColorThemeStyles(ensureValidHSL(program.educationalProgramType?.color?.hsl))}>
      <div className="bg-neutral-200">
        <Container className="items-end justify-between gap-16 pt-16 sm:flex sm:pt-24">
          <Heading className="mb-0 text-primary-900">
            {program.educationalProgramType?.name}
            <br />
            {program.name}
          </Heading>
        </Container>
      </div>

      <div className="relative pt-4 sm:pt-8">
        <div className="absolute left-0 top-0 h-1/2 w-full bg-neutral-200"></div>
        <Container width="wide" className="relative rounded-2xl bg-themed-primary">
          <Container className="pb-[6px] pt-16 sm:pb-8 sm:pt-32">
            <div className="px-2 sm:px-0">
              <Heading tag="h2">{program.promotionalHeadline}</Heading>
              <Paragraph className="max-w-96">{program.promotionalHeadline}</Paragraph>
            </div>

            <div className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-2 sm:mt-32 sm:gap-4">
              {program.highlights?.map((highlight) => (
                <Card key={highlight._key} className="bg-themed-secondary">
                  <div className="w-min rounded-full bg-primary-900 p-4">
                    <PlusIcon className="text-primary-900-text" />
                  </div>
                  <Heading size="sm" tag="h3">
                    {highlight.heading}
                  </Heading>
                  <Paragraph>{highlight.content}</Paragraph>
                </Card>
              ))}
            </div>
          </Container>
        </Container>
      </div>

      <Container>
        <Certificate
          className="mt-32"
          heading={program.certificate?.heading || ""}
          name={program.certificate?.name || ""}
          description={program.certificate?.description || ""}
          qualifications={program.certificate?.qualifications || []}
          jobs={
            program.certificate?.jobs?.map((job) => ({
              image: job.image?.asset?.url || "",
              content: job.name || "",
            })) || []
          }
        />

        <div className="mt-8 flex flex-col gap-8 md:flex-row">
          <EducationalProgramDetails className="md:flex-[2]" />

          <Card className="flex flex-col p-4 md:flex-1 border">
            <div className="p-4">
              <Heading size="sm">Deine Fächer</Heading>
              <Paragraph>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</Paragraph>
            </div>

            <Card>
              {program.subjects
                ?.filter(({ isExamSubject }) => !isExamSubject)
                .map((subject, index) => (
                  <IconListItem key={index}>
                    <CheckIcon />
                    <Label>{subject.name}</Label>
                  </IconListItem>
                ))}
            </Card>

            <Card className="flex-1 bg-themed-primary">
              <div className="flex items-center gap-4">
                <SparkleIcon />
                <Heading size="sm">Prüfungsfächer</Heading>
              </div>
              {program.subjects
                ?.filter(({ isExamSubject }) => isExamSubject)
                .map((subject, index) => (
                  <IconListItem key={index}>
                    <CheckIcon />
                    <Label>{subject.name}</Label>
                  </IconListItem>
                ))}
            </Card>
          </Card>
        </div>

        {/* <ProgramDetails
          className="mt-32"
          details={{
            holidays: program.programDetails?.holidays || "",
            startDate: program.programDetails?.startDate || "",
            startEndTime: program.programDetails?.startEndTime || "",
            totalDuration: program.programDetails?.totalDuration || "",
            type: program.programDetails?.type || "",
          }}
        />

        <div className="mt-32 text-center">
          <Heading tag="h3">{"Deine Fächer"}</Heading>
          <Paragraph className="mx-auto max-w-[40rem]">{"Alle fächer sind sehr gut für dich."}</Paragraph>
          <RequirementList
            className="mt-16"
            groups={program.prerequisites?.groups?.map(({ items }) => items || []) || []}
          />
        </div> */}

        <div className="mt-32 flex flex-col gap-32">
          {program.gallery?.map((galleryItem, index) => (
            <div
              key={index}
              className={cn("flex flex-col items-center gap-[5vw] sm:flex-row", {
                "sm:flex-row-reverse": index % 2 !== 0,
              })}
            >
              <div className="aspect-video w-full sm:flex-1">
                <Image
                  className="h-full w-full rounded-2xl object-cover"
                  src={galleryItem.image?.asset?.url || ""}
                  alt={galleryItem.heading || ""}
                  width="500"
                  height="500"
                />
              </div>
              <div className="sm:flex-[1.25]">
                <Heading tag="h3">{galleryItem.heading}</Heading>
                <Paragraph>{galleryItem.content}</Paragraph>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center sm:mt-64">
          <Heading tag="h3">{program.prerequisites?.heading}</Heading>
          <Paragraph className="mx-auto max-w-[40rem]">{program.prerequisites?.description}</Paragraph>
          <RequirementList
            className="mt-16"
            groups={program.prerequisites?.groups?.map(({ items }) => items || []) || []}
          />
        </div>

        <div className="mt-32 sm:mt-64">
          <div className="mx-auto max-w-96 text-balance text-center">
            <Heading>{program.testimonials?.heading}</Heading>
            <Paragraph>{program.testimonials?.subheading}</Paragraph>
          </div>
          <TestimonialCarousel className="mt-16" />
        </div>
      </Container>

      <Container className="mt-64" width="narrow">
        <Heading className="text-center">{program.FAQs?.heading}</Heading>
        <Paragraph>{program.FAQs?.subheading}</Paragraph>
        <div className="mt-16">
          <BasicAccordion
            items={
              program.FAQs?.items?.map(({ question, answer }) => ({ title: question || "", content: answer || "" })) ||
              []
            }
          />
        </div>
      </Container>

      <Container>
        <div className="mt-32">
          <BentoCTA />
        </div>
      </Container>
    </div>
  );
};

export default EducationalProgramPage;
