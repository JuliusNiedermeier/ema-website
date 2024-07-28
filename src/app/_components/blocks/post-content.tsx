import { groq } from "next-sanity";
import { sanity } from "~/sanity/lib/client";
import { PostContentQueryResult } from "../../../../generated/sanity/types";
import { FC } from "react";
import { DefaultPortableContent } from "../compounds/default-portable-content";

const postContentQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  body[] {
    ...,
      _type == "portableImage" => {
        ...,
        asset -> { url }
      },
      _type == "portableEducationalProgramTypeCTA" => {
        ...,
        educationalProgramType -> {
          name,
          promotionalHeadline,
          color,
          slug,
          readMoreLabel
        }
      },
      _type == "portableEducationalProgramCTA" => {
        ...,
        educationalProgram -> {
          name,
          promotionalHeadline,
          slug,
          readMoreLabel,
          educationalProgramType -> {
            name,
            color
          }
        }
      }
  }
}`;

export type PostContentProps = { slug: string };

export const PostContent: FC<PostContentProps> = async ({ slug }) => {
  const post = await sanity.fetch<PostContentQueryResult>(postContentQuery, { slug }, { next: { tags: ["post"] } });

  if (!post) return null;

  return <DefaultPortableContent content={post.body || []} />;
};
