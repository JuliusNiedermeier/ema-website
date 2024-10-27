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
import { ResetCookieConsent } from "../compounds/reset-cookie-consent";
import { SanityImage } from "../primitives/sanity-image";

const footerEducationalProgramTypesQuery = groq`*[_type == "educational-program-type"] | order(order asc) {
    ...
}`;

const footerEducationalProgramsQuery = groq`*[_type == "educational-program"] | order(order asc) {
    ...
}`;

const siteFooterQuery = groq`*[_type == "footer-config"][0] {
  ctaHeading,
  cta,
  staticPageLinksHeading,
  educationalProgramLinksHeading,
  "staticPageLinks": {
    "home": *[_type == "home-page"][0].navigationLabel,
    "economySocial": *[_type == "economy-social-page"][0].navigationLabel,
    "art": *[_type == "art-page"][0].navigationLabel,
    "campus": *[_type == "campus-page"][0].navigationLabel,
    "comparison": *[_type == "comparison-page"][0].navigationLabel,
    "blog": *[_type == "blog-page"][0].navigationLabel,
    "contact": *[_type == "contact-page"][0].navigationLabel,
    "infoEvent": *[_type == "info-event-page"][0].navigationLabel,
    "consulting": *[_type == "consulting-page"][0].navigationLabel,
    "fees": *[_type == "fees-page"][0].navigationLabel,
    "jobs": *[_type == "jobs-page"][0].navigationLabel,
  },
  "legalLinks": {
    "privacy": *[_type == "privacy-page"][0].navigationLabel,
    "impressum": *[_type == "impressum-page"][0].navigationLabel
  },
  socialLinks[] {
    logoIcon,
    url
  },
  copyrightNotice,
  cookieSettingsLabel,
  fundingNotice,
  fundingPartners
}`;

export type SiteFooterProps = ComponentProps<"div"> & {};

export const SiteFooter: FC<SiteFooterProps> = async ({ className, ...restProps }) => {
  const footerConfig = await sanityFetch<SiteFooterQueryResult>(siteFooterQuery, {
    tags: [
      "footer-config",
      "home-page",
      "economy-social-page",
      "art-page",
      "campus-page",
      "comparison-page",
      "blog-page",
      "contact-page",
      "info-event-page",
      "consulting-page",
      "fees-page",
      "jobs-page",
      "privacy-page",
      "impressum-page",
    ],
  });

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

  const academyLinkURLList: [keyof NonNullable<typeof footerConfig>["staticPageLinks"], string][] = [
    ["home", "/"],
    ["economySocial", "/about/wirtschaft-und-soziales"],
    ["art", "/about/kunst"],
    ["campus", "/about/campus"],
    ["comparison", "/vergleich"],
    ["blog", "/blog/alle"],
    ["contact", "/kontakt"],
    ["infoEvent", "/kontakt/info-abend"],
    ["consulting", "/kontakt/beratung"],
    ["fees", "/schulbeitrag"],
    ["jobs", "/offene-stellen"],
  ];

  return (
    <div className={cn("bg-neutral-100 pt-8 sm:p-2 sm:pt-8", className)} {...restProps}>
      <div className="rounded-t-3xl bg-primary-900 sm:rounded-b-3xl">
        <Container asChild>
          <footer className="">
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
                  href="/online-bewerbung"
                  className="mt-8 w-full gap-4 bg-primary-100 pl-4 text-primary-100-text sm:w-fit"
                  vairant="outline"
                >
                  <InteractionBubble animated={false} />
                  <Label>{footerConfig?.cta}</Label>
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-16 sm:grid-cols-2">
                <List>
                  <ListHeading>{footerConfig?.staticPageLinksHeading}</ListHeading>
                  <ListContent>
                    {academyLinkURLList.map(([key, URL], index) => (
                      <Link key={index} href={URL}>
                        <ListContentItem>{footerConfig?.staticPageLinks[key]}</ListContentItem>
                      </Link>
                    ))}
                  </ListContent>
                </List>
                <List>
                  <ListHeading>{footerConfig?.educationalProgramLinksHeading}</ListHeading>
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

            <div className="mt-16 h-px bg-neutral-900-text/10" />

            <div className="flex flex-col-reverse justify-between gap-4 py-8 text-neutral-900-text sm:items-stretch lg:flex-row lg:items-center lg:gap-12">
              <Label className="text-[0.9rem] text-neutral-900-text-muted">{footerConfig?.copyrightNotice}</Label>

              <div className="flex flex-col-reverse gap-4 sm:flex-row lg:items-center">
                <div className="flex items-center gap-4 text-neutral-900-text-muted">
                  <Link href="/datenschutz">
                    <Label>{footerConfig?.legalLinks.privacy}</Label>
                  </Link>
                  <Link href="/impressum">
                    <Label>{footerConfig?.legalLinks.impressum}</Label>
                  </Link>
                </div>

                <ResetCookieConsent label={footerConfig?.cookieSettingsLabel || ""} />

                <div className="mb-8 flex items-center gap-4 sm:mb-0 sm:ml-auto lg:ml-0">
                  {footerConfig?.socialLinks?.map((link, index) => (
                    <Link key={index} href={link.url || ""} className="h-6 w-6">
                      <SanityImage
                        key={index}
                        image={link.logoIcon}
                        width={100}
                        height={100}
                        className="h-full w-full object-contain"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-x h-px bg-neutral-900-text/10" />

            <div className="flex flex-col-reverse justify-between gap-4 py-8 text-neutral-900-text sm:items-stretch lg:flex-row lg:items-center lg:gap-12">
              <div>
                <Label className="text-[0.9rem] text-neutral-900-text-muted">{footerConfig?.fundingNotice}</Label>
                <div className="flex flex-wrap items-center gap-4">
                  {footerConfig?.fundingPartners?.map((partner) => (
                    <SanityImage image={partner} width="200" height="200" className="" />
                  ))}
                </div>
              </div>

              <div className="flex flex-col-reverse gap-4 sm:flex-row lg:items-center">
                <Label>Website Konzept & Umsetzung von Julius Niedermeier</Label>
              </div>
            </div>
          </footer>
        </Container>
      </div>
    </div>
  );
};

type ListProps = ComponentProps<"div"> & {};

const List: FC<ListProps> = ({ className, ...restProps }) => {
  return <div className={cn("", className)} {...restProps} />;
};

type ListHeadingProps = ComponentProps<typeof Heading> & {};

const ListHeading: FC<ListHeadingProps> = ({ className, size = "sm", ...restProps }) => {
  return <Heading tag="h3" className={cn("text-neutral-900-text", className)} {...restProps} size={size} />;
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
