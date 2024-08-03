import { groq } from "next-sanity";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { sanityFetch } from "~/sanity/lib/client";
import { notFound } from "next/navigation";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { Card } from "~/app/_components/primitives/card";
import { CheckIcon, PlusIcon, SparkleIcon } from "lucide-react";
import { BentoCTA } from "~/app/_components/blocks/bento-cta";
import { cn } from "~/app/_utils/cn";
import { TestimonialCarousel } from "~/app/_components/blocks/testimonial-carousel";
import { BasicAccordion } from "~/app/_components/compounds/basic-accordion";
import { Certificate } from "~/app/_components/compounds/certificate";
import { RequirementList } from "~/app/_components/compounds/requirement-list";
import {
  AlternateProgramsQueryResult,
  ProgramPageContentQueryResult,
  ProgramPageQueryResult,
  ProgramPageSlugsQueryResult,
} from "../../../../../../../../generated/sanity/types";
import { createColorThemeStyles, ensureValidHSL } from "~/app/_utils/color-swatch";
import Image from "next/image";
import { IconListItem } from "~/app/_components/primitives/icon-list-item";
import { EducationalProgramDetails } from "~/app/_components/compounds/educational-program-details";
import { GenericCTA } from "~/app/_components/compounds/generic-cta";
import { Button } from "~/app/_components/primitives/button";
import { InteractionBubble } from "~/app/_components/compounds/interaction-bubble";
import { FollowUpTrainingCTA } from "~/app/_components/compounds/follow-up-training-cta";
import { EducationalProgramCard } from "~/app/_components/compounds/educational-program-card";
import Link from "next/link";
import { EndOfPageCTA } from "~/app/_components/compounds/end-of-page-cta";
import { ProgressProvider } from "~/app/_components/primitives/progress-provider";
import { ScrollProgress } from "~/app/_components/primitives/scroll-progress";
import { CardCarousel, CardCarouselItem } from "~/app/_components/primitives/card-carousel";
import { ProgressBar, ProgressBarIndicator } from "~/app/_components/primitives/progress-bar";

const programPageSlugsQuery = groq`*[_type == "educational-program"]{
  slug,
  educationalProgramType -> { slug }  
}`;

const programPageQuery = groq`*[_type == "educational-program-page"][0]{
  ...,
  programDetails {
    ...,
    startDate {
      ...,
      backgroundGraphic { asset -> { url } }
    }
  },
  prerequisites {
    ...,
    checkupCTA {
      ...,
      image { asset -> { url } }
    }
  }
}`;

const programPageContentQuery = groq`*[_type == "educational-program" && slug.current == $slug][0]{
  ...,
  educationalProgramType->,
  certificate {
    ...,
    jobs[] {
      ...,
      image { asset -> { url } }
    }
  },
  furtherInformation[] {
    ...,
    image { asset -> { url } }
  },
  externalCTA {
    ...,
    image { asset -> { url } }
  },
  followUpTraining {
    ...,
    educationalProgram -> {
      slug,
      name,
      promotionalHeadline,
      educationalProgramType -> {
        slug,
        name,
        color
      }
    }
  }
}`;

const alternateProgramsQuery = groq`*[_type == "educational-program" && slug.current != $currentProgramSlug]{
  slug,
  name,
  promotionalHeadline,
  educationalProgramType -> {
    slug,
    name,
    color
  }
}`;

type Params = { programTypeSlug: string; programSlug: string };
type Props = { params: Params };

export const generateStaticParams = async () => {
  const programs = await sanityFetch<ProgramPageSlugsQueryResult>(programPageSlugsQuery, { draftMode: false });
  return programs
    .map((program) => ({
      programTypeSlug: program.educationalProgramType?.slug?.current || null,
      programSlug: program.slug?.current || null,
    }))
    .filter(({ programTypeSlug, programSlug }) => programTypeSlug && programSlug) as Params[];
};

const EducationalProgramPage: FC<Props> = async ({ params: { programSlug } }) => {
  const program = await sanityFetch<ProgramPageContentQueryResult>(programPageContentQuery, {
    params: { slug: decodeURIComponent(programSlug) },
    tags: ["educational-program", "educational-program-type"],
  });

  const programPage = await sanityFetch<ProgramPageQueryResult>(programPageQuery, {
    tags: ["educational-program-page"],
  });

  const alternatePrograms = await sanityFetch<AlternateProgramsQueryResult>(alternateProgramsQuery, {
    params: { currentProgramSlug: programSlug },
    tags: ["educational-program", "educational-program-type"],
  });

  if (!program || !programPage) notFound();

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

      <Container className="mt-8">
        <Certificate
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
          <EducationalProgramDetails
            className="md:flex-[2]"
            durationHeading={program.programDetails?.durationAndType?.heading || ""}
            holidaysHeading={program.programDetails?.holidays?.heading || ""}
            lessonTimesHeading={program.programDetails?.lessonTimes?.heading || ""}
            startDateHeading={program.programDetails?.startDate?.heading || ""}
            trainingType={program.programDetails?.durationAndType?.type || ""}
            duration={program.programDetails?.durationAndType?.duration || ""}
            startEndTime={[
              program.programDetails?.lessonTimes?.start || "",
              program.programDetails?.lessonTimes?.end || "",
            ]}
            holidays={program.programDetails?.holidays?.info || ""}
            startDate={program.programDetails?.startDate?.date || ""}
            applyButtonLabel={programPage.programDetails?.startDate?.applyButtonLabel || ""}
            startDateBackgroundGraphic={programPage.programDetails?.startDate?.backgroundGraphic?.asset?.url || ""}
          />

          <Card className="flex flex-col overflow-hidden border border-neutral-400 p-0 md:flex-1">
            <Card>
              <Heading>{program.subjects?.heading}</Heading>
              <Paragraph>{program.subjects?.description}</Paragraph>
            </Card>

            <Card className="-mb-8 border border-themed-secondary/50 bg-themed-secondary/20 pb-16">
              {program.subjects?.items
                ?.filter(({ isExamSubject }) => !isExamSubject)
                .map((subject, index) => (
                  <IconListItem key={index}>
                    <CheckIcon />
                    <Label>{subject.name}</Label>
                  </IconListItem>
                ))}
            </Card>

            <Card className="flex-1 rounded-2xl rounded-b-none bg-themed-primary">
              <div className="flex items-center gap-4">
                <SparkleIcon />
                <Heading size="sm">{program.subjects?.examSubjectsHeading}</Heading>
              </div>
              {program.subjects?.items
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

        {program.showExternalCTA && (
          <GenericCTA
            className="mt-32"
            preHeading={program.externalCTA?.preHeading || ""}
            mainheading={program.externalCTA?.mainHeading || ""}
            paragraph={program.externalCTA?.paragraph || ""}
            ctaText={program.externalCTA?.ctaText || ""}
            imageURL={program.externalCTA?.image?.asset?.url || ""}
          />
        )}

        {program.followUpTrainingEnabled && (
          <FollowUpTrainingCTA
            className="mt-60"
            heading={program.followUpTraining?.heading || ""}
            description={program.followUpTraining?.description || ""}
          >
            <Container
              width="narrow"
              style={createColorThemeStyles(
                ensureValidHSL(program.followUpTraining?.educationalProgram?.educationalProgramType?.color?.hsl),
              )}
            >
              <Link
                href={`/bildungswege/${program.followUpTraining?.educationalProgram?.educationalProgramType?.slug?.current}/${program.followUpTraining?.educationalProgram?.slug?.current}`}
              >
                <EducationalProgramCard
                  name={program.followUpTraining?.educationalProgram?.name || ""}
                  headline={program.followUpTraining?.educationalProgram?.promotionalHeadline || ""}
                  programType={program.followUpTraining?.educationalProgram?.educationalProgramType?.name || ""}
                />
              </Link>
            </Container>
          </FollowUpTrainingCTA>
        )}

        <div className="mt-60 flex flex-col gap-32">
          {program.furtherInformation?.map((item, index) => (
            <div
              key={index}
              className={cn("flex flex-col items-center gap-[5vw] sm:flex-row", {
                "sm:flex-row-reverse": index % 2 !== 0,
              })}
            >
              <div className="aspect-video w-full sm:flex-1">
                <Image
                  className="h-full w-full rounded-2xl object-cover"
                  src={item.image?.asset?.url || ""}
                  alt={item.heading || ""}
                  width="500"
                  height="500"
                />
              </div>
              <div className="sm:flex-[1.25]">
                <Heading tag="h3">{item.heading}</Heading>
                <Paragraph>{item.content}</Paragraph>
              </div>
            </div>
          ))}
        </div>

        <Container width="narrow" className="mt-32 text-center sm:mt-64">
          <Heading tag="h3">{programPage.prerequisites?.heading}</Heading>
          <Paragraph className="">{program.prerequisites?.description}</Paragraph>
          <RequirementList
            className="mt-16"
            seperatorLabel={programPage.prerequisites?.orLabel || ""}
            groups={program.prerequisites?.requirementGroups?.map(({ requirements }) => requirements || []) || []}
          />

          <Card className="mt-24 flex flex-col items-stretch gap-2 rounded-3xl border bg-transparent p-2 md:flex-row">
            <div className="relative min-h-40 flex-1">
              <Image
                src={programPage.prerequisites?.checkupCTA?.image?.asset?.url || ""}
                alt={programPage.prerequisites?.checkupCTA?.heading || ""}
                height="500"
                width="500"
                className="absolute left-0 top-0 h-full w-full rounded-2xl object-cover object-right"
              />
            </div>
            <div className="flex-1 p-6 text-left">
              <Heading>{programPage.prerequisites?.checkupCTA?.heading}</Heading>
              <Paragraph>{programPage.prerequisites?.checkupCTA?.description}</Paragraph>
              <Button href="/checkup" size="sm" className="mt-6 gap-4 pr-1">
                <Label>{programPage.prerequisites?.checkupCTA?.linkLabel}</Label>
                <InteractionBubble animated={false} className="bg-primary-100 text-primary-100-text" />
              </Button>
            </div>
          </Card>
        </Container>

        <Container width="narrow" className="mt-32 text-balance text-center sm:mt-64">
          <Heading>{program.testimonials?.heading}</Heading>
          <Paragraph>{program.testimonials?.subheading}</Paragraph>
        </Container>
        <TestimonialCarousel className="mt-16" />
      </Container>

      <Container className="mt-64" width="narrow">
        <Heading className="text-center">{program.FAQs?.heading}</Heading>
        <Paragraph>{program.FAQs?.subheading}</Paragraph>
        <div className="mt-16">
          <BasicAccordion
            items={
              program.FAQs?.faq?.map(({ question, answer }) => ({ title: question || "", content: answer || "" })) || []
            }
          />
        </div>
      </Container>

      <Container>
        <div className="mt-32">
          <BentoCTA />
        </div>
      </Container>

      <EndOfPageCTA
        className="mt-12"
        heading={program.alternatives?.heading || ""}
        description={program.alternatives?.description || ""}
      >
        <ProgressProvider>
          <Container>
            <ScrollProgress className="scrollbar-none items-stretch overflow-x-auto" asChild>
              <CardCarousel>
                {alternatePrograms.map((program, index) => (
                  <CardCarouselItem key={index} asChild>
                    <Link
                      href={`/bildungswege/${program.educationalProgramType?.slug?.current}/${program.slug?.current}`}
                    >
                      <EducationalProgramCard
                        className="h-full"
                        style={{
                          ...createColorThemeStyles(ensureValidHSL(program.educationalProgramType?.color?.hsl)),
                        }}
                        programType={program.educationalProgramType?.name || ""}
                        name={program.name || ""}
                        headline={program.promotionalHeadline || ""}
                      />
                    </Link>
                  </CardCarouselItem>
                ))}
              </CardCarousel>
            </ScrollProgress>
            <ProgressBar className="mx-8 mt-4">
              <ProgressBarIndicator />
            </ProgressBar>
          </Container>
        </ProgressProvider>
      </EndOfPageCTA>
    </div>
  );
};

export default EducationalProgramPage;
