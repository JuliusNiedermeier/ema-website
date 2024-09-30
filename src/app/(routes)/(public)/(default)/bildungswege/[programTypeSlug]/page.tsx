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
import { GradientStrokeIcon } from "~/app/_components/primitives/gradient-stroke-icon";
import { GradientStroke } from "~/app/_components/primitives/gradient-stroke";
import { IconChip } from "~/app/_components/primitives/icon-chip";
import { BadgeIcon, CheckIcon, PlusIcon } from "lucide-react";
import { Chip } from "~/app/_components/primitives/chip";

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
      <div className="bg-neutral-200 pt-header">
        <Container className="py-32 text-center" width="narrow">
          <div className="mx-auto w-fit rounded-full border border-neutral-400/20 bg-themed-secondary px-4 py-2 shadow">
            <Label className="mb-0 text-primary-900">{programType.name}</Label>
          </div>
          <Heading tag="h2" className="mt-8">
            {programType.promotionalHeadline}
          </Heading>
          <Paragraph>{programType.introduction}</Paragraph>
        </Container>
      </div>

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
              {Array.from(new Array(1))
                .fill(null)
                .map((followUpProgram, index) => (
                  <Link
                    key={index}
                    href={`/bildungswege/${"-"}/${"-"}`}
                    className="!min-w-[min(24rem,100%)] !flex-grow-0"
                  >
                    <LinkCard className="border-none bg-themed-primary p-4 hover:bg-themed-secondary">
                      <InteractionBubble animated={false} />
                      <LinkCardContent>
                        <LinkCardTitle>{"Bildungsweg"}</LinkCardTitle>
                        <LinkCardSubtitle>{"Dies ist ein platzhalter text"}</LinkCardSubtitle>
                      </LinkCardContent>
                    </LinkCard>
                  </Link>
                ))}
            </LinkCardCollection>
          </Container>
        </div>
      </Section>

      <Section className="bg-neutral-200">
        <Container width="narrow" className="py-24">
          <div className="text-center">
            <Heading>{programType.educationalPrograms?.heading}</Heading>
            <Paragraph>{programType.educationalPrograms?.description}</Paragraph>
          </div>
          <LinkCardCollection className="mt-16">
            {programs.map((program) => (
              <Link key={program._id} href={`/bildungswege/${programType.slug?.current}/${program.slug?.current}`}>
                <LinkCard className="border-none bg-themed-primary hover:bg-themed-secondary">
                  <InteractionBubble animated={false} />
                  <LinkCardContent>
                    <LinkCardLabel>{programType.name}</LinkCardLabel>
                    <LinkCardTitle>{program.name}</LinkCardTitle>
                    <LinkCardSubtitle>{program.promotionalHeadline}</LinkCardSubtitle>
                  </LinkCardContent>
                </LinkCard>
              </Link>
            ))}
          </LinkCardCollection>
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
