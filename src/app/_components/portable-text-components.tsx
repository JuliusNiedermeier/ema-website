import { PortableText } from "next-sanity";
import { ComponentProps } from "react";
import { Heading, Paragraph } from "./primitives/typography";

export const portableTextComponents: ComponentProps<typeof PortableText>["components"] = {
  block: {
    h1: ({ children }) => <Heading>{children}</Heading>,
    h2: ({ children }) => <Heading size="sm">{children}</Heading>,
    normal: ({ children }) => <Paragraph>{children}</Paragraph>,
  },
};
