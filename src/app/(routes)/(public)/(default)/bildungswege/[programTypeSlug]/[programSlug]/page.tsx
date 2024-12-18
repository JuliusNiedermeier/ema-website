import { groq } from "next-sanity";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { sanityFetch } from "~/sanity/lib/client";
import { notFound } from "next/navigation";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { Card } from "~/app/_components/primitives/card";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  BadgeIcon,
  CheckIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  PlusIcon,
  SparkleIcon,
} from "lucide-react";
import { BentoCTA } from "~/app/_components/blocks/bento-cta";
import { cn } from "~/app/_utils/cn";
import { TestimonialCarousel } from "~/app/_components/blocks/testimonial-carousel";
import { BasicAccordion } from "~/app/_components/compounds/basic-accordion";
import { RequirementList } from "~/app/_components/compounds/requirement-list";
import {
  ProgramPageComparisonPreviewQueryResult,
  ProgramPageContentQueryResult,
  ProgramPageMetaQueryResult,
  ProgramPageQueryResult,
  ProgramPageSlugsQueryResult,
} from "../../../../../../../../generated/sanity/types";
import { createColorThemeStyles, ensureValidHSL } from "~/app/_utils/color-swatch";
import { IconList, IconListItem, IconListItemContent, IconListItemIcon } from "~/app/_components/primitives/icon-list";
import { EducationalProgramDetails } from "~/app/_components/compounds/educational-program-details";
import { Button } from "~/app/_components/primitives/button";
import { InteractionBubble } from "~/app/_components/compounds/interaction-bubble";
import Link from "next/link";
import { EndOfPageCTA } from "~/app/_components/compounds/end-of-page-cta";
import { Section } from "~/app/_components/primitives/section";
import { IconChip } from "~/app/_components/primitives/icon-chip";
import { GradientStroke } from "~/app/_components/primitives/gradient-stroke";
import { GradientStrokeIcon } from "~/app/_components/primitives/gradient-stroke-icon";
import { LinkCardCollection } from "~/app/_components/primitives/link-card-collection";
import { LinkCard, LinkCardContent, LinkCardLabel, LinkCardTitle } from "~/app/_components/primitives/link-card";
import { ProgramGrid } from "~/app/_components/blocks/program-grid";
import { Chip } from "~/app/_components/primitives/chip";
import { mapRange } from "~/app/_utils/map-range";
import { StackedImageCard } from "~/app/_components/compounds/stacked-image-card";
import { Metadata } from "next";
import { SanityImage } from "~/app/_components/primitives/sanity-image";

const programPageSlugsQuery = groq`*[_type == "educational-program"]{
  slug,
  educationalProgramType -> { slug }
}`;

const programPageQuery = groq`*[_type == "educational-program-page"][0]{
  ...,
  startDate {
    ...,
    backgroundGraphic
  },
  prerequisites {
    ...,
    checkupCTA {
      ...,
      image
    }
  }
}`;

const programPageContentQuery = groq`*[_type == "educational-program" && slug.current == $slug][0]{
  ...,
  educationalProgramType->,
  highlights[] {
    ...,
    image
  },
  certificate {
    ...,
    jobs[] {
      ...,
      image
    }
  },
  informationGallery[] {
    ...,
    image
  },
  highlightLink {
    ...,
    image
  },
  followUpPrograms {
    ...,
    programs[] -> {
      slug,
      name,
      slogan,
      educationalProgramType -> {
        slug,
        name,
        color
      }
    }
  },
  subjects[] ->
}`;

const programPageMetaQuery = groq`*[_type == "educational-program" && slug.current == $slug][0]{
  "title": coalesce(seo.title, ""),
  "description": coalesce(seo.description, ""),
}`;

const programPageComparisonPreviewQuery = groq`*[_type == "comparison-page"][0]{
  previewImages
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

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const data = await sanityFetch<ProgramPageMetaQueryResult>(programPageMetaQuery, {
    params: { slug: params.programTypeSlug },
    tags: ["educational-program-type"],
  });
  return { title: data?.title, description: data?.description };
};

const EducationalProgramPage: FC<Props> = async ({ params: { programSlug } }) => {
  const program = await sanityFetch<ProgramPageContentQueryResult>(programPageContentQuery, {
    params: { slug: decodeURIComponent(programSlug) },
    tags: ["educational-program", "educational-program-type", "subject"],
  });

  const programPage = await sanityFetch<ProgramPageQueryResult>(programPageQuery, {
    tags: ["educational-program-page"],
  });

  const comparisonPreview = await sanityFetch<ProgramPageComparisonPreviewQueryResult>(
    programPageComparisonPreviewQuery,
    {
      tags: ["comparison-page"],
    },
  );

  if (!program || !programPage) notFound();

  return (
    <div style={createColorThemeStyles(ensureValidHSL(program.educationalProgramType?.color?.hsl))}>
      <div className="bg-neutral-200 pt-header">
        <Container className="py-32 text-center" width="narrow">
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-neutral-400/20 bg-themed-secondary px-4 py-2 shadow">
            <Label className="mb-0 text-primary-900">{program.educationalProgramType?.name}</Label>
            <ChevronRightIcon size="14" />
            <Label className="mb-0 text-primary-900">{program.name}</Label>
          </div>
          <Heading tag="h2" className="mt-8">
            {program.slogan}
          </Heading>
          <Paragraph>{program.teaser}</Paragraph>
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
                <Heading tag="h3" size="sm">
                  {highlight.heading}
                </Heading>
                <Paragraph>{highlight.content}</Paragraph>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow sm:aspect-video">
                <SanityImage image={highlight.image} fill />
              </div>
            </Card>
          ))}
        </Container>
      </Section>

      <Section className="overflow-hidden bg-primary-900">
        <Container className="flex flex-col pb-8 xl:flex-row xl:items-end xl:pb-0">
          <div className="flex-[0_0_50%] pb-16 pt-32 xl:pb-48 xl:pr-24">
            <IconChip className="bg-primary-100x bg-themed-primary text-primary-100-text">
              <BadgeIcon />
            </IconChip>
            <div className="mt-16 max-w-[40rem]">
              <Heading tag="h2" className="text-neutral-900-text">
                {program.certificate?.heading}
              </Heading>
              <Paragraph className="text-neutral-900-text-muted">{program.certificate?.description}</Paragraph>
            </div>
            <div className="relative mt-12 flex flex-wrap gap-4">
              <div className="absolute bottom-0 top-0 z-10 w-full bg-gradient-to-b from-transparent to-primary-900/90" />
              {program.certificate?.qualifications?.map((label, index, array) => (
                <Chip
                  key={index}
                  className="flex-1 bg-neutral-100 p-2 pr-6"
                  style={{ opacity: mapRange(index, [0, array.length], [1, 0]) }}
                >
                  <div className="rounded-full bg-primary-900 p-2 text-neutral-100">
                    <CheckIcon />
                  </div>
                  <Label>{label}</Label>
                </Chip>
              ))}
            </div>
          </div>

          <div className="relative mt-auto flex-[0_0_50%] flex-col p-2 sm:p-8 xl:overflow-visible xl:pb-24 xl:pr-0">
            <div className="absolute left-0 top-0 h-full w-full rounded-3xl bg-neutral-100/10 xl:h-[calc(100%+4rem)] xl:w-[50vw] xl:rounded-none xl:rounded-tl-3xl" />
            <div className="relative">
              <div className="sm: max-w-[30rem] p-6 sm:p-0">
                <IconChip className="bg-themed-primary text-primary-100-text">
                  <ArrowRightIcon />
                </IconChip>
                <Heading tag="h3" size="sm" className="mt-16 text-neutral-900-text">
                  {program.followUpPrograms?.heading}
                </Heading>
                <Paragraph className="text-neutral-900-text-muted">{program.followUpPrograms?.description}</Paragraph>
              </div>
              <LinkCardCollection className="mt-2 sm:mt-12">
                {program?.followUpPrograms?.programs?.map((followUpProgram, index) => (
                  <Link
                    key={index}
                    href={`/bildungswege/${followUpProgram.educationalProgramType?.slug?.current}/${followUpProgram.slug?.current}`}
                    className="!min-w-[min(24rem,100%)]"
                  >
                    <LinkCard
                      style={createColorThemeStyles(ensureValidHSL(followUpProgram.educationalProgramType?.color?.hsl))}
                      className="border-none bg-themed-primary p-4 hover:bg-themed-secondary"
                    >
                      <InteractionBubble animated={false} />
                      <LinkCardContent>
                        <LinkCardLabel>{followUpProgram.educationalProgramType?.name}</LinkCardLabel>
                        <LinkCardTitle>{followUpProgram.name}</LinkCardTitle>
                      </LinkCardContent>
                    </LinkCard>
                  </Link>
                ))}
              </LinkCardCollection>
            </div>
          </div>
        </Container>
      </Section>

      <Section connect="both" className="bg-neutral-100">
        <div className="pb-4 pt-24 sm:py-24">
          <Container width="narrow">
            <GradientStrokeIcon>
              <GradientStroke />
              <IconChip>
                <ArrowDownIcon />
              </IconChip>
            </GradientStrokeIcon>
            <div className="mt-16 text-center">
              <Heading tag="h2">{programPage.detailsHeading}</Heading>
              <Paragraph>{program.detailsIntroduction}</Paragraph>
            </div>
          </Container>
          <Container className="mt-24">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex flex-col md:flex-[2]">
                <EducationalProgramDetails
                  className="flex-1"
                  durationHeading={programPage.durationAndTrainingTypeHeading || ""}
                  holidaysHeading={programPage.holidaysHeading || ""}
                  lessonTimesHeading={programPage.lessonTimesHeading || ""}
                  startDateHeading={programPage.startDate?.heading || ""}
                  trainingType={program.trainingType || ""}
                  duration={program.duration || ""}
                  startEndTime={[program.lessonTimes?.start || "", program.lessonTimes?.end || ""]}
                  holidays={program.holidays || ""}
                  startDate={program.startDate || ""}
                  applyButtonLabel={programPage.startDate?.applyButtonLabel || ""}
                  startDateBackgroundGraphic={programPage.startDate?.backgroundGraphic}
                />

                {program.showHighlightLink && (
                  <Link href={program.highlightLink?.linkURL || ""}>
                    <Card
                      className={cn(
                        "group relative mt-4 flex flex-col items-stretch gap-2 overflow-hidden rounded-3xl border border-neutral-400 bg-neutral-300 p-2 lg:flex-row-reverse",
                      )}
                    >
                      <div className="aspect-video flex-1 lg:aspect-auto lg:h-auto">
                        <SanityImage image={program.highlightLink?.image} className="rounded-2xl" fill />
                      </div>
                      <div className="py-10x pb-6x lg:py-10x max-w-[40rem] flex-[2] p-6">
                        <Label className="text-neutral-400-text">{program.highlightLink?.preHeading}</Label>
                        <Heading tag="h2" className="mt-2 text-neutral-400-text">
                          {program.highlightLink?.mainHeading}
                        </Heading>
                        <Paragraph className="mt-6 text-neutral-400-text">{program.highlightLink?.paragraph}</Paragraph>
                        <div className="mt-8 flex h-12 w-fit items-center gap-4 rounded-full bg-neutral-100 px-2 pr-6">
                          <InteractionBubble /> <Label>{program.highlightLink?.ctaText}</Label>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )}
              </div>

              <Card className="flex flex-col overflow-hidden border border-neutral-400 p-0 md:flex-1">
                <Card className="mt-auto py-12">
                  <Heading tag="h3">{programPage.subjects?.heading}</Heading>
                  <Paragraph>{programPage.subjects?.description}</Paragraph>
                </Card>

                <Card className="-mb-8 border border-themed-secondary/50 bg-themed-secondary/20 pb-16">
                  <IconList className="gap-3">
                    {program.subjects?.map((subject, index) => (
                      <IconListItem key={index} align="top">
                        <IconListItemIcon>
                          <CheckIcon />
                        </IconListItemIcon>
                        <IconListItemContent>
                          <Label className="break-all">{subject.name}</Label>
                        </IconListItemContent>
                      </IconListItem>
                    ))}
                  </IconList>
                </Card>

                <Card className="rounded-2xl rounded-b-none bg-themed-primary">
                  <div className="flex items-center gap-4">
                    <SparkleIcon />
                    <Heading tag="h3" size="sm">
                      {programPage.subjects?.learningFieldsHeading}
                    </Heading>
                  </div>
                  <IconList className="mt-4 gap-3">
                    {program.learningFields?.map((learningField, index) => (
                      <IconListItem key={index} align="top">
                        <IconListItemIcon>
                          <div className="rounded-md border border-neutral-100/10 bg-themed-secondary px-2 py-px shadow">
                            <Label className="text-small">{learningField.short}</Label>
                          </div>
                        </IconListItemIcon>
                        <IconListItemContent>
                          <Label className="break-all">{learningField.long}</Label>
                        </IconListItemContent>
                      </IconListItem>
                    ))}
                  </IconList>
                </Card>
              </Card>
            </div>
          </Container>
        </div>
      </Section>

      <Section className="bg-themed-primary ring-0">
        <Container className="py-4 sm:py-24">
          <div className={cn("flex flex-col gap-8 sm:gap-24")}>
            {program.informationGallery?.map((item, index) => (
              <div
                key={index}
                className={cn("flex flex-col items-stretch gap-8 sm:flex-row sm:gap-24", {
                  "sm:flex-row-reverse": index % 2 == 0,
                })}
              >
                <div className="relative aspect-square w-full sm:flex-1">
                  <SanityImage className="rounded-3xl" image={item.image} fill />
                </div>
                <div className="flex-1 self-center">
                  <div className="max-w-96 pb-16 sm:py-16">
                    <Heading tag="h3" size="sm" className="text-neutral-100-text-muted">
                      {item.preHeading}
                    </Heading>
                    <Heading tag="h2">{item.heading}</Heading>
                    <Paragraph>{item.content}</Paragraph>
                  </div>
                </div>
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

          <Link href="/vergleich" className="mt-24 block">
            <Card className="group flex flex-col items-stretch gap-2 rounded-3xl border bg-neutral-100 p-2 md:flex-row">
              <StackedImageCard
                className="min-h-40 flex-1 bg-neutral-400"
                images={comparisonPreview?.previewImages || []}
              />
              <div className="flex-1 p-6 text-left">
                <Heading tag="h3">{programPage.comparisonCTA?.heading}</Heading>
                <Paragraph>{programPage.comparisonCTA?.description}</Paragraph>
                <Button size="sm" className="mt-6 gap-4 pr-1">
                  <Label>{programPage.comparisonCTA?.linkLabel}</Label>
                  <InteractionBubble animated={false} className="bg-primary-100 text-primary-100-text" />
                </Button>
              </div>
            </Card>
          </Link>
        </Container>
      </Section>

      <Section className="-mb-2 bg-neutral-100">
        <Container className="pt-24 sm:pt-48">
          <Container width="narrow" className="text-center">
            <Heading tag="h2" className="mx-auto max-w-80 sm:max-w-none">
              {programPage.testimonialsHeading}
            </Heading>
            <Paragraph>{program.testimonialsIntroduction}</Paragraph>
          </Container>
          <TestimonialCarousel className="mt-16" />
        </Container>

        <Container className="mt-48 sm:mt-64" width="narrow">
          <Heading tag="h2" className="text-center">
            {programPage.faqHeading}
          </Heading>
          <Paragraph>{program.faq?.introduction}</Paragraph>
          <div className="mt-16">
            <BasicAccordion
              items={
                program.faq?.faq?.map(({ question, answer }) => ({
                  title: question || "",
                  content: answer || "",
                })) || []
              }
            />
          </div>
          <Link href="/schulbeitrag" target="_blank">
            <LinkCard className="mt-16 p-4">
              <InteractionBubble animated={false} />
              <LinkCardContent className="flex-row items-center gap-4">
                <LinkCardLabel className="text-neutral-100-text">{programPage.feesLinkLabel}</LinkCardLabel>
                <ExternalLinkIcon className="ml-auto" />
              </LinkCardContent>
            </LinkCard>
          </Link>
        </Container>

        <Container>
          <div className="mt-32">
            <BentoCTA />
          </div>
        </Container>

        <EndOfPageCTA
          className="mt-12"
          heading={programPage.alternativesHeading || ""}
          description={program.alternativesIntroduction || ""}
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
