import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Tab, TabList } from "../primitives/tabs";
import Link from "next/link";
import { Label } from "../primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import { groq } from "next-sanity";
import { BlogCategoriesQueryResult } from "../../../../generated/sanity/types";

const blogCategoriesQuery = groq`*[_type == "category"] {
    title,
    "slug": slug.current
  }`;

export type BlogCategorySelectorProps = ComponentProps<typeof TabList> & {
  currentCategorySlug: string;
};

export const BlogCategorySelector: FC<BlogCategorySelectorProps> = async ({
  className,
  currentCategorySlug,
  ...restProps
}) => {
  const categories = await sanityFetch<BlogCategoriesQueryResult>(blogCategoriesQuery, { tags: ["category"] });

  return (
    <TabList className={cn("w-fit", className)} {...restProps}>
      {[{ title: "Alle", slug: "alle" }, ...categories].map((category, index) => (
        <Link key={index} href={`/blog/${category.slug}`}>
          <Tab interactive active={currentCategorySlug === category.slug}>
            <Label>{category.title}</Label>
          </Tab>
        </Link>
      ))}
    </TabList>
  );
};
