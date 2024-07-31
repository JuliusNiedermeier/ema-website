import { PlayIcon } from "lucide-react";
import { groq } from "next-sanity";
import { type ComponentProps, FC } from "react";
import { Button, ButtonInteractionBubble } from "~/app/_components/primitives/button";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { sanity } from "~/sanity/lib/client";
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
  const homePage = await sanity.fetch<HomePageQueryResult>(homePageQuery, {}, { next: { tags: ["home-page"] } });

  const featuredPosts = await sanity.fetch<FeaturedPostsQueryResult>(
    featuredPostsQuery,
    {},
    { next: { tags: ["post"] } },
  );

  const economyXSocial = await sanity.fetch<EconomyXSocialPreviewQueryResult>(
    economyXSocialPreviewQuery,
    {},
    { next: { tags: ["economy-social-page"] } },
  );

  const checkupPreview = await sanity.fetch<HomePageCheckupPreviewQueryResult>(
    homePageCheckupPreviewQuery,
    {},
    { next: { tags: ["checkup-page"] } },
  );

  const artPreview = await sanity.fetch<HomePageArtPreviewQueryResult>(
    homePageArtPreviewQuery,
    {},
    { next: { tags: ["art-page"] } },
  );

  if (!homePage) notFound();

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
      <div className="bg-neutral-200">
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

      <div className="relative pt-8">
        <div className="absolute left-0 top-0 h-1/2 w-full bg-neutral-200"></div>
        <Container width="wide" className="relative">
          <video
            playsInline
            autoPlay
            muted
            loop
            src={homePage.video?.asset?.url || ""}
            className="min-h-[70vh] w-full rounded-2xl object-cover"
          />

          <div className="absolute left-0 top-0 flex h-full w-full items-end">
            <Container className="items- sticky bottom-2 my-2 flex justify-between sm:bottom-8 sm:my-8 sm:items-end">
              <Button href="/go" className="!bg-primary-100 !text-primary-100-text" size="lg">
                <Label>{homePage.videoCTAButtonLabel}</Label>
                <ButtonInteractionBubble />
              </Button>

              <div className="flex w-min items-center gap-3 whitespace-nowrap text-neutral-200">
                <Label className="hidden sm:block">{homePage.videoFullscreenButtonLabel}</Label>
                <PlayIcon className="mr-8 sm:mr-0" />
              </div>
            </Container>
          </div>
        </Container>
      </div>

      <Container width="medium">
        <div className="mt-16 flex justify-center">
          <PartnersBanner partners={partners} />
        </div>

        <EducationalProgramTypeCards className="mt-16" />

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
              category: post.category?.title || "",
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

      <Container>
        <EducationalProgramTypePreviewList className="mt-64" />

        <Container width="narrow" className="mt-32 flex flex-col items-center text-center">
          <Heading size="sm">{checkupPreview?.heading}</Heading>
          <Paragraph className="mt-0">{checkupPreview?.previewText}</Paragraph>
          <Button vairant="filled" className="mt-8" href="/checkup">
            <Label>{checkupPreview?.previewReadMoreLabel}</Label>
            <ButtonInteractionBubble />
          </Button>
        </Container>

        <Link href="/about/kunst">
          <ArtEducation
            className="mt-64"
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
      </Container>

      <CampusCard className="mt-16" />

      <Container>
        <ContactPreviewCard className="mt-32" />
      </Container>

      <Container width="narrow" className="mt-64 text-balance text-center">
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
    </>
  );
};

export default HomePage;
