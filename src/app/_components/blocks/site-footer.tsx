import { ComponentProps, FC, Fragment } from "react";
import { cn } from "~/app/_utils/cn";
import { Container } from "../primitives/container";
import { SiteLogo } from "../compounds/site-logo";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { groq } from "next-sanity";
import { sanity } from "~/sanity/lib/client";
import {
  FooterEducationalProgramTypesQueryResult,
  FooterEducationalProgramsQueryResult,
} from "../../../../generated/sanity/types";
import Link from "next/link";
import { InstagramIcon } from "../compounds/icons/instagram";
import { TikTokIcon } from "../compounds/icons/tiktok";
import { Button } from "../primitives/button";
import { InteractionBubble } from "../compounds/interaction-bubble";
import { AtSignIcon } from "lucide-react";

const footerEducationalProgramTypesQuery = groq`*[_type == "educational-program-type"]{
    ...
}`;

const footerEducationalProgramsQuery = groq`*[_type == "educational-program"]{
    ...
}`;

export type SiteFooterProps = ComponentProps<"div"> & {};

export const SiteFooter: FC<SiteFooterProps> = async ({ className, ...restProps }) => {
  const programTypes = await sanity.fetch<FooterEducationalProgramTypesQueryResult>(
    footerEducationalProgramTypesQuery,
    {},
    { next: { tags: ["educational-program-type"] } },
  );
  const programs = await sanity.fetch<FooterEducationalProgramsQueryResult>(
    footerEducationalProgramsQuery,
    {},
    { next: { tags: ["educational-program"] } },
  );

  const programTypesWithPrograms = programTypes.map((programType) => ({
    ...programType,
    programs: programs.filter((program) => program.educationalProgramType?._ref === programType._id),
  }));

  return (
    <div
      className={cn("mt-8 rounded-t-3xl border-b-0 bg-primary-900 sm:m-2 sm:mt-8 sm:rounded-b-3xl", className)}
      {...restProps}
    >
      <Container asChild>
        <footer>
          <div className="flex justify-between gap-40 pt-40">
            <div>
              <SiteLogo show="mark" />
              <SiteLogo show="text" light className="mt-2" />
              <Paragraph className="mt-8 text-neutral-900-text">
                Wirtschaft verstehen. <br />
                Sozial handeln.
              </Paragraph>
              <Button className="mt-8 gap-4 bg-primary-100 pl-4 text-primary-100-text" vairant="outline">
                <InteractionBubble animated={false} />
                <Label>Bewerben</Label>
              </Button>
            </div>
            <div className="hidden grid-cols-3 gap-16 sm:grid">
              <List>
                <ListHeading>Bewerben</ListHeading>
                <ListContent>
                  <ListContentItem>Online-Anmeldung</ListContentItem>
                  <ListContentItem>Checkup</ListContentItem>
                  <ListContentItem>Infoabend</ListContentItem>
                  <ListContentItem>Offene Beratung</ListContentItem>
                  <ListContentItem>Campus</ListContentItem>
                </ListContent>
              </List>
              <List>
                <ListHeading>Bildungswege</ListHeading>
                <ListContent>
                  {programTypesWithPrograms.map((programType) => (
                    <Fragment key={programType._id}>
                      <Link href={`/bildungswege/${programType.slug?.current}`}>
                        <ListContentItem>{programType.name}</ListContentItem>
                      </Link>
                      <ListContentItem>
                        <ListContent className="mb-4">
                          {programType.programs.map((program) => (
                            <ListContentItem key={program._id} className="text-neutral-900-text-muted">
                              <Link href={`/bildungswege/${programType.slug?.current}/${program.slug?.current}`}>
                                {program.name}
                              </Link>
                            </ListContentItem>
                          ))}
                        </ListContent>
                      </ListContentItem>
                    </Fragment>
                  ))}
                </ListContent>
              </List>
              <List>
                <ListHeading>Ressourcen</ListHeading>
                <ListContent>
                  <ListContentItem>Blog</ListContentItem>
                  <ListContentItem>Preisliste</ListContentItem>
                  <ListContentItem>Anmeldebogen</ListContentItem>
                  <ListContentItem>Jobs</ListContentItem>
                </ListContent>
              </List>
            </div>
          </div>
          <div className="mt-16 h-px bg-neutral-900-text-muted" />
          <div className="flex items-center gap-4 py-8 text-neutral-900-text">
            <Label className="mr-auto text-[0.9rem] text-neutral-900-text-muted">
              Copyright © 2024 Emil Molt Akademie. Alle Rechte vorbehalten.
            </Label>
            <Link href="https://instagram.com" target="_blank">
              <InstagramIcon />
            </Link>
            <Link href="https://tiktok.com" target="_blank">
              <TikTokIcon />
            </Link>
            <Link href="mailto:info@emil-molt-akademie.de">
              <AtSignIcon size={24} />
            </Link>
          </div>
        </footer>
      </Container>
    </div>
  );
};

type ListProps = ComponentProps<"div"> & {};

const List: FC<ListProps> = ({ className, ...restProps }) => {
  return <div className={cn("", className)} {...restProps} />;
};

type ListHeadingProps = ComponentProps<typeof Heading> & {};

const ListHeading: FC<ListHeadingProps> = ({ className, size = "sm", ...restProps }) => {
  return <Heading className={cn("text-neutral-900-text", className)} {...restProps} size={size} />;
};

type ListContentProps = ComponentProps<"ul"> & {};

const ListContent: FC<ListContentProps> = ({ className, ...restProps }) => {
  return <ul className={cn("flex flex-col gap-2", className)} {...restProps} />;
};

type ListContentItemProps = ComponentProps<"li"> & {};

const ListContentItem: FC<ListContentItemProps> = ({ className, ...restProps }) => {
  return (
    <Label asChild>
      <li className={cn("text-neutral-900-text", className)} {...restProps} />
    </Label>
  );
};
