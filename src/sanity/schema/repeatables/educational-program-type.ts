import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { RouteIcon } from "lucide-react";
import { certificateType } from "../parts/certificate";
import { faqFields } from "../parts/faq-fields";

export const educationalProgramType: SchemaTypeDef = {
  definition: defineType({
    name: "educational-program-type",
    title: "Bildungsweg",
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
        title: "URL Text",
        type: "slug",
        options: {
          source: "name",
          maxLength: 30,
        },
        validation: (r) => r.required(),
      }),
      defineField({
        name: "color",
        title: "Farbe",
        type: "color",
        options: { disableAlpha: true },
        validation: (r) => r.required(),
      }),
      defineField({
        name: "promotionalHeadline",
        title: "Bildungsweg Slogan",
        type: "string",
        validation: (r) => r.required().min(10).max(40),
      }),
      defineField({
        name: "introduction",
        title: "Einleitung",
        type: "text",
        // validation: (r) => r.required().min(50).max(300),
      }),
      certificateType,
      defineField({
        name: "educationalPrograms",
        title: "Abschitt Bildungsangebote",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
          }),
          defineField({
            name: "description",
            title: "Beschreibung",
            type: "text",
          }),
        ],
      }),
      defineField({
        name: "followUpTrainingEnabled",
        title: "Gibt es einen logischen Folgebildungsweg?",
        type: "boolean",
      }),
      defineField({
        name: "followUpTraining",
        title: "Folgebildungsweg",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
          }),
          defineField({
            name: "description",
            title: "Beschreibung",
            type: "text",
          }),
          defineField({
            name: "educationalProgramType",
            title: "Bildungsweg",
            type: "reference",
            to: { type: "educational-program-type" },
          }),
        ],
        hidden: ({ document }) => !document?.followUpTrainingEnabled,
      }),
      defineField({
        name: "faq",
        description: "Häufig gestellte Fragen",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
          }),
          faqFields,
        ],
      }),
      defineField({
        name: "alternatives",
        title: "Alternative Bildungswege",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
          }),
          defineField({
            name: "description",
            title: "Beschreibung",
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
