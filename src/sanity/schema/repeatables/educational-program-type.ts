import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
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
      defineField({
        name: "name",
        title: "Name",
        type: "string",
        validation: (r) => r.required().min(5).max(30),
      }),
      defineField({
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "name",
          maxLength: 30,
        },
        validation: (r) => r.required(),
      }),
      defineField({
        name: "color",
        title: "Color",
        type: "color",
        options: { disableAlpha: true },
        validation: (r) => r.required(),
      }),
      defineField({
        name: "promotionalHeadline",
        title: "Promotional headline",
        type: "string",
        validation: (r) => r.required().min(10).max(40),
      }),
      defineField({
        name: "introduction",
        title: "Introduction",
        type: "text",
        // validation: (r) => r.required().min(50).max(300),
      }),
      certificateType,
      defineField({
        name: "educationalPrograms",
        title: "Educational programs",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Heading",
            type: "string",
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
          }),
        ],
      }),
      defineField({
        name: "followUpTrainingEnabled",
        title: "Show follow-up training",
        type: "boolean",
      }),
      defineField({
        name: "followUpTraining",
        title: "Follow-up training",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Heading",
            type: "string",
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
          }),
          defineField({
            name: "educationalProgramType",
            title: "Educational program type",
            type: "reference",
            to: { type: "educational-program-type" },
          }),
        ],
        hidden: ({ document }) => !document?.followUpTrainingEnabled,
      }),
      defineField({
        name: "faq",
        description: "Frequently asked questions",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Heading",
            type: "string",
          }),
          faqFields,
        ],
      }),
      defineField({
        name: "alternatives",
        title: "Alternative educational program types",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Heading",
            type: "string",
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
          }),
        ],
      }),
    ],
    preview: {
      select: {
        title: "name",
        subtitle: "promotionalHeadline",
      },
    },
  }),
};
