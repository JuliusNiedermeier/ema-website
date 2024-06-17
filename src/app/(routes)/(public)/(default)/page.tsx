import { PlayIcon } from "lucide-react";
import { groq } from "next-sanity";
import { type ComponentProps, FC } from "react";
import { Button, ButtonInteractionBubble } from "~/app/_components/primitives/button";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { sanity } from "~/sanity/lib/client";
import { HomePageQueryResult } from "../../../../../generated/sanity/types";
import { PartnersBanner } from "~/app/_components/compounds/partners-banner";
import { ArtEducation } from "~/app/_components/blocks/art-education";
import { TestimonialCarousel } from "~/app/_components/blocks/testimonial-carousel";
import { BasicAccordion } from "~/app/_components/compounds/basic-accordion";
import { BentoCTA } from "~/app/_components/blocks/bento-cta";
import { EducationalProgramTypeCards } from "~/app/_components/blocks/educational-program-type-cards";
import { EducationalProgramTypePreviewList } from "~/app/_components/blocks/educational-program-type-preview-list";
import { EconomyXSocial } from "~/app/_components/blocks/economy-x-social";
import { CampusCard } from "~/app/_components/blocks/campus-card";
import { Card } from "~/app/_components/primitives/card";
import { InteractionBubble } from "~/app/_components/compounds/interaction-bubble";
import Link from "next/link";
import { LatestPosts } from "~/app/_components/blocks/latest-posts";

const homePageQuery = groq`*[_type == "home-page"][0]{
  ...,
  video{asset->{url}},
  partners[]{
    name,
    logo{asset->{url}}
  }, 
  artEducation {
    ...,
    backgroundImage{asset->{url}},
    leftImage{asset->{url}},
    rightImage{asset->{url}}
  }
}`;

const HomePage: FC = async () => {
  const homePage = await sanity.fetch<HomePageQueryResult>(homePageQuery);

  const partners: ComponentProps<typeof PartnersBanner>["partners"] =
    homePage?.partners?.map((partner) => ({
      imageURL: partner.logo?.asset?.url || "",
      name: partner.name || "Partner",
    })) || [];

  const FAQItems: ComponentProps<typeof BasicAccordion>["items"] =
    homePage?.faq?.items?.map((item) => ({
      title: item.question || "",
      content: item.answer || "",
    })) || [];

  return (
    <>
      <div className="bg-neutral-200">
        <Container className="items-end justify-between gap-16 pt-16 sm:flex sm:pt-24">
          <Heading size="lg" className="mb-0 text-primary-900">
            {homePage?.heading?.slice(0, homePage?.heading?.indexOf("+"))}
            <br />
            {homePage?.heading?.slice(homePage?.heading?.indexOf("+"))}
          </Heading>

          <Paragraph className="mb-0 max-w-60" asChild>
            <h2>{homePage?.description}</h2>
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
            src={homePage?.video?.asset?.url || ""}
            className="min-h-[70vh] w-full rounded-2xl object-cover"
          />

          <div className="absolute left-0 top-0 flex h-full w-full items-end">
            <Container className="items- sticky bottom-2 my-2 flex justify-between sm:bottom-8 sm:my-8 sm:items-end">
              <Button href="/go" className="!bg-primary-100 !text-primary-100-text" size="lg">
                <Label>Bewerben</Label>
                <ButtonInteractionBubble />
              </Button>

              <div className="flex w-min items-center gap-3 whitespace-nowrap text-neutral-200">
                <Label className="hidden sm:block">Ganzes Video ansehen</Label>
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
          <Heading>Die Schule für deine Zukunft</Heading>
          <Paragraph>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae ex iure ad esse, atque maiores
            repellat! Perspiciatis est eaque voluptatem quia placeat sint ducimus labore incidunt corporis. Quos,
            ratione explicabo!
          </Paragraph>
        </div>

        <Container width="narrow" className="mt-32 !max-w-[60rem]">
          <LatestPosts />
        </Container>
      </Container>

      <EconomyXSocial className="mt-64" />

      <Container>
        <EducationalProgramTypePreviewList className="mt-64" />

        <Container width="narrow" className="mt-32 flex flex-col items-center text-center">
          <Heading size="sm">Finde heraus was zu dir passt.</Heading>
          <Paragraph className="mt-0">Mit unserem Checkup tool findest du den richtigen Weg für Dich.</Paragraph>
          <Button vairant="filled" className="mt-8" href="/checkup">
            <Label>Mache den Checkup</Label>
            <ButtonInteractionBubble />
          </Button>
        </Container>

        <ArtEducation
          className="mt-64"
          backgroundImage={{
            src: homePage?.artEducation?.backgroundImage?.asset?.url || "",
            alt: homePage?.artEducation?.title || "",
          }}
          leftImage={{
            src: homePage?.artEducation?.leftImage?.asset?.url || "",
            alt: homePage?.artEducation?.title || "",
          }}
          rightImage={{
            src: homePage?.artEducation?.rightImage?.asset?.url || "",
            alt: homePage?.artEducation?.title || "",
          }}
          title={homePage?.artEducation?.title || ""}
          body={homePage?.artEducation?.body || ""}
          actionLabel={homePage?.artEducation?.actionLabel || ""}
        />

        <CampusCard className="mt-16" />

        <Card className="mt-32 flex flex-col gap-4 rounded-3xl p-4 sm:flex-row">
          <Link href="/kontakt" className="group flex-1 p-4 pb-6">
            <Heading>Lerne uns kennen</Heading>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae similique excepturi enim obcaecati
              quos minus, provident, eum dignissimos dicta maiores animi! Possimus omnis deleniti atque recusandae ullam
              molestiae deserunt vero?
            </Paragraph>
            <div className="mt-auto flex items-center gap-4 pt-8">
              <InteractionBubble animated={false} />
              <Label>Mehr erfahren</Label>
            </div>
          </Link>
          <Link href="/kontakt#beratung" className="group block flex-1">
            <Card className="flex h-full flex-col bg-primary-100">
              <Heading size="sm" className="text-primary-100-text-muted">
                Offene Beratung
              </Heading>
              <Heading className="text-primary-100-text">Jeden Mittwoch</Heading>
              <Paragraph>Komm zu unserer Beratunssprechstunde</Paragraph>
              <InteractionBubble animated={false} className="mt-auto" />
            </Card>
          </Link>
          <Link href="/kontakt#infoabend" className="group block flex-1">
            <Card className="flex h-full flex-col bg-primary-900">
              <Heading size="sm" className="text-primary-900-text-muted">
                Infoabend
              </Heading>
              <Heading className="text-primary-900-text">Montag, 24. Juli</Heading>
              <Paragraph className="text-neutral-900-text-muted">Komm zu unserer Beratunssprechstunde</Paragraph>
              <InteractionBubble animated={false} className="mt-auto bg-neutral-100 text-neutral-100-text" />
            </Card>
          </Link>
        </Card>

        <div className="mt-64">
          <div className="mx-auto max-w-[40rem] text-balance text-center">
            <Heading>Über 600 zufriedene Schüler</Heading>
            <Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. In ea adipisci praesentium.</Paragraph>
          </div>
          <TestimonialCarousel className="mt-16" />
        </div>
      </Container>

      <Container width="narrow" className="mt-64">
        <Heading className="text-center">{homePage?.faq?.heading}</Heading>
        <BasicAccordion className="mt-16" items={FAQItems} />
      </Container>

      <Container className="mt-32 sm:mt-64">
        <BentoCTA />
      </Container>
    </>
  );
};

export default HomePage;
