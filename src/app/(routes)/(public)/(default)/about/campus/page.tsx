import { groq } from "next-sanity";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import { CampusPageQueryResult } from "../../../../../../../generated/sanity/types";
import Image from "next/image";
import { ParalaxContainer } from "~/app/_components/compounds/paralax-image";
import { CampusInfoCard, CampusInfoCardListProvider } from "~/app/_components/compounds/campus-info-card";

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
    </div>
  );
};

export default CampusPage;
