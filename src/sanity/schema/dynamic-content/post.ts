import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { PenLineIcon } from "lucide-react";
import { createStringValidation } from "~/sanity/lib/validations";

export const post: SchemaTypeDef = {
  type: "dynamic-content",
  definition: defineType({
    name: "post",
    title: "Blogbeitrag",
    type: "document",
    icon: PenLineIcon,
    fields: [
      defineField({
        name: "seo",
        type: "seo-fields",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "name",
        title: "Titel",
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "slug",
        title: "URL freundlicher Text",
        type: "default-slug",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "author",
        title: "Autor",
        type: "reference",
        to: { type: "author" },
        validation: (r) => r.required(),
      }),

      defineField({
        name: "mainImage",
        title: "Thumbnail",
        type: "default-image",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "category",
        title: "Kategorie",
        type: "reference",
        to: { type: "category" },
        validation: (r) => r.required(),
      }),

      defineField({
        name: "publishedAt",
        title: "Veröffentlichungsdatum",
        type: "datetime",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "excerpt",
        title: "Auszug",
        type: "text",
        validation: createStringValidation("description"),
      }),

      defineField({
        name: "body",
        title: "Inhalt",
        type: "defaultPortableContent",
      }),

      defineField({
        name: "educationalProgramTypes",
        title: "Bildungswege Call-To-Action",
        description: "Verweis auf die Bildungswege am Ende des Beitrags.",
        type: "object",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            description: "3-40 Zeichen",
            type: "string",
            validation: createStringValidation("heading"),
          }),

          defineField({
            name: "introduction",
            title: "Beschreibung",
            description: "50-200 Zeichen",
            type: "text",
            validation: createStringValidation("description"),
          }),
        ],
      }),
    ],

    preview: {
      select: {
        media: "mainImage",
        title: "name",
        author: "author.name",
        publishedAt: "publishedAt",
      },
      prepare: ({ media, title, author, publishedAt }) => ({
        media,
        title,
        subtitle: `${new Date(publishedAt).toLocaleDateString("de")} - ${author}`,
      }),
    },
  }),
};
