import { groq } from "next-sanity";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { sanityFetch } from "~/sanity/lib/client";
import { notFound } from "next/navigation";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import {
  ProgramTypeContentQueryResult,
  ProgramTypePageProgramsQueryResult,
  ProgramTypePageQueryResult,
} from "../../../../../../../generated/sanity/types";
import { BentoCTA } from "~/app/_components/blocks/bento-cta";
import { BasicAccordion } from "~/app/_components/compounds/basic-accordion";
import { EducationalProgramTypeCards } from "~/app/_components/blocks/educational-program-type-cards";
import Link from "next/link";
import { createColorThemeStyles, ensureValidHSL } from "~/app/_utils/color-swatch";
import { Section } from "~/app/_components/primitives/section";
import { LinkCardCollection } from "~/app/_components/primitives/link-card-collection";
import {
  LinkCard,
  LinkCardContent,
  LinkCardLabel,
  LinkCardSubtitle,
  LinkCardTitle,
} from "~/app/_components/primitives/link-card";
import { InteractionBubble } from "~/app/_components/compounds/interaction-bubble";
import { IconChip } from "~/app/_components/primitives/icon-chip";
import { ArrowDown, ArrowRightIcon, BadgeIcon, CheckIcon } from "lucide-react";
import { Chip } from "~/app/_components/primitives/chip";
import { mapRange } from "~/app/_utils/map-range";
import { Card } from "~/app/_components/primitives/card";
import { GradientStrokeIcon } from "~/app/_components/primitives/gradient-stroke-icon";
import { GradientStroke } from "~/app/_components/primitives/gradient-stroke";
import { StackedImageCard } from "~/app/_components/compounds/stacked-image-card";

// const programTypePageSlugsQuery = groq`*[_type == "educational-program-type"]{ slug }`;

const programTypePageQuery = groq`*[_type == "educational-program-type-page"][0]`;

const programTypeContentQuery = groq`*[_type == "educational-program-type" && slug.current == $slug][0]{
  ...,
  certificate {
    ...,
    jobs[] {
      ...,
      image { alt, asset -> { url } }
    }
  },
  followUpProgramTypes {
    ...,
    programTypes[] -> {
      slug,
      name,
      slogan,
      color
    }
  },
}`;

const programTypePageProgramsQuery = groq`*[_type == "educational-program" && educationalProgramType -> slug.current == $programTypeSlug] | order(order asc) {
  _id,
  slug,
  name,
  slogan,
  highlights[] {
    heading,
    image { alt, asset -> { url } }
  }
}`;

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

  const programTypePagePromise = sanityFetch<ProgramTypePageQueryResult>(programTypePageQuery, {
    params: { slug },
    tags: ["educational-program-type-page"],
  });

  const programTypePromise = sanityFetch<ProgramTypeContentQueryResult>(programTypeContentQuery, {
    params: { slug },
    tags: ["educational-program-type"],
  });

  const programsPromise = sanityFetch<ProgramTypePageProgramsQueryResult>(programTypePageProgramsQuery, {
    params: { programTypeSlug: slug },
    tags: ["educational-program-type", "educational-program"],
  });

  const [programTypePage, programType, programs] = await Promise.all([
    programTypePagePromise,
    programTypePromise,
    programsPromise,
  ]);

  if (!programType) notFound();

  return (
    <div style={createColorThemeStyles(ensureValidHSL(programType.color?.hsl))}>
      <div className="bg-neutral-200 pt-header">
        <Container className="py-32 text-center" width="narrow">
          <div className="mx-auto w-fit rounded-full border border-neutral-400/20 bg-themed-secondary px-4 py-2 shadow">
            <Label className="mb-0 text-primary-900">{programType.name}</Label>
          </div>
          <Heading tag="h2" className="mt-8">
            {programType.slogan}
          </Heading>
          <Paragraph>{programType.teaser}</Paragraph>
        </Container>
      </div>

      <Section className="overflow-hidden bg-primary-900">
        <Container className="flex flex-col pb-8 xl:flex-row xl:items-end xl:pb-0">
          <div className="flex-[0_0_50%] pb-16 pt-32 xl:pb-48 xl:pr-24">
            <IconChip className="bg-primary-100x bg-themed-primary text-primary-100-text">
              <BadgeIcon />
            </IconChip>
            <div className="mt-16 max-w-[40rem]">
              <Heading className="text-neutral-900-text">{programType.certificate?.heading}</Heading>
              <Paragraph className="text-neutral-900-text-muted">{programType.certificate?.description}</Paragraph>
            </div>
            <div className="relative mt-12 flex flex-wrap gap-4">
              <div className="absolute bottom-0 top-0 z-10 w-full bg-gradient-to-b from-transparent to-primary-900/90" />
              {programType.certificate?.qualifications?.map((label, index, array) => (
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
                <Heading size="sm" className="mt-16 text-neutral-900-text">
                  {programType.followUpProgramTypes?.heading}
                </Heading>
                <Paragraph className="text-neutral-900-text-muted">
                  {programType.followUpProgramTypes?.description}
                </Paragraph>
              </div>
              <LinkCardCollection className="mt-2 sm:mt-12">
                {programType?.followUpProgramTypes?.programTypes?.map((followUpProgramType, index) => (
                  <Link
                    key={index}
                    href={`/bildungswege/${followUpProgramType.slug?.current}`}
                    className="!min-w-[min(24rem,100%)]"
                  >
                    <LinkCard
                      style={createColorThemeStyles(ensureValidHSL(followUpProgramType.color?.hsl))}
                      className="border-none bg-themed-primary p-4 hover:bg-themed-secondary"
                    >
                      <InteractionBubble animated={false} />
                      <LinkCardContent>
                        <LinkCardTitle>{followUpProgramType.name}</LinkCardTitle>
                        <LinkCardSubtitle>{followUpProgramType.slogan}</LinkCardSubtitle>
                      </LinkCardContent>
                    </LinkCard>
                  </Link>
                ))}
              </LinkCardCollection>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-neutral-200">
        <div className="pb-4 pt-24 sm:py-24">
          <GradientStrokeIcon>
            <GradientStroke />
            <IconChip>
              <ArrowDown />
            </IconChip>
          </GradientStrokeIcon>
          <Container width="narrow" className="mt-16 text-center">
            <Heading>{programType.educationalPrograms?.heading}</Heading>
            <Paragraph>{programType.educationalPrograms?.introduction}</Paragraph>
          </Container>
          <Container className="mt-16">
            <LinkCardCollection className="justify-center">
              {programs.map((program) => (
                <Link
                  key={program._id}
                  href={`/bildungswege/${programType.slug?.current}/${program.slug?.current}`}
                  className="max-w-[30rem]"
                >
                  <Card className="group h-full rounded-3xl border-none bg-themed-primary p-2 transition-colors hover:bg-themed-secondary">
                    <StackedImageCard
                      className="relative aspect-video overflow-hidden rounded-2xl bg-neutral-100/20 text-themed-primary"
                      images={
                        program.highlights?.map((highlight) => ({
                          url: highlight.image?.asset?.url || "",
                          alt: highlight.heading || "",
                        })) || []
                      }
                    />
                    <div className="flex items-center gap-4 p-6">
                      <LinkCardContent className="">
                        <LinkCardLabel>{programType.name}</LinkCardLabel>
                        <LinkCardTitle>{program.name}</LinkCardTitle>
                        <LinkCardSubtitle>{program.slogan}</LinkCardSubtitle>
                      </LinkCardContent>
                      <InteractionBubble animated={false} />
                    </div>
                  </Card>
                </Link>
              ))}
            </LinkCardCollection>
          </Container>
        </div>
      </Section>

      <Section connect="top" className="bg-neutral-100">
        <Container width="narrow" className="pb-24 pt-64">
          <Heading className="text-center">{programTypePage?.faqHeading}</Heading>
          <BasicAccordion
            className="mt-16"
            items={
              programType.faq?.items?.map((item) => ({ title: item.question || "", content: item.answer || "" })) || []
            }
          />
        </Container>

        <Container width="narrow" className="mt-40 text-center">
          <Heading className="">{programTypePage?.alternativesHeading}</Heading>
          <Paragraph className="">{programType.alternativesIntroduction}</Paragraph>
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
