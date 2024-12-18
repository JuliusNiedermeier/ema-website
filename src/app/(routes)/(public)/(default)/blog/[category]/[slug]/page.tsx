import { groq } from "next-sanity";
import { FC, Suspense } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import {
  PostPageQueryResult,
  PostQueryResult,
  PostSlugsQueryResult,
  PostMetaQueryResult,
  RelatedPostsQueryResult,
} from "../../../../../../../../generated/sanity/types";
import { Chip } from "~/app/_components/primitives/chip";
import { notFound } from "next/navigation";
import { PostCardMeta, PostCardMetaDate, PostCardMetaSeparator } from "~/app/_components/primitives/post-card";
import { AuthorTag, AuthorTagImage, AuthorTagName } from "~/app/_components/primitives/author-tag";
import Image from "next/image";
import { PostContent } from "~/app/_components/blocks/post-content";
import { EducationalProgramTypeCards } from "~/app/_components/blocks/educational-program-type-cards";
import { LatestPosts } from "~/app/_components/blocks/latest-posts";
import { Metadata } from "next";
import { SanityImage } from "~/app/_components/primitives/sanity-image";

const postSlugsQuery = groq`*[_type == "post"]{ slug, category -> { slug } }`;

const postQuery = groq`*[_type == "post" && category->slug.current == $category && slug.current == $slug][0]{
  ...,
  mainImage,
  author -> { name, image },
  category->
}`;

const relatedPostsQuery = groq`*[_type == "post" && category._ref == $currentPostCategoryID && _id != $currentPostID][0...3]{
  name,
  mainImage,
  slug,
  category->,
  author -> { name, image },
}`;

const postMetaQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  "title": coalesce(seo.title, ""),
  "description": coalesce(seo.description, ""),
}`;

const postPageQuery = groq`*[_type == "post-page"][0]`;

type Params = { category: string; slug: string };
type Props = { params: Params };

export const generateStaticParams = async (): Promise<Partial<Params>[]> => {
  const posts = await sanityFetch<PostSlugsQueryResult>(postSlugsQuery, { draftMode: false });

  return posts.map((post) => ({ category: post.category?.slug?.current, slug: post.slug?.current }));
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const data = await sanityFetch<PostMetaQueryResult>(postMetaQuery, {
    params: { slug: params.slug },
    tags: ["post"],
  });
  return { title: data?.title, description: data?.description };
};

const PostPage: FC<Props> = async ({ params: { category, slug } }) => {
  const post = await sanityFetch<PostQueryResult>(postQuery, {
    params: { category: decodeURIComponent(category), slug: decodeURIComponent(slug) },
    tags: ["post", "author", "category"],
  });

  if (!post) notFound();

  const relatedPosts = await sanityFetch<RelatedPostsQueryResult>(relatedPostsQuery, {
    params: {
      currentPostCategoryID: post.category?._id,
      currentPostID: post._id,
    },
    tags: ["post", "category", "author"],
  });

  const postPage = await sanityFetch<PostPageQueryResult>(postPageQuery, { tags: ["post-page"] });

  return (
    <>
      <div className="bg-neutral-200 pt-header">
        <Container width="narrow" className="flex flex-col pt-20 sm:items-center sm:pt-32">
          <Chip>
            <Label>{post.category?.name}</Label>
          </Chip>
          <Heading tag="h1" className="mt-8 sm:mt-16 sm:text-center">
            {post.name}
          </Heading>
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
        </Container>
      </div>

      <div className="relative pt-8">
        <div className="absolute left-0 top-0 -z-10 h-1/2 w-full bg-neutral-200"></div>
        <Container className="relative aspect-video overflow-hidden rounded-2xl">
          <SanityImage image={post.mainImage} fill />
        </Container>
      </div>

      <Container width="narrow">
        <Suspense>
          <main className="mt-32">
            <PostContent slug={slug} />
          </main>
        </Suspense>

        <div className="mt-24">
          <Heading tag="h2">{post.educationalProgramTypes?.heading}</Heading>
          <Paragraph>{post.educationalProgramTypes?.introduction}</Paragraph>
        </div>

        <EducationalProgramTypeCards className="mt-16" />

        <div className="mt-24">
          <AuthorTag>
            <AuthorTagImage image={post.author?.image} className="h-12 w-12" />
            <div>
              <AuthorTagName>{`${postPage?.authorPrefix} ${post.author?.name}`}</AuthorTagName>
              <Label className="block text-neutral-100-text-muted">
                {`${postPage?.datePrefix} ${new Date(post.publishedAt || "").toLocaleDateString("de", { dateStyle: "full" })}`}
              </Label>
            </div>
          </AuthorTag>
        </div>
      </Container>

      <Container className="mt-32 md:mt-48">
        <LatestPosts
          heading={postPage?.relatedPosts?.heading || ""}
          allPostsLabel={postPage?.relatedPosts?.allPostsLabel || ""}
          posts={relatedPosts.map((post) => ({
            title: post.name || "",
            image: post.mainImage,
            slug: post.slug?.current || "",
            category: { name: post.category?.name || "", slug: post.category?.slug?.current || "" },
            author: {
              name: post.author?.name || "",
              image: post.author?.image,
            },
          }))}
        />
      </Container>
    </>
  );
};

export default PostPage;
