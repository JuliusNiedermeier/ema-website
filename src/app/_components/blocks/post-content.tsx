import { groq, PortableText, PortableTextComponents, PortableTextTypeComponent } from "next-sanity";
import { sanity } from "~/sanity/lib/client";
import { PostContentQueryResult } from "../../../../generated/sanity/types";
import { Heading, Label, Paragraph } from "../primitives/typography";
import Image from "next/image";
import { BasicAccordion } from "../compounds/basic-accordion";
import { FC } from "react";

const postContentQuery = groq`*[_type == "post" && slug.current == $slug][0]{
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset -> { url }
      }
    }
  }`;

type BlockContent = NonNullable<NonNullable<PostContentQueryResult>["body"]>;

type CustomTypeKey = Exclude<BlockContent[number]["_type"], "block">;

type CustomTypeMap = {
  [Type in CustomTypeKey]: Extract<BlockContent[number], { _type: Type }>;
};

interface Components extends PortableTextComponents {
  types: {
    [Key in keyof CustomTypeMap]: PortableTextTypeComponent<{ _type: Key } & CustomTypeMap[Key]>;
  };
}

export const portableTextComponents: Components = {
  block: {
    h1: ({ children }) => <Heading className="mb-8 mt-16">{children}</Heading>,
    h2: ({ children }) => (
      <Heading size="sm" className="mb-8 mt-16">
        {children}
      </Heading>
    ),
    normal: ({ children }) => <Paragraph className="my-8">{children}</Paragraph>,
  },
  types: {
    image: (props) => (
      <div className="my-16">
        <Image
          src={props.value.asset?.url || ""}
          alt={props.value.alt || "Unbenanntes Bild"}
          width="800"
          height="500"
          className="rounded-2xl"
        />
        {props.value.alt && (
          <Label className="mx-16 mt-4 block text-center font-light text-neutral-100-text-muted">
            {props.value.alt}
          </Label>
        )}
      </div>
    ),
    accordion: (props) => (
      <BasicAccordion
        className="my-16"
        items={props.value.items?.map((item) => ({ title: item.question || "", content: item.answer || "" })) || []}
      />
    ),
  },
};

export type PostContentProps = { slug: string };

export const PostContent: FC<PostContentProps> = async ({ slug }) => {
  const post = await sanity.fetch<PostContentQueryResult>(
    postContentQuery,
    { slug },
    { next: { tags: ["post", "author", "category"] } },
  );

  if (!post) return null;

  return <PortableText value={post.body || []} components={portableTextComponents} />;
};
