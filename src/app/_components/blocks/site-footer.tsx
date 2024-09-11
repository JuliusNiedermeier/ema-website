import { ComponentProps, FC, Fragment } from "react";
import { cn } from "~/app/_utils/cn";
import { Container } from "../primitives/container";
import { SiteLogo } from "../compounds/site-logo";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import {
  FooterEducationalProgramTypesQueryResult,
  FooterEducationalProgramsQueryResult,
  SiteFooterQueryResult,
} from "../../../../generated/sanity/types";
import Link from "next/link";
import { Button } from "../primitives/button";
import { InteractionBubble } from "../compounds/interaction-bubble";
import Image from "next/image";
import { ResetCookieConsent } from "../compounds/reset-cookie-consent";

const footerEducationalProgramTypesQuery = groq`*[_type == "educational-program-type"]{
    ...
}`;

const footerEducationalProgramsQuery = groq`*[_type == "educational-program"]{
    ...
}`;

const siteFooterQuery = groq`*[_type == "footer-config"][0] {
  ...,
  socialLinks[] {
    ...,
    logoIcon { asset -> { url } }
  }
}`;

export type SiteFooterProps = ComponentProps<"div"> & {};

export const SiteFooter: FC<SiteFooterProps> = async ({ className, ...restProps }) => {
  const footerConfig = await sanityFetch<SiteFooterQueryResult>(siteFooterQuery, { tags: ["footer-config"] });

  const programTypes = await sanityFetch<FooterEducationalProgramTypesQueryResult>(footerEducationalProgramTypesQuery, {
    tags: ["educational-program-type"],
  });

  const programs = await sanityFetch<FooterEducationalProgramsQueryResult>(footerEducationalProgramsQuery, {
    tags: ["educational-program"],
  });

  const programTypesWithPrograms = programTypes.map((programType) => ({
    ...programType,
    programs: programs.filter((program) => program.educationalProgramType?._ref === programType._id),
  }));

  const academyLinkLabelMap = footerConfig?.linkSections?.academy?.links || {};

  const academyLinkURLList: [keyof typeof academyLinkLabelMap, string][] = [
    ["home", "/"],
    ["economySocial", "/about/wirtschaft-und-soziales"],
    ["art", "/about/kunst"],
    ["campus", "/about/campus"],
    ["blog", "/blog/alle"],
    ["contact", "/kontakt"],
    ["infoEvent", "/kontakt/info-abend"],
    ["consulting", "/kontakt/beratung"],
    ["fees", "/schulbeitrag"],
    ["jobs", "/offene-stellen"],
  ];

  return (
    <div
      className={cn("mt-8 rounded-t-3xl border-b-0 bg-primary-900 sm:m-2 sm:mt-8 sm:rounded-b-3xl", className)}
      {...restProps}
    >
      <Container asChild>
        <footer className="p-4 sm:p-0">
          <div className="flex flex-col justify-between gap-12 pt-28 sm:gap-40 lg:flex-row">
            <div>
              <SiteLogo show="mark" variant="light" />
              <SiteLogo show="text" variant="light" className="mt-4" />
              <Paragraph className="mt-8 text-neutral-900-text">
                {footerConfig?.ctaHeading?.split(".").map((part, index, parts) => (
                  <>
                    {part}
                    {index < parts.length - 1 && (
                      <>
                        .<br />
                      </>
                    )}
                  </>
                ))}
              </Paragraph>
              <Button
                href="/go"
                className="mt-8 w-full gap-4 bg-primary-100 pl-4 text-primary-100-text sm:w-fit"
                vairant="outline"
              >
                <InteractionBubble animated={false} />
                <Label>{footerConfig?.cta}</Label>
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-16 sm:grid-cols-2">
              <List>
                <ListHeading>{footerConfig?.linkSections?.academy?.heading}</ListHeading>
                <ListContent>
                  {academyLinkURLList.map(([key, URL], index) => (
                    <Link key={index} href={URL}>
                      <ListContentItem>{academyLinkLabelMap[key]}</ListContentItem>
                    </Link>
                  ))}
                </ListContent>
              </List>
              <List>
                <ListHeading>{footerConfig?.linkSections?.programs?.heading}</ListHeading>
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
            </div>
          </div>
          <div className="mt-16 h-px bg-neutral-900-text-muted" />
          <div className="flex flex-col-reverse justify-between gap-4 py-8 text-neutral-900-text sm:items-stretch lg:flex-row lg:items-center lg:gap-12">
            <Label className="text-balance text-[0.9rem] text-neutral-900-text-muted">
              {footerConfig?.copyrightNotice}
            </Label>

            <div className="flex flex-col-reverse gap-4 sm:flex-row lg:items-center">
              <div className="flex items-center gap-4 text-neutral-900-text-muted">
                <Link href="/datenschutz">
                  <Label>{footerConfig?.legalLinks?.privacy}</Label>
                </Link>
                <Link href="/impressum">
                  <Label>{footerConfig?.legalLinks?.impressum}</Label>
                </Link>
              </div>

              <ResetCookieConsent label="Cookie-Einstellungen" />

              <div className="mb-8 flex items-center gap-4 sm:mb-0 sm:ml-auto lg:ml-0">
                {footerConfig?.socialLinks?.map((link, index) => (
                  <Link key={index} href={link.url || ""} className="h-6 w-6">
                    <Image
                      key={index}
                      src={link.logoIcon?.asset?.url || ""}
                      width={100}
                      height={100}
                      alt={link.platformName || ""}
                      className="h-full w-full object-contain"
                    />
                  </Link>
                ))}
              </div>
            </div>
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
