import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
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
          slogan,
          color,
          slug,
          "readMoreLabel": *[_type == "educational-program-type-page"][0].readMoreLabel
        }
      },
      _type == "portableEducationalProgramCTA" => {
        ...,
        educationalProgram -> {
          name,
          slogan,
          slug,
          "readMoreLabel": *[_type == "educational-program-page"][0].readMoreLabel,
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
  const post = await sanityFetch<PostContentQueryResult>(postContentQuery, {
    params: { slug },
    tags: [
      "post",
      "educational-program-type",
      "educational-program-type-page",
      "educational-program",
      "educational-program-page",
    ],
  });

  if (!post) return null;

  return <DefaultPortableContent content={post.body || []} />;
};
