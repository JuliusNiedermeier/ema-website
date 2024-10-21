import { groq } from "next-sanity";
import { ComponentProps, FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import { CampusPageMetaQueryResult, CampusPageQueryResult } from "../../../../../../../generated/sanity/types";
import { EndOfPageCTA } from "~/app/_components/compounds/end-of-page-cta";
import { InfoEventCTACard } from "~/app/_components/blocks/info-event-cta-card";
import Link from "next/link";
import { ParalaxGallery } from "~/app/_components/compounds/paralax-gallery";
import { ConsultingCTACard } from "~/app/_components/blocks/consulting-cta-card";
import { Metadata } from "next";
import { createGenerateMetadata } from "~/app/_utils/create-generate-meta";

const campusPageQuery = groq`*[_type == "campus-page"][0]{
  heading,
  teaser,
  staff[]{
    name,
    position,
    description,
    image { alt, asset -> { url } }
  },
  contactCTA
}`;

const campusPageMetaQuery = groq`*[_type == "campus-page"][0]{
  "title": coalesce(seo.title, ""),
  "description": coalesce(seo.description, ""),
}`;

export const generateMetadata = createGenerateMetadata<CampusPageMetaQueryResult>(campusPageMetaQuery, {
  tags: ["campus-page"],
});

const CampusPage: FC = async () => {
  const data = await sanityFetch<CampusPageQueryResult>(campusPageQuery, { tags: ["campus-page"] });

  const galleryItems: ComponentProps<typeof ParalaxGallery>["items"] =
    data?.staff?.map((member) => ({
      image: { url: member.image?.asset?.url || "", alt: member.image?.alt || "" },
      heading: member.name || "",
      subheading: member.position || "",
      description: member.description || "",
    })) || [];

  return (
    <div className="rounded-b-3xl">
      <div className="bg-neutral-200 pb-40 pt-header">
        <Container width="narrow" className="py-24 text-center">
          <Heading tag="h1">{data?.heading}</Heading>
          <Paragraph>{data?.teaser}</Paragraph>
        </Container>
      </div>
      <ParalaxGallery items={galleryItems} className="-mt-40" />
      <EndOfPageCTA
        className="mt-32"
        heading={data?.contactCTA?.heading || ""}
        description={data?.contactCTA?.description || ""}
      >
        <Container className="flex flex-col items-stretch gap-8 xl:flex-row">
          <Link href="/kontakt/info-abend" className="flex-1">
            <InfoEventCTACard stack className="h-full" />
          </Link>
          <Link href="/kontakt/beratung" className="flex-1">
            <ConsultingCTACard />
          </Link>
        </Container>
      </EndOfPageCTA>
    </div>
  );
};

export default CampusPage;
