import { groq } from "next-sanity";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading } from "~/app/_components/primitives/typography";
import { sanity } from "~/sanity/lib/client";
import { PostsQueryResult } from "../../../../../generated/sanity/types";

const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  slug,
  title,
  mainImage,
  publishedAt,
  category->,
  author->
}`;

const BlogPage: FC = async () => {
  const posts = await sanity.fetch<PostsQueryResult>(postsQuery);

  return (
    <Container>
      <Heading>Blog</Heading>
    </Container>
  );
};

export default BlogPage;
