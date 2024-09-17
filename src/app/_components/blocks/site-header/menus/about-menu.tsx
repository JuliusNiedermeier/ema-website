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
  preview {
    excerpt,
    image { asset -> { url } }
  }
}`;

const aboutMenuCampusQuery = groq`*[_type == "campus-page"][0]{
  navigationLabel,
  previewText,
  previewImage { asset -> { url } }
}`;

const aboutMenuEconomySocialQuery = groq`*[_type == "economy-social-page"][0]{
  navigationLabel,
  previewText,
  previewImage { asset -> { url } }
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

  const links: Pick<ComponentProps<typeof AboutMenuItem>, "href" | "heading" | "description" | "imageURL">[] = [
    {
      href: "/about/wirtschaft-und-soziales",
      heading: economySocial?.navigationLabel || "",
      description: economySocial?.previewText || "",
      imageURL: economySocial?.previewImage?.asset?.url || "",
    },
    {
      href: "/about/kunst",
      heading: art?.navigationLabel || "",
      description: art?.preview?.excerpt || "",
      imageURL: art?.preview?.image?.asset?.url || "",
    },
    {
      href: "/about/campus",
      heading: campus?.navigationLabel || "",
      description: campus?.previewText || "",
      imageURL: campus?.previewImage?.asset?.url || "",
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
