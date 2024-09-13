import { groq } from "next-sanity";
import { FC, Suspense } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import {
  PostPageQueryResult,
  PostQueryResult,
  PostSlugsQueryResult,
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

const postSlugsQuery = groq`*[_type == "post"]{ slug, category -> { slug } }`;

const postQuery = groq`*[_type == "post" && category->slug.current == $category && slug.current == $slug][0]{
  ...,
  mainImage {asset->{url}},
  author->{name, image{asset->{url}}},
  category->,
}`;

const relatedPostsQuery = groq`*[_type == "post" && category._ref == $currentPostCategoryID && _id != $currentPostID][0...3]{
  title,
  mainImage { asset -> { url } },
  slug,
  category->
}`;

const postPageQuery = groq`*[_type == "post-page"][0]`;

type Params = { category: string; slug: string };
type Props = { params: Params };

export const generateStaticParams = async (): Promise<Partial<Params>[]> => {
  const posts = await sanityFetch<PostSlugsQueryResult>(postSlugsQuery, { draftMode: false });

  return posts.map((post) => ({ category: post.category?.slug?.current, slug: post.slug?.current }));
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
    tags: ["post", "category"],
  });

  const postPage = await sanityFetch<PostPageQueryResult>(postPageQuery, { tags: ["post-page"] });

  return (
    <>
      <div className="pt-header bg-neutral-200">
        <Container width="narrow" className="flex flex-col pt-20 sm:items-center sm:pt-32">
          <Chip>{post.category?.title}</Chip>
          <Heading className="mt-8 sm:mt-16 sm:text-center">{post.title}</Heading>
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
        </Container>
      </div>

      <div className="relative pt-8">
        <div className="absolute left-0 top-0 -z-10 h-1/2 w-full bg-neutral-200"></div>
        <Container>
          <Image
            width={1920}
            height={1080}
            src={post.mainImage?.asset?.url || ""}
            alt={post.title || ""}
            className="aspect-video rounded-2xl object-cover"
          />
        </Container>
      </div>

      <Container width="narrow">
        <Suspense>
          <main className="mb-8 mt-32">
            <PostContent slug={slug} />
          </main>
        </Suspense>

        <div>
          <AuthorTag>
            <AuthorTagImage
              className="h-12 w-12"
              src={post.author?.image?.asset?.url || ""}
              alt={post.author?.name || "Author"}
            />
            <div>
              <AuthorTagName>{`${postPage?.metadata?.authorPrefix} ${post.author?.name}`}</AuthorTagName>
              <Label className="block text-neutral-100-text-muted">
                {`${postPage?.metadata?.datePrefix} ${new Date(post.publishedAt || "").toLocaleDateString("de", { dateStyle: "full" })}`}
              </Label>
            </div>
          </AuthorTag>
        </div>
      </Container>

      <Container className="mt-16">
        <LatestPosts
          heading={postPage?.relatedPosts?.heading || ""}
          allPostsLabel={postPage?.relatedPosts?.allPostsLabel || ""}
          posts={relatedPosts.map((post) => ({
            title: post.title || "",
            imageURL: post.mainImage?.asset?.url || "",
            slug: post.slug?.current || "",
            category: { title: post.category?.title || "", slug: post.category?.slug?.current || "" },
          }))}
        />

        <Container width="narrow" className="mt-32 text-center">
          <Heading>{postPage?.educationalProgramTypes?.heading}</Heading>
          <Paragraph>{postPage?.educationalProgramTypes?.description}</Paragraph>
        </Container>
        <EducationalProgramTypeCards className="mt-16" />
      </Container>
    </>
  );
};

export default PostPage;
