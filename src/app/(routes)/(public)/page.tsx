import { PlayIcon } from "lucide-react";
import { groq } from "next-sanity";
import { FC } from "react";
import { Button, ButtonInteractionBubble } from "~/app/_components/primitives/button";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { sanity } from "~/sanity/lib/client";
import { HomePageQueryResult } from "../../../../generated/sanity/types";

const homePageQuery = groq`*[_type == "home-page"][0]{..., video{asset->{url}}}`;

const HomePage: FC = async () => {
  const homePage = await sanity.fetch<HomePageQueryResult>(homePageQuery, {}, { next: { tags: ["home-page"] } });

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
    </>
  );
};

export default HomePage;
