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
        name: "title",
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
        type: "image",
        options: {
          hotspot: true,
        },
        fields: [
          defineField({
            name: "Bildname",
            type: "string",
            title: "Alternative Text",
          }),
        ],
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
        type: "blockContent",
      }),
    ],

    preview: {
      select: {
        media: "mainImage",
        title: "title",
        author: "author.name",
        publishedAt: "publishedAt",
      },
    },
  }),
};
