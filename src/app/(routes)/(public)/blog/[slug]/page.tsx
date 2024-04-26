import { groq } from "next-sanity";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import { sanity } from "~/sanity/lib/client";
import { PostQueryResult, PostSlugsQueryResult } from "../../../../../../generated/sanity/types";

const postSlugsQuery = groq`*[_type == "post"]{ slug }`;

const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  ...,
  mainImage {asset->{url}},
  author->{name, image{asset->{url}}},
  category->
}`;

export const generateStaticParams = async () => {
  const posts = await sanity.fetch<PostSlugsQueryResult>(postSlugsQuery);
  return posts.map((post) => ({ slug: post.slug?.current || null })).filter((params) => params.slug) as {
    slug: string;
  }[];
};

const PostPage: FC<{ params: { slug: string } }> = async ({ params: { slug } }) => {
  const post = await sanity.fetch<PostQueryResult>(postQuery, { slug });

  return (
    <Container>
      <Heading>{post?.title}</Heading>
      <Paragraph>{post?.excerpt}</Paragraph>
    </Container>
  );
};

export default PostPage;
