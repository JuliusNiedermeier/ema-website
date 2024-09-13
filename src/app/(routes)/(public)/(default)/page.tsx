import { PlayIcon } from "lucide-react";
import { groq } from "next-sanity";
import { type ComponentProps, FC } from "react";
import { Button, ButtonInteractionBubble } from "~/app/_components/primitives/button";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import {
  EconomyXSocialPreviewQueryResult,
  FeaturedPostsQueryResult,
  HomePageArtPreviewQueryResult,
  HomePageCheckupPreviewQueryResult,
  HomePageQueryResult,
} from "../../../../../generated/sanity/types";
import { PartnersBanner } from "~/app/_components/compounds/partners-banner";
import { ArtEducation } from "~/app/_components/blocks/art-education";
import { TestimonialCarousel } from "~/app/_components/blocks/testimonial-carousel";
import { BasicAccordion } from "~/app/_components/compounds/basic-accordion";
import { BentoCTA } from "~/app/_components/blocks/bento-cta";
import { EducationalProgramTypeCards } from "~/app/_components/blocks/educational-program-type-cards";
import { EducationalProgramTypePreviewList } from "~/app/_components/blocks/educational-program-type-preview-list";
import { EconomyXSocial } from "~/app/_components/compounds/economy-x-social";
import { CampusCard } from "~/app/_components/blocks/campus-card";
import { LatestPosts } from "~/app/_components/blocks/latest-posts";
import { notFound } from "next/navigation";
import { ContactPreviewCard } from "~/app/_components/blocks/contact-preview-card";
import Link from "next/link";
import { InteractionBubble } from "~/app/_components/compounds/interaction-bubble";
import { HeroVideo } from "~/app/_components/compounds/hero-video";
import { Section } from "~/app/_components/primitives/section";

const homePageQuery = groq`*[_type == "home-page"][0]{
  ...,
  video{asset->{url}},
  partners[]{
    name,
    logo{asset->{url}}
  }
}`;

const featuredPostsQuery = groq`*[_type == "post"][0...3]{
  title,
  mainImage { asset -> { url } },
  slug,
  category ->
}`;

const economyXSocialPreviewQuery = groq`*[_type == "economy-social-page"][0]{
  headingUpper,
  headingLower,
  previewText,
  previewReadMoreLabel
}`;

const homePageCheckupPreviewQuery = groq`*[_type == "checkup-page"][0]{
  heading,
  previewText,
  previewReadMoreLabel
}`;

const homePageArtPreviewQuery = groq`*[_type == "art-page"][0]{
  heading,
  preview {
    ...,
    backgroundImage{asset->{url}},
    leftImage{asset->{url}},
    rightImage{asset->{url}}
  }
}`;

const HomePage: FC = async () => {
  const homePage = await sanityFetch<HomePageQueryResult>(homePageQuery, { tags: ["home-page"] });

  if (!homePage) notFound();

  const featuredPosts = await sanityFetch<FeaturedPostsQueryResult>(featuredPostsQuery, { tags: ["post"] });

  const economyXSocial = await sanityFetch<EconomyXSocialPreviewQueryResult>(economyXSocialPreviewQuery, {
    tags: ["economy-social-page"],
  });

  const checkupPreview = await sanityFetch<HomePageCheckupPreviewQueryResult>(homePageCheckupPreviewQuery, {
    tags: ["checkup-page"],
  });

  const artPreview = await sanityFetch<HomePageArtPreviewQueryResult>(homePageArtPreviewQuery, { tags: ["art-page"] });

  const partners: ComponentProps<typeof PartnersBanner>["partners"] =
    homePage.partners?.map((partner) => ({
      imageURL: partner.logo?.asset?.url || "",
      name: partner.name || "Partner",
    })) || [];

  const FAQItems: ComponentProps<typeof BasicAccordion>["items"] =
    homePage.faq?.items?.map((item) => ({
      title: item.question || "",
      content: item.answer || "",
    })) || [];

  return (
    <>
      <div className="bg-neutral-200 pt-[var(--header-height)]">
        <Container className="items-end justify-between gap-16 pt-16 sm:flex sm:pt-24">
          <Heading size="lg" className="mb-0 text-primary-900">
            {homePage.heading?.split("\\n").map((line, index, lines) => (
              <>
                {line}
                {index < lines.length - 1 && <br />}
              </>
            ))}
          </Heading>

          <Paragraph className="mb-0 max-w-60" asChild>
            <h2>{homePage.description}</h2>
          </Paragraph>
        </Container>
      </div>

      <div className="relative bg-gradient-to-b from-neutral-200 to-neutral-100 pt-8">
        <Container width="wide" className="relative">
          <HeroVideo src={homePage.video?.asset?.url || ""} />
          <div className="pointer-events-none absolute left-0 top-0 flex h-full w-full items-end">
            <Container className="items- sticky bottom-2 my-2 flex justify-between sm:bottom-8 sm:my-8 sm:items-end">
              <Button
                href="/go"
                className="pointer-events-auto w-full justify-center gap-8 !bg-primary-100 pr-4 !text-primary-100-text md:h-24 md:w-fit md:justify-normal md:pl-16 md:pr-6"
                size="md"
              >
                <Label className="flex-1">{homePage.videoCTAButtonLabel}</Label>
                <InteractionBubble animated={false} />
              </Button>

              <div className="hidden w-min items-center gap-3 whitespace-nowrap text-neutral-200 md:flex">
                <Label className="hidden sm:block">{homePage.videoFullscreenButtonLabel}</Label>
                <PlayIcon className="mr-8 sm:mr-0" />
              </div>
            </Container>
          </div>
        </Container>
      </div>

      <div className="mt-16 flex justify-center">
        <PartnersBanner partners={partners} />
      </div>

      <Container>
        <EducationalProgramTypeCards className="mt-32" />

        <div className="mx-auto mt-64 max-w-[40rem] text-center">
          <Heading>{homePage.introduction?.heading}</Heading>
          <Paragraph>{homePage.introduction?.paragraph}</Paragraph>
        </div>

        <Container width="narrow" className="mt-32 !max-w-[60rem]">
          <LatestPosts
            heading={homePage.featuredPosts?.heading || ""}
            allPostsLabel={homePage.featuredPosts?.allPostsLabel || ""}
            posts={featuredPosts.map((post) => ({
              title: post.title || "",
              imageURL: post.mainImage?.asset?.url || "",
              slug: post.slug?.current || "",
              category: { title: post.category?.title || "", slug: post.category?.slug?.current || "" },
            }))}
          />
        </Container>
      </Container>

      <EconomyXSocial
        className="mt-64"
        headingUpper={economyXSocial?.headingUpper || ""}
        headingLower={economyXSocial?.headingLower || ""}
        previewText={economyXSocial?.previewText || ""}
        readMoreButtonLabel={economyXSocial?.previewReadMoreLabel || ""}
      />

      <EducationalProgramTypePreviewList className="-z-10 mt-64" />

      <Section connect="bottom" className="-mt-[4rem] bg-neutral-300">
        <Container width="narrow" className="flex flex-col items-center pb-24 pt-32 text-center">
          <Heading size="sm">{checkupPreview?.heading}</Heading>
          <Paragraph className="mt-0">{checkupPreview?.previewText}</Paragraph>
          <Button vairant="filled" className="mt-8" href="/checkup">
            <Label>{checkupPreview?.previewReadMoreLabel}</Label>
            <ButtonInteractionBubble />
          </Button>
        </Container>
      </Section>

      <Section connect="both" className="bg-neutral-300">
        <Container className="py-24">
          <Link href="/about/kunst">
            <ArtEducation
              title={artPreview?.heading || ""}
              body={artPreview?.preview?.excerpt || ""}
              actionLabel={artPreview?.preview?.readMoreButtonLabel || ""}
              backgroundImage={{
                src: artPreview?.preview?.backgroundImage?.asset?.url || "",
                alt: artPreview?.heading || "",
              }}
              leftImage={{
                src: artPreview?.preview?.leftImage?.asset?.url || "",
                alt: artPreview?.heading || "",
              }}
              rightImage={{
                src: artPreview?.preview?.rightImage?.asset?.url || "",
                alt: artPreview?.heading || "",
              }}
            />
          </Link>

          <Link href="/about/campus" className="mt-16 block">
            <CampusCard />
          </Link>

          <ContactPreviewCard className="mt-16" />
        </Container>
      </Section>

      <Section connect="top" className="-mb-2 bg-neutral-100">
        <Container width="narrow" className="text-balance pt-32 text-center">
          <Heading>{homePage.testimonials?.heading}</Heading>
          <Paragraph>{homePage.testimonials?.subheading}</Paragraph>
        </Container>
        <Container>
          <TestimonialCarousel className="mt-16" />
        </Container>

        <Container width="narrow" className="mt-64">
          <Heading className="text-center">{homePage.faq?.heading}</Heading>
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
