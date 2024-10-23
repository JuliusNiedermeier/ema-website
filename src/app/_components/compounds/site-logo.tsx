import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import { WebsiteSettingsQueryResult } from "../../../../generated/sanity/types";
import { SanityImage } from "../primitives/sanity-image";

const websiteSettingsQuery = groq`*[_type == "website-settings"][0] {
  logo
}`;

export type SiteLogoProps = ComponentProps<"div"> & {
  show?: "mark" | "text" | "both";
  variant?: "dark" | "light";
};

export const SiteLogo: FC<SiteLogoProps> = async ({ className, show = "both", variant = "dark", ...restProps }) => {
  const websiteSettings = await sanityFetch<WebsiteSettingsQueryResult>(websiteSettingsQuery, {
    tags: ["website-settings"],
  });

  const markImage = variant === "dark" ? websiteSettings?.logo?.logoMarkDark : websiteSettings?.logo?.logoMarkLight;
  const textImage = variant === "dark" ? websiteSettings?.logo?.textLogoDark : websiteSettings?.logo?.textLogoLight;

  return (
    <div className={cn("flex items-center gap-4", className)} {...restProps}>
      {(show === "mark" || show === "both") && (
        <SanityImage image={markImage} width={200} height={200} className="h-12 w-12" />
      )}
      {(show === "text" || show === "both") && (
        <SanityImage image={textImage} width={200} height={200} className="h-[0.9rem] object-contain object-left" />
      )}
    </div>
  );
};
