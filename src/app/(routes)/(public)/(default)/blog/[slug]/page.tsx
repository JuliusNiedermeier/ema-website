import { PortableText, groq } from "next-sanity";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading } from "~/app/_components/primitives/typography";
import { sanity } from "~/sanity/lib/client";
import { PostQueryResult, PostSlugsQueryResult } from "../../../../../../../generated/sanity/types";
import { Chip } from "~/app/_components/primitives/chip";
import { notFound } from "next/navigation";
import { PostCardMeta, PostCardMetaDate, PostCardMetaSeparator } from "~/app/_components/primitives/post-card";
import { AuthorTag, AuthorTagImage, AuthorTagName } from "~/app/_components/primitives/author-tag";
import Image from "next/image";
import { portableTextComponents } from "~/app/_components/portable-text-components";

const postSlugsQuery = groq`*[_type == "post"]{ slug }`;

const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  ...,
  mainImage {asset->{url}},
  author->{name, image{asset->{url}}},
  category->
}`;

type Params = { slug: string };
type Props = { params: Params };

export const generateStaticParams = async (): Promise<Params[]> => {
  const posts = await sanity.fetch<PostSlugsQueryResult>(postSlugsQuery);

  return posts
    .map((post) => post.slug?.current)
    .filter((slug) => typeof slug === "string")
    .map((slug) => ({ slug }));
};

const PostPage: FC<Props> = async ({ params: { slug } }) => {
  const post = await sanity.fetch<PostQueryResult>(
    postQuery,
    { slug: decodeURIComponent(slug) },
    { next: { tags: ["post", "author", "category"] } },
  );

  if (!post) notFound();

  return (
    <>
      <div className="bg-neutral-200">
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
        <main className="mt-16">
          <PortableText value={post.body || []} components={portableTextComponents} />
        </main>
      </Container>
    </>
  );
};

export default PostPage;
