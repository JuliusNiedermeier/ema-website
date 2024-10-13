import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Tab, TabList } from "../primitives/tabs";
import Link from "next/link";
import { Label } from "../primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import { groq } from "next-sanity";
import { BlogCategoriesQueryResult, BlogCategorySelectorBlogPageQueryResult } from "../../../../generated/sanity/types";

const blogCategoriesQuery = groq`*[_type == "category"] {
    name,
    "slug": slug.current
  }`;

const blogCategorySelectorBlogPageQuery = groq`*[_type == "blog-page"][0] {
  categoryFilterAllLabel
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
  const blogPage = await sanityFetch<BlogCategorySelectorBlogPageQueryResult>(blogCategorySelectorBlogPageQuery, {
    tags: ["blog-page"],
  });

  return (
    <TabList className={cn("w-fit", className)} {...restProps}>
      {[{ name: blogPage?.categoryFilterAllLabel, slug: "alle" }, ...categories].map((category, index) => (
        <Link key={index} href={`/blog/${category.slug}`}>
          <Tab interactive active={currentCategorySlug === category.slug}>
            <Label>{category.name}</Label>
          </Tab>
        </Link>
      ))}
    </TabList>
  );
};
