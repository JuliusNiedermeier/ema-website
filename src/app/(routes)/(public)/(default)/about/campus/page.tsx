import { groq } from "next-sanity";
import { ComponentProps, FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import { CampusPageContactQueryResult, CampusPageQueryResult } from "../../../../../../../generated/sanity/types";
import { EndOfPageCTA } from "~/app/_components/compounds/end-of-page-cta";
import { InfoEventCTACard } from "~/app/_components/compounds/info-event-cta-card";
import Link from "next/link";
import { Card } from "~/app/_components/primitives/card";
import { InteractionBubble } from "~/app/_components/compounds/interaction-bubble";
import { Chip } from "~/app/_components/primitives/chip";
import { ParalaxGallery } from "~/app/_components/compounds/paralax-gallery";

const campusPageQuery = groq`*[_type == "campus-page"][0]{
  ...,
  heroImage { asset -> { url } },
  staff[]{
    ...,
    image { asset -> { url } }
  }
}`;

const campusPageContactQuery = groq`*[_type == "contact-page"][0] {
  infoEvening,
  personalConsulting
}`;

const CampusPage: FC = async () => {
  const data = await sanityFetch<CampusPageQueryResult>(campusPageQuery, { tags: ["campus-page"] });

  const contact = await sanityFetch<CampusPageContactQueryResult>(campusPageContactQuery, { tags: ["contact-page"] });

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
          <Link href="/kontakt#info-event" className="flex-[2]">
            <InfoEventCTACard
              heading={contact?.infoEvening?.heading || ""}
              description={contact?.infoEvening?.previewText || ""}
              readMoreLabel={contact?.infoEvening?.readMoreLabel || ""}
              timeSuffix={contact?.infoEvening?.timeSuffix || ""}
              dates={
                contact?.infoEvening?.nextDates
                  ?.filter(({ eventDate }) => !!eventDate)
                  .map(({ eventDate }) => new Date(eventDate!)) || []
              }
            />
          </Link>
          <Link href="/kontakt#personal-consulting" className="flex-1">
            <Card className="group flex h-full flex-col rounded-3xl border border-neutral-400 bg-neutral-300">
              <Heading>{contact?.personalConsulting?.name}</Heading>
              <Paragraph className="flex-1">{contact?.personalConsulting?.previewText}</Paragraph>
              <div className="mt-2 flex items-center gap-2">
                <Chip>
                  <Label>{contact?.personalConsulting?.booking?.type?.onlineLabel}</Label>
                </Chip>
                <Chip>
                  <Label>{contact?.personalConsulting?.booking?.type?.offlineLabel}</Label>
                </Chip>
              </div>
              <div className="mt-4 flex h-8 items-center gap-0 transition-all group-hover:gap-4">
                <InteractionBubble />
                <Label>{contact?.personalConsulting?.readMoreLabel}</Label>
              </div>
            </Card>
          </Link>
        </Container>
      </EndOfPageCTA>
    </div>
  );
};

export default CampusPage;
