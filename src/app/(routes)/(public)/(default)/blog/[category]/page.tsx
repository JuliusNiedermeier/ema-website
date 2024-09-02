import { groq } from "next-sanity";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label } from "~/app/_components/primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import { SparkleIcon } from "lucide-react";
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
import { PostsQueryResult } from "../../../../../../../generated/sanity/types";
import { AuthorTag, AuthorTagImage, AuthorTagName } from "~/app/_components/primitives/author-tag";
import { InteractionBubble } from "~/app/_components/compounds/interaction-bubble";
import { BlogCategorySelector } from "~/app/_components/blocks/blog-category-selector";

const latestPostQuery = groq`*[_type == "post"] | order(publishedAt desc) [0] {
  _id,
  slug,
  title,
  mainImage{asset->{url}},
  publishedAt,
  category->,
  author->{name, image{asset->{url}}},
  excerpt
}`;

const postsQuery = groq`*[_type == "post" && (!defined($category) || category->slug.current == $category)] | order(publishedAt desc) {
  _id,
  slug,
  title,
  mainImage{asset->{url}},
  publishedAt,
  category->,
  author->{name, image{asset->{url}}},
  excerpt
}`;

const BlogPage: FC<{ params: { category: string } }> = async ({ params }) => {
  const categorySlug = params.category === "alle" ? null : params.category;

  const [latestPost, ...posts] = await sanityFetch<PostsQueryResult>(postsQuery, {
    params: { category: categorySlug },
    tags: ["post", "author", "category"],
  });

  if (!latestPost) return <Heading>Noch keine veröffentlichten Beiträge</Heading>;

  return (
    <>
      <div className="bg-neutral-200 pb-16 pt-8">
        <Container className="mt-4">
          <div className="flex items-center gap-4">
            <SparkleIcon />
            <Label>Neu erschienen</Label>
          </div>
          <Link href={`/blog/${latestPost.category?.slug?.current}/${latestPost.slug?.current}`}>
            <PostCard className="mt-4 block">
              <PostCardThumbnail>
                <PostCardThumbnailImage
                  width={1920}
                  height={1080}
                  src={latestPost.mainImage?.asset?.url || ""}
                  alt={latestPost.title || ""}
                  className="max-h-[50vh]"
                />
                <PostCardThumbnailTag>{latestPost.category?.title}</PostCardThumbnailTag>
                <InteractionBubble className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
              </PostCardThumbnail>
              <PostCardTitle size="lg" className="max-w-[40rem]">
                {latestPost.title}
              </PostCardTitle>
              <PostCardMeta>
                <AuthorTag>
                  <AuthorTagImage
                    src={latestPost.author?.image?.asset?.url || ""}
                    alt={latestPost.author?.name || "Author"}
                  />
                  <AuthorTagName>{latestPost.author?.name}</AuthorTagName>
                </AuthorTag>
                <PostCardMetaSeparator />
                <PostCardMetaDate>
                  {new Date(latestPost.publishedAt || "").toLocaleDateString("de", { dateStyle: "full" })}
                </PostCardMetaDate>
              </PostCardMeta>
              <PostCardExcerpt className="max-w-[40rem]">{latestPost.excerpt}</PostCardExcerpt>
            </PostCard>
          </Link>
        </Container>
      </div>

      <Container className="mt-8">
        <BlogCategorySelector currentCategorySlug={params.category || ""} />

        <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-x-4 gap-y-4">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.category?.slug?.current}/${post.slug?.current}`}>
              <PostCard className="h-full border border-neutral-400">
                <PostCardThumbnail>
                  <PostCardThumbnailImage src={post.mainImage?.asset?.url || ""} alt={post.title || ""} />
                  <PostCardThumbnailTag>{post.category?.title}</PostCardThumbnailTag>
                  <InteractionBubble className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                </PostCardThumbnail>
                <PostCardContent>
                  <PostCardTitle className="max-w-60">{post.title}</PostCardTitle>
                  <PostCardMeta>
                    <AuthorTag>
                      <AuthorTagImage src={post.author?.image?.asset?.url || ""} alt={post.author?.name || "Author"} />
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
        </div>
      </Container>
    </>
  );
};

export default BlogPage;
