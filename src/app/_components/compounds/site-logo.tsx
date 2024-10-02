import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import Image from "next/image";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import { WebsiteSettingsQueryResult } from "../../../../generated/sanity/types";

const websiteSettingsQuery = groq`*[_type == "website-settings"][0] {
  websiteTitle,
  logo {
    textLogoDark { asset -> { url } },
    textLogoLight { asset -> { url } },
    logoMarkDark { asset -> { url } },
    logoMarkLight { asset -> { url } }
  }
}`;

export type SiteLogoProps = ComponentProps<"div"> & {
  show?: "mark" | "text" | "both";
  variant?: "dark" | "light";
};

export const SiteLogo: FC<SiteLogoProps> = async ({ className, show = "both", variant = "dark", ...restProps }) => {
  const websiteSettings = await sanityFetch<WebsiteSettingsQueryResult>(websiteSettingsQuery, {
    tags: ["website-settings"],
  });

  const markURL =
    variant === "dark"
      ? websiteSettings?.logo?.logoMarkDark?.asset?.url
      : websiteSettings?.logo?.logoMarkLight?.asset?.url;

  const textURL =
    variant === "dark"
      ? websiteSettings?.logo?.textLogoDark?.asset?.url
      : websiteSettings?.logo?.textLogoLight?.asset?.url;

  return (
    <div className={cn("flex items-center gap-4", className)} {...restProps}>
      {(show === "mark" || show === "both") && (
        <Image
          src={markURL || ""}
          alt={websiteSettings?.websiteTitle || ""}
          width={200}
          height={200}
          className="h-12 w-12"
        />
      )}
      {(show === "text" || show === "both") && (
        <Image
          src={textURL || ""}
          alt={websiteSettings?.websiteTitle || ""}
          width={200}
          height={200}
          className="h-[0.9rem] object-contain object-left"
        />
      )}
    </div>
  );
};
