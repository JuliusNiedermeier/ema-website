import { groq, PortableText, PortableTextComponents, PortableTextTypeComponent } from "next-sanity";
import { createColorThemeStyles, ensureValidHSL } from "~/app/_utils/color-swatch";
import { Heading, Label, Paragraph } from "../primitives/typography";
import Image from "next/image";
import { BasicAccordion } from "./basic-accordion";
import Link from "next/link";
import { Card } from "../primitives/card";
import { Button } from "../primitives/button";
import { InteractionBubble } from "./interaction-bubble";
import { Chip } from "../primitives/chip";
import { BlockContentQueryResult } from "../../../../generated/sanity/types";
import { FC } from "react";

const blockContentQuery = groq`*[_type == "post"][0]{
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset -> { url }
      },
      _type == "educationalProgramTypeCTA" => {
        ...,
        educationalProgramType -> {
          name,
          promotionalHeadline,
          color,
          slug,
          readMoreLabel
        }
      },
      _type == "educationalProgramCTA" => {
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

// Call blockContentQuery here to prevent unused variable warnings
blockContentQuery;

type BlockContentArray = NonNullable<NonNullable<BlockContentQueryResult>["body"]>;

type CustomBlockContentTypeKey = Exclude<BlockContentArray[number]["_type"], "block">;

type CustomBlockContentMap = {
  [Type in CustomBlockContentTypeKey]: Extract<BlockContentArray[number], { _type: Type }>;
};

interface Components extends PortableTextComponents {
  types: {
    [Key in keyof CustomBlockContentMap]: PortableTextTypeComponent<{ _type: Key } & CustomBlockContentMap[Key]>;
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
    image: (props) => {
      return (
        <div className="my-16">
          <Image
            src={props.value.asset?.url || ""}
            alt={props.value.alt || ""}
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
      );
    },
    accordion: (props) => {
      return (
        <BasicAccordion
          className="my-16"
          items={props.value.items?.map((item) => ({ title: item.question || "", content: item.answer || "" })) || []}
        />
      );
    },
    educationalProgramTypeCTA: (props) => {
      return (
        <Link href={`/bildungswege/${props.value.educationalProgramType?.slug?.current}`} className="group">
          <Card
            className="my-16 rounded-3xl border border-neutral-400 bg-transparent p-2 transition-colors group-hover:border-neutral-900"
            style={createColorThemeStyles(ensureValidHSL(props.value.educationalProgramType?.color?.hsl))}
          >
            <div className="p-6 text-center">
              <Heading className="mb-0">{props.value.heading}</Heading>
              <Paragraph>{props.value.description}</Paragraph>
            </div>
            <Card className="flex flex-col gap-8 bg-themed-primary transition-colors group-hover:bg-themed-secondary md:flex-row md:items-center">
              <div className="flex-1">
                <Heading size="sm" className="mb-0">
                  {props.value.educationalProgramType?.name}
                </Heading>
                <Paragraph>{props.value.educationalProgramType?.promotionalHeadline}</Paragraph>
              </div>
              <Button
                vairant="outline"
                size="sm"
                className="w-full flex-row-reverse gap-4 pl-1 md:w-auto md:flex-row md:pl-6 md:pr-1"
              >
                <Label className="flex-1 text-center">{props.value.educationalProgramType?.readMoreLabel}</Label>
                <InteractionBubble animated={false} />
              </Button>
            </Card>
          </Card>
        </Link>
      );
    },
    educationalProgramCTA: (props) => {
      return (
        <Link href={`/bildungswege/${props.value.educationalProgram?.slug?.current}`} className="group">
          <Card
            className="my-16 rounded-3xl border border-neutral-400 bg-transparent p-2 transition-colors group-hover:border-neutral-900"
            style={createColorThemeStyles(
              ensureValidHSL(props.value.educationalProgram?.educationalProgramType?.color?.hsl),
            )}
          >
            <div className="p-6 text-center">
              <Heading className="mb-0">{props.value.heading}</Heading>
              <Paragraph>{props.value.description}</Paragraph>
            </div>
            <Card className="flex flex-col gap-8 bg-themed-primary transition-colors group-hover:bg-themed-secondary md:flex-row md:items-center">
              <div className="flex-1">
                <Chip className="border border-neutral-900/20 bg-themed-secondary">
                  <Label>{props.value.educationalProgram?.educationalProgramType?.name}</Label>
                </Chip>
                <Heading size="sm" className="mb-0 mt-6">
                  {props.value.educationalProgram?.name}
                </Heading>
                <Paragraph>{props.value.educationalProgram?.promotionalHeadline}</Paragraph>
              </div>
              <Button
                vairant="outline"
                size="sm"
                className="w-full flex-row-reverse gap-4 pl-1 md:w-auto md:flex-row md:pl-6 md:pr-1"
              >
                <Label className="flex-1 text-center">{props.value.educationalProgram?.readMoreLabel}</Label>
                <InteractionBubble animated={false} />
              </Button>
            </Card>
          </Card>
        </Link>
      );
    },
  },
};

export type BlockContentProps = { blockContent: BlockContentArray };

export const BlockContent: FC<BlockContentProps> = ({ blockContent }) => {
  return <PortableText value={blockContent} components={portableTextComponents} />;
};