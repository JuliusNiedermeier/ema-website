import { groq } from "next-sanity";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import {
  EducationalOfferQueryResult,
  EducationalOfferSlugsQueryResult,
} from "../../../../../../generated/sanity/types";
import { sanity } from "~/sanity/lib/client";
import { notFound } from "next/navigation";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import { Card } from "~/app/_components/primitives/card";
import { PlusIcon } from "lucide-react";
import { BentoCTA } from "~/app/_components/blocks/bento-cta";
import { cn } from "~/app/_utils/cn";
import image from "next/image";
import { TestimonialCarousel } from "~/app/_components/blocks/testimonial-carousel";
import { BasicAccordion } from "~/app/_components/compounds/basic-accordion";
import { Certificate } from "~/app/_components/compounds/certificate";
import { ProgramDetails } from "~/app/_components/compounds/program-details";
import { RequirementList } from "~/app/_components/compounds/requirement-list";

const educationalOfferSlugsQuery = groq`*[_type == "education"]{ slug }`;

const educationalOfferQuery = groq`*[_type == "education" && slug.current == $slug][0]{
  ...,
  educationPath->,
  certificate {
    ...,
    jobs[]{
      ...,
      image{asset->{url}}
    }
  }
}`;

export const generateStaticParams = async () => {
  const offers = await sanity.fetch<EducationalOfferSlugsQueryResult>(
    educationalOfferSlugsQuery,
    {},
    { next: { tags: ["education"] } },
  );
  return offers.map((offer) => ({ slug: offer.slug?.current || null })).filter((params) => params.slug) as {
    slug: string;
  }[];
};

const EducationalOffersPage: FC<{ params: { slug: string } }> = async ({ params: { slug } }) => {
  const offer = await sanity.fetch<EducationalOfferQueryResult>(
    educationalOfferQuery,
    { slug: decodeURIComponent(slug) },
    { next: { tags: ["education"] } },
  );

  if (!offer) notFound();

  return (
    <div style={{ "--themed-primary": offer.colors?.primary || "", "--themed-darker": offer.colors?.darker || "" }}>
      <div className="bg-neutral-200">
        <Container className="items-end justify-between gap-16 pt-16 sm:flex sm:pt-24">
          <Heading className="mb-0 text-primary-900">
            {offer.educationPath?.title}
            <br />
            {offer.title}
          </Heading>

          {/* <TabsList className="mt-8">
            {Object.keys(variants).map((variant) => (
              <a href={`/bildungswege/${variants[variant][0].id}`}>
                <TabsTrigger {...{ [variants[variant][0].id === offer.id ? "data-active" : ""]: "" }}>
                  {variants[variant][0].duration}
                </TabsTrigger>
              </a>
            ))}
          </TabsList> */}
        </Container>
      </div>

      <div className="relative pt-4 sm:pt-8">
        <div className="absolute left-0 top-0 h-1/2 w-full bg-neutral-200"></div>
        <Container width="wide" className="relative rounded-2xl bg-themed-primary">
          <Container className="pb-[6px] pt-16 sm:pb-8 sm:pt-32">
            <div className="px-2 sm:px-0">
              <Heading tag="h2">{offer.heading}</Heading>
              <Paragraph className="max-w-96">{offer.description}</Paragraph>
            </div>

            <div className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-2 sm:mt-32 sm:gap-4">
              {offer.highlights?.map((highlight) => (
                <Card key={highlight._key} className="bg-themed-darker">
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
          heading="Dein Abschluss"
          name={offer.certificate?.name || ""}
          description={offer.certificate?.description || ""}
          qualifications={offer.certificate?.qualifications || []}
          jobs={
            offer.certificate?.jobs?.map((job) => ({ image: job.image?.asset?.url || "", content: job.name || "" })) ||
            []
          }
          className="mt-32"
        />
        <ProgramDetails
          details={{
            holidays: offer.programDetails?.holidays || "",
            startDate: offer.programDetails?.startDate || "",
            startEndTime: offer.programDetails?.startEndTime || "",
            totalDuration: offer.programDetails?.totalDuration || "",
            type: offer.programDetails?.type || "",
          }}
        />

        {Array.from(new Array(4)).map((_, index) => (
          <div key={index} className={cn("mt-16 flex items-center gap-16", { "flex-row-reverse": index % 2 !== 0 })}>
            <div className="aspect-video flex-1">
              {/* <Image className="h-full w-full rounded-2xl object-cover" src={image} alt="" /> */}
            </div>
            <div className="flex-1">
              <Heading tag="h3">Vielfältige Lernmethoden</Heading>
              <Paragraph>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio quam doloremque recusandae pariatur
                deserunt, harum, sequi numquam soluta modi accusamus aperiam in amet earum molestiae incidunt temporibus
                nobis nesciunt doloribus.
              </Paragraph>
            </div>
          </div>
        ))}

        <div className="mt-32 text-center sm:mt-64">
          <Heading tag="h3">Was du brauchst</Heading>
          <Paragraph className="mx-auto max-w-[40rem]">{offer.prerequisites?.description}</Paragraph>
          <RequirementList
            className="mt-16"
            groups={offer.prerequisites?.groups?.map(({ items }) => items || []) || []}
          />
        </div>

        <TestimonialCarousel className="mt-32 sm:mt-64" />
      </Container>

      <Container className="mt-64" width="narrow">
        <Heading className="text-center">Häufig gestellte Fragen</Heading>
        <div className="mt-16">
          <BasicAccordion
            items={offer.FAQs?.map(({ question, answer }) => ({ title: question || "", content: answer || "" })) || []}
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

export default EducationalOffersPage;
