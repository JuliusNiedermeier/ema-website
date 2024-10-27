import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import {
  AboutMenuArtQueryResult,
  AboutMenuCampusQueryResult,
  AboutMenuEconomySocialQueryResult,
} from "../../../../../../generated/sanity/types";
import { AboutMenuItem } from "~/app/_components/compounds/about-menu-item";

const aboutMenuArtQuery = groq`*[_type == "art-page"][0]{
  navigationLabel,
  teaser,
  "image": artSubjects[0].image
}`;

const aboutMenuCampusQuery = groq`*[_type == "campus-page"][0]{
  navigationLabel,
  teaser,
  "image": staff[0].image
}`;

const aboutMenuEconomySocialQuery = groq`*[_type == "economy-social-page"][0]{
  navigationLabel,
  teaser,
  teaserImage
}`;

export type AboutMenuProps = ComponentProps<"div"> & {};

export const AboutMenu: FC<AboutMenuProps> = async ({ className, ...restProps }) => {
  const [art, campus, economySocial] = await Promise.all([
    sanityFetch<AboutMenuArtQueryResult>(aboutMenuArtQuery, { tags: ["art-page"] }),
    sanityFetch<AboutMenuCampusQueryResult>(aboutMenuCampusQuery, { tags: ["campus-page"] }),
    sanityFetch<AboutMenuEconomySocialQueryResult>(aboutMenuEconomySocialQuery, {
      tags: ["economy-social-page"],
    }),
  ]);

  const links: Pick<ComponentProps<typeof AboutMenuItem>, "href" | "heading" | "description" | "image">[] = [
    {
      href: "/about/wirtschaft-und-soziales",
      heading: economySocial?.navigationLabel || "",
      description: economySocial?.teaser || "",
      image: economySocial?.teaserImage,
    },
    {
      href: "/about/kunst",
      heading: art?.navigationLabel || "",
      description: art?.teaser || "",
      image: art?.image,
    },
    {
      href: "/about/campus",
      heading: campus?.navigationLabel || "",
      description: campus?.teaser || "",
      image: campus?.image,
    },
  ];

  return (
    <div className={cn("grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-3 p-3", className)} {...restProps}>
      {links.map((link, index) => (
        <AboutMenuItem key={index} {...link} />
      ))}
    </div>
  );
};
