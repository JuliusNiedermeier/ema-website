import { groq } from "next-sanity";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { sanityFetch } from "~/sanity/lib/client";
import { notFound } from "next/navigation";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { Card } from "~/app/_components/primitives/card";
import { CheckIcon, ChevronDownIcon, ChevronRightIcon, PlusIcon, SparkleIcon } from "lucide-react";
import { BentoCTA } from "~/app/_components/blocks/bento-cta";
import { cn } from "~/app/_utils/cn";
import { TestimonialCarousel } from "~/app/_components/blocks/testimonial-carousel";
import { BasicAccordion } from "~/app/_components/compounds/basic-accordion";
import { Certificate } from "~/app/_components/compounds/certificate";
import { RequirementList } from "~/app/_components/compounds/requirement-list";
import {
  ProgramPageContentQueryResult,
  ProgramPageQueryResult,
  ProgramPageSlugsQueryResult,
} from "../../../../../../../../generated/sanity/types";
import { createColorThemeStyles, ensureValidHSL } from "~/app/_utils/color-swatch";
import Image from "next/image";
import { IconList, IconListItem, IconListItemIcon } from "~/app/_components/primitives/icon-list";
import { EducationalProgramDetails } from "~/app/_components/compounds/educational-program-details";
import { GenericCTA } from "~/app/_components/compounds/generic-cta";
import { Button } from "~/app/_components/primitives/button";
import { InteractionBubble } from "~/app/_components/compounds/interaction-bubble";
import Link from "next/link";
import { EndOfPageCTA } from "~/app/_components/compounds/end-of-page-cta";
import { Section } from "~/app/_components/primitives/section";
import { IconChip } from "~/app/_components/primitives/icon-chip";
import { GradientStroke } from "~/app/_components/primitives/gradient-stroke";
import { GradientStrokeIcon } from "~/app/_components/primitives/gradient-stroke-icon";
import { LinkCardCollection } from "~/app/_components/primitives/link-card-collection";
import {
  LinkCard,
  LinkCardContent,
  LinkCardLabel,
  LinkCardSubtitle,
  LinkCardTitle,
} from "~/app/_components/primitives/link-card";
import { ProgramGrid } from "~/app/_components/blocks/program-grid";

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
  },
  subjects[] ->
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
    tags: ["educational-program", "educational-program-type", "subject"],
  });

  const programPage = await sanityFetch<ProgramPageQueryResult>(programPageQuery, {
    tags: ["educational-program-page"],
  });

  if (!program || !programPage) notFound();

  return (
    <div style={createColorThemeStyles(ensureValidHSL(program.educationalProgramType?.color?.hsl))}>
      <div className="bg-neutral-200 pb-32 pt-header">
        <Container className="pt-20 text-center" width="narrow">
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-neutral-400/20 bg-themed-secondary px-4 py-2 shadow">
            <Label className="mb-0 text-primary-900">{program.educationalProgramType?.name}</Label>
            <ChevronRightIcon size="14" />
            <Label className="mb-0 text-primary-900">{program.name}</Label>
          </div>
          <Heading tag="h2" className="mt-8">
            {program.promotionalHeadline}
          </Heading>
          <Paragraph>{program.introduction}</Paragraph>
        </Container>
      </div>

      <Section connect="both" className="bg-themed-primary">
        <Container className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-2 py-3 sm:gap-4 sm:py-24">
          {program.highlights?.map((highlight) => (
            <Card
              key={highlight._key}
              className="rounded-3xl border border-neutral-400/20 bg-themed-secondary p-2 shadow"
            >
              <div className="p-6">
                <div className="w-min rounded-full bg-primary-900 p-4">
                  <PlusIcon className="text-primary-900-text" />
                </div>
                <Heading size="sm" tag="h3">
                  {highlight.heading}
                </Heading>
                <Paragraph>{highlight.content}</Paragraph>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow sm:aspect-video">
                <Image
                  src="/campus.png"
                  height="500"
                  width="500"
                  alt=""
                  className="absolute left-0 top-0 h-full w-full object-cover"
                />
              </div>
            </Card>
          ))}
        </Container>
      </Section>

      <Section connect="both" className="bg-neutral-100">
        <Container className="pb-24 pt-3 sm:pt-24">
          <Certificate
            className="rounded-t-3xl sm:rounded-t-2xl"
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
                <Heading>{programPage.subjects?.heading}</Heading>
                <Paragraph>{programPage.subjects?.description}</Paragraph>
              </Card>

              <Card className="-mb-8 border border-themed-secondary/50 bg-themed-secondary/20 pb-16">
                <IconList>
                  {program.subjects
                    ?.filter((subject) => !subject.isLearningField)
                    .map((subject, index) => (
                      <IconListItem key={index}>
                        <CheckIcon />
                        <Label>{subject.name}</Label>
                      </IconListItem>
                    ))}
                </IconList>
              </Card>

              <Card className="flex-1 rounded-2xl rounded-b-none bg-themed-primary">
                <div className="flex items-center gap-4">
                  <SparkleIcon />
                  <Heading size="sm">{programPage.subjects?.learningFieldsHeading}</Heading>
                </div>
                <IconList>
                  {program.subjects
                    ?.filter((subject) => subject.isLearningField)
                    .map((subject, index) => (
                      <IconListItem key={index}>
                        <IconListItemIcon>
                          <CheckIcon />
                        </IconListItemIcon>
                        <Label>{subject.name}</Label>
                      </IconListItem>
                    ))}
                </IconList>
              </Card>
            </Card>
          </div>
        </Container>
      </Section>

      {program.showExternalCTA && (
        <Section connect="both" className="bg-primary-900">
          <Container className="py-24 md:py-48">
            <GenericCTA
              className="p-0 md:p-0"
              preHeading={program.externalCTA?.preHeading || ""}
              mainheading={program.externalCTA?.mainHeading || ""}
              paragraph={program.externalCTA?.paragraph || ""}
              ctaText={program.externalCTA?.ctaText || ""}
              imageURL={program.externalCTA?.image?.asset?.url || ""}
            />
          </Container>
        </Section>
      )}

      {program.followUpTrainingEnabled && (
        <Section connect="both" className="bg-neutral-300">
          <Container width="narrow" className="py-24 sm:py-48">
            <div className="text-center">
              <Heading>{program.followUpTraining?.heading}</Heading>
              <Paragraph>{program.followUpTraining?.description}</Paragraph>
            </div>
            <GradientStrokeIcon>
              <GradientStroke />
              <IconChip>
                <ChevronDownIcon />
              </IconChip>
            </GradientStrokeIcon>
            <LinkCardCollection className="mt-24 justify-center">
              <Link
                href={`/bildungswege/${program.followUpTraining?.educationalProgram?.educationalProgramType?.slug?.current}/${program.followUpTraining?.educationalProgram?.slug?.current}`}
                className="!min-w-[min(24rem,100%)] !flex-grow-0"
              >
                <LinkCard
                  style={createColorThemeStyles(
                    ensureValidHSL(program.followUpTraining?.educationalProgram?.educationalProgramType?.color?.hsl),
                  )}
                  className="bg-themed-primary hover:bg-themed-secondary"
                >
                  <InteractionBubble animated={false} />
                  <LinkCardContent>
                    <LinkCardLabel>
                      {program.followUpTraining?.educationalProgram?.educationalProgramType?.name}
                    </LinkCardLabel>
                    <LinkCardTitle>{program.followUpTraining?.educationalProgram?.name}</LinkCardTitle>
                    <LinkCardSubtitle>
                      {program.followUpTraining?.educationalProgram?.promotionalHeadline}
                    </LinkCardSubtitle>
                  </LinkCardContent>
                </LinkCard>
              </Link>
            </LinkCardCollection>
          </Container>
        </Section>
      )}

      <Section className="bg-themed-primary">
        <Container className="py-24 sm:py-48">
          <Container width="narrow" className="text-balance text-center">
            <Heading>{program.furtherInformationIntro?.heading}</Heading>
            <Paragraph>{program.furtherInformationIntro?.description}</Paragraph>
            <div className="flex flex-col items-center">
              <div className="h-24 w-px bg-gradient-to-b from-transparent to-primary-900" />
              <IconChip>
                <ChevronDownIcon />
              </IconChip>
            </div>
          </Container>
          <div className={cn("mt-24 flex flex-col gap-8 sm:gap-12", { "": !program.followUpTrainingEnabled })}>
            {program.furtherInformation?.map((item, index) => (
              <div
                key={index}
                className={cn("flex flex-col items-stretch gap-8 sm:flex-row sm:gap-12", {
                  "sm:flex-row-reverse": index % 2 !== 0,
                })}
              >
                <div className="relative aspect-square w-full sm:aspect-auto sm:flex-1">
                  <Image
                    className="absolute left-0 top-0 h-full w-full rounded-3xl object-cover"
                    src={item.image?.asset?.url || ""}
                    alt={item.heading || ""}
                    width="500"
                    height="500"
                  />
                </div>
                <Card className="rounded-3xl border border-neutral-400/20 bg-themed-secondary sm:flex-[1.2]">
                  <Heading tag="h3">{item.heading}</Heading>
                  <Paragraph>{item.content}</Paragraph>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-neutral-300">
        <Container width="narrow" className="py-24 text-center sm:py-48">
          <Heading tag="h3">{programPage.prerequisites?.heading}</Heading>
          <Paragraph className="">{program.prerequisites?.description}</Paragraph>
          <RequirementList
            className="mt-16"
            seperatorLabel={programPage.prerequisites?.orLabel || ""}
            groups={program.prerequisites?.requirementGroups?.map(({ requirements }) => requirements || []) || []}
          />

          <Card className="mt-24 flex flex-col items-stretch gap-2 rounded-3xl border bg-neutral-100 p-2 md:flex-row">
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
      </Section>

      <Section className="-mb-2 bg-neutral-100">
        <Container className="pt-24 sm:pt-48">
          <Container width="narrow" className="text-balance text-center">
            <Heading className="mx-auto max-w-80 sm:max-w-none">{program.testimonials?.heading}</Heading>
            <Paragraph>{program.testimonials?.subheading}</Paragraph>
          </Container>
          <TestimonialCarousel className="mt-16" />
        </Container>

        <Container className="mt-48 sm:mt-64" width="narrow">
          <Heading className="text-center">{program.FAQs?.heading}</Heading>
          <Paragraph>{program.FAQs?.subheading}</Paragraph>
          <div className="mt-16">
            <BasicAccordion
              items={
                program.FAQs?.faq?.map(({ question, answer }) => ({
                  title: question || "",
                  content: answer || "",
                })) || []
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
          <Container>
            <ProgramGrid />
          </Container>
        </EndOfPageCTA>
      </Section>
    </div>
  );
};

export default EducationalProgramPage;
