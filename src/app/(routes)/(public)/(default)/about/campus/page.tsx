import { groq } from "next-sanity";
import { ComponentProps, FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import { CampusPageQueryResult } from "../../../../../../../generated/sanity/types";
import { EndOfPageCTA } from "~/app/_components/compounds/end-of-page-cta";
import { InfoEventCTACard } from "~/app/_components/blocks/info-event-cta-card";
import Link from "next/link";
import { ParalaxGallery } from "~/app/_components/compounds/paralax-gallery";
import { ConsultingCTACard } from "~/app/_components/blocks/consulting-cta-card";

const campusPageQuery = groq`*[_type == "campus-page"][0]{
  ...,
  heroImage { asset -> { url } },
  staff[]{
    ...,
    image { asset -> { url } }
  }
}`;

const CampusPage: FC = async () => {
  const data = await sanityFetch<CampusPageQueryResult>(campusPageQuery, { tags: ["campus-page"] });

  const galleryItems: ComponentProps<typeof ParalaxGallery>["items"] =
    data?.staff?.map((member) => ({
      imageURL: member.image?.asset?.url || "",
      heading: member.name || "",
      subheading: member.position || "",
      description: member.description || "",
    })) || [];

  return (
    <div className="rounded-b-3xl">
      <div className="bg-neutral-200 pb-40">
        <Container className="py-16">
          <Heading>{data?.heading}</Heading>
          <Paragraph className="max-w-[40rem]">{data?.previewText}</Paragraph>
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
