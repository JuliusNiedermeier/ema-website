import { groq } from "next-sanity";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { sanityFetch } from "~/sanity/lib/client";
import { notFound } from "next/navigation";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { Card } from "~/app/_components/primitives/card";
import {
  ArrowDownIcon,
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
import { LinkCard, LinkCardContent, LinkCardLabel, LinkCardTitle } from "~/app/_components/primitives/link-card";
import { ProgramGrid } from "~/app/_components/blocks/program-grid";
import { ComparisonTeaserCard } from "~/app/_components/blocks/comparison-teaser-card";
import { Chip } from "~/app/_components/primitives/chip";

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
  followUpPrograms {
    ...,
    programs[] -> {
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

      <Section className="bg-neutral-400">
        <div className="py-24">
          <Container className="" width="narrow">
            <GradientStrokeIcon>
              <GradientStroke />
              <IconChip>
                <BadgeIcon />
              </IconChip>
            </GradientStrokeIcon>
            <div className="mt-8 text-center">
              <Heading>Du wirst Staatlich Anerkannter Sozialassistent</Heading>
              <Paragraph className="mt-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere perspiciatis quae commodi cum adipisci
                cupiditate animi praesentium veritatis! Dolorem officia nemo distinctio corporis. Quae consectetur
                pariatur recusandae commodi natus aliquid!
              </Paragraph>
            </div>
          </Container>

          <Container className="mt-12 flex flex-wrap justify-center gap-4">
            {Array.from(new Array(10)).map((_, index) => (
              <Chip key={index} className="bg-neutral-100 p-2 pr-6">
                <div className="rounded-full bg-primary-900 p-2 text-neutral-100">
                  <CheckIcon />
                </div>
                <Label>Studium</Label>
              </Chip>
            ))}
          </Container>
        </div>
      </Section>

      {program.followUpPrograms?.programs && (
        <Section className="bg-neutral-300">
          <IconChip className="mx-auto -translate-y-1/2">
            <PlusIcon />
          </IconChip>
          <div className="pb-4 pt-24 sm:py-24">
            <Container width="narrow">
              <div className="text-center">
                <Heading>Qualifiziere dich für das Fachabitur!</Heading>
                <Paragraph>Du kannst im Anschluss dein Fachabi bei uns machen.</Paragraph>
              </div>
            </Container>
            <Container>
              <LinkCardCollection className="mt-16 justify-center">
                {program.followUpPrograms.programs.map((followUpProgram, index) => (
                  <Link
                    key={index}
                    href={`/bildungswege/${followUpProgram.educationalProgramType?.slug?.current}/${followUpProgram.slug?.current}`}
                    className="!min-w-[min(24rem,100%)] !flex-grow-0"
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
            </Container>
          </div>
        </Section>
      )}

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
              <Heading>Das erwartet dich</Heading>
              <Paragraph>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores doloremque architecto voluptatibus
                quisquam modi earum tempore error a cum, officiis quis mollitia dignissimos sapiente qui deleniti
                aspernatur quibusdam dolores quod.
              </Paragraph>
            </div>
          </Container>
          <Container className="mt-24">
            <div className="flex flex-col gap-4 md:flex-row">
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
        </div>
      </Section>

      {program.showExternalCTA && (
        <Section connect="both" className="bg-neutral-300">
          <Container className="py-4 sm:py-24">
            <GenericCTA
              className=""
              preHeading={program.externalCTA?.preHeading || ""}
              mainheading={program.externalCTA?.mainHeading || ""}
              paragraph={program.externalCTA?.paragraph || ""}
              ctaText={program.externalCTA?.ctaText || ""}
              imageURL={program.externalCTA?.image?.asset?.url || ""}
            />
          </Container>
        </Section>
      )}

      <Section className="bg-themed-primary ring-0">
        <Container className="py-4 sm:py-24">
          {/* <Container width="narrow" className="text-balance text-center">
            <Heading>{program.furtherInformationIntro?.heading}</Heading>
            <Paragraph>{program.furtherInformationIntro?.description}</Paragraph>
            <div className="flex flex-col items-center">
              <div className="h-24 w-px bg-gradient-to-b from-transparent to-primary-900" />
              <IconChip>
                <ChevronDownIcon />
              </IconChip>
            </div>
          </Container> */}

          <div className={cn("flex flex-col gap-8 sm:gap-24")}>
            {program.furtherInformation?.map((item, index) => (
              <div
                key={index}
                className={cn("flex flex-col items-stretch gap-8 sm:flex-row sm:gap-12", {
                  "sm:flex-row-reverse": index % 2 !== 0,
                })}
              >
                <div className="relative aspect-square w-full sm:flex-1">
                  <Image
                    className="absolute left-0 top-0 h-full w-full rounded-3xl object-cover"
                    src={item.image?.asset?.url || ""}
                    alt={item.heading || ""}
                    width="500"
                    height="500"
                  />
                </div>
                <div className="flex-1 self-center">
                  <div className="max-w-96 pb-16 sm:py-16">
                    <Heading tag="h3">{item.heading}</Heading>
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
              <ComparisonTeaserCard className="min-h-40 flex-1 bg-neutral-400" />
              <div className="flex-1 p-6 text-left">
                <Heading>{programPage.prerequisites?.checkupCTA?.heading}</Heading>
                <Paragraph>{programPage.prerequisites?.checkupCTA?.description}</Paragraph>
                <Button size="sm" className="mt-6 gap-4 pr-1">
                  <Label>{programPage.prerequisites?.checkupCTA?.linkLabel}</Label>
                  <InteractionBubble animated={false} className="bg-primary-100 text-primary-100-text" />
                </Button>
              </div>
            </Card>
          </Link>
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
          <Link href="/schulbeitrag" target="_blank">
            <LinkCard className="mt-16 p-4">
              <InteractionBubble animated={false} />
              <LinkCardContent className="flex-row items-center gap-4">
                <LinkCardLabel className="text-neutral-100-text">Schulbeiträge ansehen</LinkCardLabel>
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
