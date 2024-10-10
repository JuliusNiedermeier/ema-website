import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { PenLineIcon } from "lucide-react";

export const post: SchemaTypeDef = {
  type: "dynamic-content",
  definition: defineType({
    name: "post",
    title: "Blogbeitrag",
    type: "document",
    icon: PenLineIcon,
    fields: [
      defineField({
        name: "name",
        title: "Titel",
        type: "string",
      }),

      defineField({
        name: "slug",
        title: "URL freundlicher Text",
        type: "default-slug",
      }),

      defineField({
        name: "author",
        title: "Autor",
        type: "reference",
        to: { type: "author" },
      }),

      defineField({
        name: "mainImage",
        title: "Thumbnail",
        type: "default-image",
      }),

      defineField({
        name: "category",
        title: "Kategorie",
        type: "reference",
        to: { type: "category" },
      }),

      defineField({
        name: "publishedAt",
        title: "Veröffentlichungsdatum",
        type: "datetime",
      }),

      defineField({
        name: "excerpt",
        title: "Auszug",
        type: "text",
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
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            description: "3-40 Zeichen",
            type: "string",
            validation: (r) => r.required().min(3).max(40),
          }),
          defineField({
            name: "introduction",
            title: "Beschreibung",
            description: "50-200 Zeichen",
            type: "text",
            validation: (r) => r.required().min(50).max(200),
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
