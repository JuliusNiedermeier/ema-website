import { groq, PortableText, PortableTextComponents, PortableTextTypeComponent } from "next-sanity";
import { Heading, Paragraph } from "../primitives/typography";
import { TextPortableContentQueryResult } from "../../../../generated/sanity/types";
import { FC } from "react";

const textPortableContentQuery = groq`*[_type == "privacy-page"][0]{
    content
  }`;

// Call portableContentQuery here to prevent unused variable warnings
textPortableContentQuery;

type PortableContentArray = NonNullable<NonNullable<TextPortableContentQueryResult>["content"]>;

type CustomPortableContentTypeKey = Exclude<PortableContentArray[number]["_type"], "portableBlock">;

type CustomPortableContentMap = {
  [Type in CustomPortableContentTypeKey]: Extract<PortableContentArray[number], { _type: Type }>;
};

interface Components extends PortableTextComponents {
  types: {
    [Key in keyof CustomPortableContentMap]: PortableTextTypeComponent<{ _type: Key } & CustomPortableContentMap[Key]>;
  };
}

export const portableTextComponents: Components = {
  block: {
    h1: ({ children }) => (
      <Heading tag="h1" className="mb-8 mt-16">
        {children}
      </Heading>
    ),
    h2: ({ children }) => (
      <Heading tag="h2" size="sm" className="mb-8 mt-16">
        {children}
      </Heading>
    ),
    normal: ({ children }) => <Paragraph className="my-8">{children}</Paragraph>,
  },
  types: {},
};

export type TextPortableContentProps = { content: PortableContentArray };

export const TextPortableContent: FC<TextPortableContentProps> = ({ content }) => {
  return <PortableText value={content} components={portableTextComponents} />;
};
