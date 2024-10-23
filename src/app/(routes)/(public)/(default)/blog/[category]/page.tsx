import { groq } from "next-sanity";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import { CalendarClockIcon, SparkleIcon } from "lucide-react";
import Link from "next/link";
import {
  PostCard,
  PostCardContent,
  PostCardExcerpt,
  PostCardMeta,
  PostCardMetaDate,
  PostCardMetaSeparator,
  PostCardThumbnail,
  PostCardThumbnailImage,
  PostCardThumbnailTag,
  PostCardTitle,
} from "~/app/_components/primitives/post-card";
import {
  BlogPageMetaQueryResult,
  BlogPageQueryResult,
  PostsQueryResult,
} from "../../../../../../../generated/sanity/types";
import { AuthorTag, AuthorTagImage, AuthorTagName } from "~/app/_components/primitives/author-tag";
import { InteractionBubble } from "~/app/_components/compounds/interaction-bubble";
import { BlogCategorySelector } from "~/app/_components/blocks/blog-category-selector";
import { IconChip } from "~/app/_components/primitives/icon-chip";
import { createGenerateMetadata } from "~/app/_utils/create-generate-meta";

const blogPageQuery = groq`*[_type == "blog-page"][0] {
  ...
}`;

const postsQuery = groq`*[_type == "post" && (!defined($category) || category->slug.current == $category)] | order(publishedAt desc) {
  _id,
  slug,
  name,
  mainImage,
  publishedAt,
  category->,
  author -> { name, image },
  excerpt
}`;

const blogPageMetaQuery = groq`*[_type == "blog-page"][0]{
  "title": coalesce(seo.title, ""),
  "description": coalesce(seo.description, ""),
}`;

export const generateMetadata = createGenerateMetadata<BlogPageMetaQueryResult>(blogPageMetaQuery, {
  tags: ["blog-page"],
});

const BlogPage: FC<{ params: { category: string } }> = async ({ params }) => {
  const categorySlug = params.category === "alle" ? null : params.category;

  const blogPage = await sanityFetch<BlogPageQueryResult>(blogPageQuery, { tags: ["blog-page"] });

  const [latestPost, ...posts] = await sanityFetch<PostsQueryResult>(postsQuery, {
    params: { category: categorySlug },
    tags: ["post", "author", "category"],
  });

  return (
    <>
      <div className="bg-neutral-200 pt-header">
        <Container className="mt-12 md:mt-32">
          <div className="max-w-[40rem]">
            <Heading tag="h2" size="sm" className="text-neutral-100-text-muted">
              {blogPage?.preHeading}
            </Heading>
            <Heading tag="h1">{blogPage?.heading}</Heading>
            <Paragraph>{blogPage?.description}</Paragraph>
          </div>
          <BlogCategorySelector
            currentCategorySlug={params.category || ""}
            className="scrollbar-none mt-8 max-w-full"
          />
        </Container>
      </div>

      <div className="bg-gradient-to-b from-neutral-200 to-transparent pt-12 md:pt-16">
        <Container>
          {latestPost ? (
            <>
              <div className="flex items-center gap-4">
                <SparkleIcon />
                <Label>{blogPage?.latestPostLabel}</Label>
              </div>
              <Link
                href={`/blog/${latestPost.category?.slug?.current}/${latestPost.slug?.current}`}
                className="mt-4 block"
              >
                <PostCard className="bg-neutral-100 transition-colors">
                  <PostCardThumbnail>
                    <PostCardThumbnailImage
                      width={1920}
                      height={1080}
                      image={latestPost.mainImage}
                      className="max-h-[50vh]"
                    />
                    <PostCardThumbnailTag>
                      <Label>{latestPost.category?.name}</Label>
                    </PostCardThumbnailTag>
                    <InteractionBubble className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </PostCardThumbnail>
                  <PostCardContent className="md:mt-4">
                    <PostCardTitle size="lg" className="max-w-[40rem]">
                      {latestPost.name}
                    </PostCardTitle>
                    <PostCardMeta>
                      <AuthorTag>
                        <AuthorTagImage image={latestPost.author?.image} />
                        <AuthorTagName>{latestPost.author?.name}</AuthorTagName>
                      </AuthorTag>
                      <PostCardMetaSeparator />
                      <PostCardMetaDate>
                        {new Date(latestPost.publishedAt || "").toLocaleDateString("de", { dateStyle: "full" })}
                      </PostCardMetaDate>
                    </PostCardMeta>
                    <PostCardExcerpt className="max-w-[40rem]">{latestPost.excerpt}</PostCardExcerpt>
                  </PostCardContent>
                </PostCard>
              </Link>
            </>
          ) : (
            <div className="flex flex-col gap-4 md:flex-row">
              <PostCard className="h-auto flex-[2] bg-primary-900 p-8">
                <div className="flex max-w-[30rem] flex-col">
                  <IconChip className="bg-neutral-100/10">
                    <CalendarClockIcon />
                  </IconChip>
                  <div className="mt-auto pt-8">
                    <Heading tag="h3" size="sm" className="text-neutral-900-text">
                      {blogPage?.placeholder?.heading}
                    </Heading>
                    <Paragraph className="text-neutral-900-text-muted">{blogPage?.placeholder?.description}</Paragraph>
                  </div>
                </div>
              </PostCard>
              <PostCard className="h-auto flex-1 bg-neutral-100">
                <PostCardThumbnail className="aspect-video rounded-2xl bg-neutral-400">
                  <PostCardThumbnailTag className="">
                    <Label>{blogPage?.placeholder?.preHeading}</Label>
                  </PostCardThumbnailTag>
                </PostCardThumbnail>
                <PostCardContent>
                  <div className="h-8 w-full rounded-xl bg-neutral-400" />
                  <div className="mt-2 h-4 w-full rounded-xl bg-neutral-300" />
                  <div className="mt-2 h-4 w-2/3 rounded-xl bg-neutral-300" />
                </PostCardContent>
              </PostCard>
            </div>
          )}
        </Container>
      </div>

      <Container className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-x-4 gap-y-4">
        {posts.map((post) => (
          <Link key={post._id} href={`/blog/${post.category?.slug?.current}/${post.slug?.current}`}>
            <PostCard className="h-full border border-neutral-400">
              <PostCardThumbnail>
                <PostCardThumbnailImage image={post.mainImage} />
                <PostCardThumbnailTag>
                  <Label>{post.category?.name}</Label>
                </PostCardThumbnailTag>
                <InteractionBubble className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
              </PostCardThumbnail>
              <PostCardContent>
                <PostCardTitle className="max-w-60">{post.name}</PostCardTitle>
                <PostCardMeta>
                  <AuthorTag>
                    <AuthorTagImage image={post.author?.image} />
                    <AuthorTagName>{post.author?.name}</AuthorTagName>
                  </AuthorTag>
                  <PostCardMetaSeparator />
                  <PostCardMetaDate>
                    {new Date(post.publishedAt || "").toLocaleDateString("de", { dateStyle: "full" })}
                  </PostCardMetaDate>
                </PostCardMeta>
                <PostCardExcerpt className="line-clamp-4">{post.excerpt}</PostCardExcerpt>
              </PostCardContent>
            </PostCard>
          </Link>
        ))}
      </Container>
    </>
  );
};

export default BlogPage;
