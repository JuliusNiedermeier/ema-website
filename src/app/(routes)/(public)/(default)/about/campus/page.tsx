import { groq } from "next-sanity";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import { CampusPageContactQueryResult, CampusPageQueryResult } from "../../../../../../../generated/sanity/types";
import Image from "next/image";
import { ParalaxContainer } from "~/app/_components/compounds/paralax-image";
import { CampusInfoCard, CampusInfoCardListProvider } from "~/app/_components/compounds/campus-info-card";
import { EndOfPageCTA } from "~/app/_components/compounds/end-of-page-cta";
import { InfoEventCTACard } from "~/app/_components/compounds/info-event-cta-card";
import Link from "next/link";
import { Card } from "~/app/_components/primitives/card";
import { InteractionBubble } from "~/app/_components/compounds/interaction-bubble";
import { Chip } from "~/app/_components/primitives/chip";

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

  return (
    <div className="rounded-b-3xl">
      <div className="bg-neutral-200 pb-40">
        <Container className="py-16">
          <Heading>{data?.heading}</Heading>
          <Paragraph className="max-w-[40rem]">{data?.previewText}</Paragraph>
        </Container>
      </div>
      <div className="-mt-40 flex flex-col gap-4">
        <CampusInfoCardListProvider>
          {data?.staff?.map((member, index) => (
            <div key={index} className="relative h-[75vh]">
              <div className="absolute left-0 top-0 h-full w-full">
                <Container width="wide" className="h-full overflow-hidden rounded-3xl">
                  <ParalaxContainer className="h-full w-full">
                    <Image
                      src={member.image?.asset?.url || ""}
                      alt={"TODO"}
                      width="1920"
                      height="1080"
                      className="h-full w-full overflow-hidden object-cover"
                    />
                  </ParalaxContainer>
                </Container>
              </div>
              <div className="absolute bottom-0 left-0 w-full">
                <Container className="py-[6px] md:py-8">
                  <CampusInfoCard title={member.name || ""} subtitle={member.position || ""}>
                    <Paragraph>{member.description}</Paragraph>
                  </CampusInfoCard>
                </Container>
              </div>
            </div>
          ))}
        </CampusInfoCardListProvider>
      </div>
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
