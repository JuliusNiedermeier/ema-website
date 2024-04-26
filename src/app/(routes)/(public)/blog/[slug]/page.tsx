import { groq } from "next-sanity";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label } from "~/app/_components/primitives/typography";
import { sanity } from "~/sanity/lib/client";
import { PostSlugsQueryResult } from "../../../../../../generated/sanity/types";

const postSlugsQuery = groq`*[_type == "post"]{ slug }`;

export const generateStaticParams = async () => {
  const posts = await sanity.fetch<PostSlugsQueryResult>(postSlugsQuery);
  return posts.map((post) => ({ slug: post.slug?.current || null })).filter((params) => params.slug) as {
    slug: string;
  }[];
};

const PostPage: FC<{ params: { slug: string } }> = ({ params }) => {
  return (
    <Container>
      <Heading>Post</Heading>
      <Label>{params.slug}</Label>
    </Container>
  );
};

export default PostPage;
