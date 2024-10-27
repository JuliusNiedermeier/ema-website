import { MapPinIcon, PlayIcon, PlusIcon } from "lucide-react";
import { groq } from "next-sanity";
import { type ComponentProps, FC } from "react";
import { Button, ButtonInteractionBubble } from "~/app/_components/primitives/button";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import {
  EconomyXSocialPreviewQueryResult,
  FeaturedEventsQueryResult,
  FeaturedPostsQueryResult,
  HomePageArtPreviewQueryResult,
  // HomePageComparisonPreviewQueryResult,
  HomePageMetaQueryResult,
  HomePageQueryResult,
  HomePageTimeSuffixQueryResult,
} from "../../../../../generated/sanity/types";
import { PartnersBanner } from "~/app/_components/compounds/partners-banner";
import { ArtEducation } from "~/app/_components/blocks/art-education";
import { TestimonialCarousel } from "~/app/_components/blocks/testimonial-carousel";
import { BasicAccordion } from "~/app/_components/compounds/basic-accordion";
import { BentoCTA } from "~/app/_components/blocks/bento-cta";
import { EconomyXSocial } from "~/app/_components/compounds/economy-x-social";
import { CampusCard } from "~/app/_components/blocks/campus-card";
import { LatestPosts } from "~/app/_components/blocks/latest-posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { InteractionBubble } from "~/app/_components/compounds/interaction-bubble";
import { HeroVideo } from "~/app/_components/compounds/hero-video";
import { Section } from "~/app/_components/primitives/section";
import { ProgramGrid } from "~/app/_components/blocks/program-grid";
import { createGenerateMetadata } from "~/app/_utils/create-generate-meta";
import { Card } from "~/app/_components/primitives/card";

const homePageQuery = groq`*[_type == "home-page"][0]{
  ...,
  heroVideo { asset -> { url } },
  partners[]
}`;

const featuredPostsQuery = groq`*[_type == "post"][0...3]{
  name,
  mainImage,
  slug,
  category ->,
  author -> {
    name,
    image
  }
}`;

const featuredEventsQuery = groq`*[_type == "event"] | order(date asc) [0...3]`;

const homePageTimeSuffixQuery = groq`*[_type == "website-settings"][0]{
  timeSuffix
}`;

const economyXSocialPreviewQuery = groq`*[_type == "economy-social-page"][0]{
  headingUpper,
  headingLower,
  teaser,
  readMoreLabel
}`;

// const homePageComparisonPreviewQuery = groq`*[_type == "comparison-page"][0]{
//   heading,
//   teaser,
//   readMoreLabel,
//   previewImages
// }`;

const homePageArtPreviewQuery = groq`*[_type == "art-page"][0]{
  heading,
  teaser,
  readMoreLabel,
  preview {
    backgroundImage,
    leftImage,
    rightImage
  }
}`;

const homePageMetaQuery = groq`*[_type == "home-page"][0]{
  "title": coalesce(seo.title, ""),
  "description": coalesce(seo.description, ""),
}`;

export const generateMetadata = createGenerateMetadata<HomePageMetaQueryResult>(homePageMetaQuery, {
  tags: ["home-page"],
});

const HomePage: FC = async () => {
  const homePage = await sanityFetch<HomePageQueryResult>(homePageQuery, { tags: ["home-page"] });

  if (!homePage) notFound();

  const featuredPosts = await sanityFetch<FeaturedPostsQueryResult>(featuredPostsQuery, {
    tags: ["post", "category", "author"],
  });

  const economyXSocial = await sanityFetch<EconomyXSocialPreviewQueryResult>(economyXSocialPreviewQuery, {
    tags: ["economy-social-page"],
  });

  // const comparisonPreview = await sanityFetch<HomePageComparisonPreviewQueryResult>(homePageComparisonPreviewQuery, {
  //   tags: ["comparison-page"],
  // });

  const events = await sanityFetch<FeaturedEventsQueryResult>(featuredEventsQuery, { tags: ["event"] });

  const websiteSettings = await sanityFetch<HomePageTimeSuffixQueryResult>(homePageTimeSuffixQuery, {
    tags: ["website-settings"],
  });

  const artPreview = await sanityFetch<HomePageArtPreviewQueryResult>(homePageArtPreviewQuery, { tags: ["art-page"] });

  const FAQItems: ComponentProps<typeof BasicAccordion>["items"] =
    homePage.faq?.items?.map((item) => ({
      title: item.question || "",
      content: item.answer || "",
    })) || [];

  return (
    <>
      <div className="bg-neutral-200 pt-[var(--header-height)]">
        <Container className="items-end justify-between gap-16 pt-16 sm:flex sm:pt-24">
          <Heading tag="h1" size="lg" className="mb-0 text-primary-900">
            {homePage.heading?.split("\\n").map((line, index, lines) => (
              <>
                {line}
                {index < lines.length - 1 && <br />}
              </>
            ))}
          </Heading>

          <Paragraph className="mb-0 max-w-60" asChild>
            <h2>{homePage.teaser}</h2>
          </Paragraph>
        </Container>
      </div>

      <div className="relative bg-gradient-to-b from-neutral-200 to-neutral-100 pt-8">
        <Container width="wide" className="relative">
          <HeroVideo src={homePage.heroVideo?.asset?.url || ""} />
          <div className="pointer-events-none absolute left-0 top-0 flex h-full w-full items-end">
            <Container className="sticky bottom-2 my-2 flex items-stretch justify-between gap-2 sm:bottom-8 sm:my-8">
              <Button
                href="/online-bewerbung"
                className="pointer-events-auto w-full justify-center gap-8 !bg-primary-100 pr-4 !text-primary-100-text md:h-24 md:w-fit md:justify-normal md:pl-12 md:pr-6"
                size="md"
              >
                <Label className="flex-1">{homePage.heroCTALabel}</Label>
                <InteractionBubble animated={false} />
              </Button>

              <div className="grid aspect-square h-16 place-content-center rounded-full bg-neutral-100/50 text-neutral-900 backdrop-blur-lg md:h-24">
                <PlayIcon />
              </div>
            </Container>
          </div>
        </Container>
      </div>

      <div className="mt-16 flex justify-center">
        <PartnersBanner partners={homePage.partners || []} />
      </div>

      <Container>
        <ProgramGrid className="mt-32" />

        <div className="mx-auto mt-64 max-w-[40rem] text-center">
          <Heading tag="h2">{homePage.introduction?.heading}</Heading>
          <Paragraph>{homePage.introduction?.description}</Paragraph>
        </div>

        <Container width="narrow" className="mt-32 !max-w-[60rem]">
          <LatestPosts
            heading={homePage.featuredPosts?.heading || ""}
            allPostsLabel={homePage.featuredPosts?.allPostsLabel || ""}
            posts={featuredPosts.map((post) => ({
              title: post.name || "",
              image: post.mainImage,
              slug: post.slug?.current || "",
              category: { name: post.category?.name || "", slug: post.category?.slug?.current || "" },
              author: {
                name: post.author?.name || "",
                image: post.author?.image,
              },
            }))}
          />
        </Container>
      </Container>

      <EconomyXSocial
        className="mt-64"
        headingUpper={economyXSocial?.headingUpper || ""}
        headingLower={economyXSocial?.headingLower || ""}
        previewText={economyXSocial?.teaser || ""}
        readMoreButtonLabel={economyXSocial?.readMoreLabel || ""}
      />

      <Section connect="bottom" className="mt-32 bg-primary-900">
        <Container width="narrow" className="flex flex-col items-center pt-24 text-center md:pt-48">
          <Heading tag="h2" className="text-neutral-900-text">
            {homePage.featuredEvents?.heading}
          </Heading>
          <Paragraph className="mt-0 text-neutral-900-text-muted">{homePage.featuredEvents?.introduction}</Paragraph>
        </Container>
        <Container className="flex flex-wrap gap-4 pb-12 pt-20 md:pb-48">
          {events.map((event, index) => {
            const d = new Date(event.date || "");
            return (
              <Card key={index} className="relative min-w-min flex-1 overflow-hidden bg-primary-100 p-0">
                <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-900" />

                <div className="p-8">
                  <Label className="text-primary-100-text-muted">
                    {d.toLocaleDateString("de", { weekday: "long" })}
                  </Label>
                  <Heading className="m-0 text-primary-100-text">
                    {d.toLocaleDateString("de", { day: "2-digit", month: "long" })}
                  </Heading>
                  <Label>
                    {`${d.toLocaleTimeString("de", { hour: "numeric", minute: "2-digit" })} ${websiteSettings?.timeSuffix} - ${event.duration}`}
                  </Label>
                  <Heading size="sm" className="m-0 mt-8">
                    {event.name}
                  </Heading>
                  <Paragraph className="text-neutral-100-text-muted">{event.teaser}</Paragraph>
                </div>

                <Link
                  href={event.locationURL || ""}
                  target="_blank"
                  className="flex w-full flex-1 items-center gap-4 border-t border-dashed border-neutral-900/40 bg-neutral-200 px-8 py-4 hover:brightness-95"
                >
                  <MapPinIcon />
                  <Label className="whitespace-nowrap">{event.location}</Label>
                </Link>

                <div className="absolute bottom-0 left-1/2 h-4 w-4 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary-900" />
              </Card>
            );
          })}
        </Container>
      </Section>

      <Section connect="both" className="bg-neutral-300">
        <Container className="pt-2 md:py-24">
          <Link href="/about/kunst">
            <ArtEducation
              className="rounded-t-3xl md:rounded-t-2xl"
              title={artPreview?.heading || ""}
              body={artPreview?.teaser || ""}
              actionLabel={artPreview?.readMoreLabel || ""}
              backgroundImage={artPreview?.preview?.backgroundImage}
              leftImage={artPreview?.preview?.leftImage}
              rightImage={artPreview?.preview?.rightImage}
            />
          </Link>

          <Link href="/about/campus" className="mt-8 md:mt-16 mb-8 block">
            <CampusCard />
          </Link>
        </Container>
      </Section>

      <Section connect="top" className="-mb-2 bg-neutral-100">
        <Container width="narrow" className="pt-32 text-center">
          <Heading tag="h2">{homePage.testimonials?.heading}</Heading>
          <Paragraph>{homePage.testimonials?.description}</Paragraph>
        </Container>
        <Container>
          <TestimonialCarousel className="mt-16" />
        </Container>

        <Container width="narrow" className="mt-64">
          <div className="text-center">
            <Heading tag="h2">{homePage.faq?.heading}</Heading>
            <Paragraph>{homePage.faq?.description}</Paragraph>
          </div>
          <BasicAccordion className="mt-16" items={FAQItems} />
        </Container>

        <Container className="mt-32 sm:mt-64">
          <BentoCTA />
        </Container>
      </Section>
    </>
  );
};

export default HomePage;
