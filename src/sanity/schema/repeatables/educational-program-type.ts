import { defineType } from "sanity";
import { SchemaTypeDef } from "../../schema";
import { RouteIcon } from "lucide-react";
import { certificateType } from "../parts/certificate";
import { faqFields } from "../parts/faq-fields";

export const educationalProgramType: SchemaTypeDef = {
  definition: defineType({
    name: "educational-program-type",
    title: "Educational program type",
    type: "document",
    icon: RouteIcon,
    fields: [
      {
        name: "name",
        title: "Name",
        type: "string",
        validation: (r) => r.required().min(5).max(30),
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "name",
          maxLength: 30,
        },
        validation: (r) => r.required(),
      },
      {
        name: "color",
        title: "Color",
        type: "color",
        options: { disableAlpha: true },
        validation: (r) => r.required(),
      },
      {
        name: "promotionalHeadline",
        title: "Promotional headline",
        type: "string",
        validation: (r) => r.required().min(10).max(40),
      },
      {
        name: "introduction",
        title: "Introduction",
        type: "text",
        // validation: (r) => r.required().min(50).max(300),
      },
      certificateType,
      {
        name: "educationalPrograms",
        title: "Educational programs",
        type: "object",
        fields: [
          {
            name: "heading",
            title: "Heading",
            type: "string",
          },
          {
            name: "description",
            title: "Description",
            type: "text",
          },
        ],
      },
      {
        name: "followUpTrainingEnabled",
        title: "Show follow-up training",
        type: "boolean",
      },
      {
        name: "followUpTraining",
        title: "Follow-up training",
        type: "object",
        fields: [
          {
            name: "heading",
            title: "Heading",
            type: "string",
          },
          {
            name: "description",
            title: "Description",
            type: "text",
          },
          {
            name: "educationalProgramType",
            title: "Educational program type",
            type: "reference",
            to: { type: "educational-program-type" },
          },
        ],
        hidden: ({ document }) => !document?.followUpTrainingEnabled,
      },
      {
        name: "faq",
        description: "Frequently asked questions",
        type: "object",
        fields: [
          {
            name: "heading",
            title: "Heading",
            type: "string",
          },
          faqFields,
        ],
      },
      {
        name: "alternatives",
        title: "Alternative educational program types",
        type: "object",
        fields: [
          {
            name: "heading",
            title: "Heading",
            type: "string",
          },
          {
            name: "description",
            title: "Description",
            type: "text",
          },
        ],
      },
    ],
    preview: {
      select: {
        title: "name",
        subtitle: "promotionalHeadline",
      },
    },
  }),
};
